import * as model from './model'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { decodeBasicToken } from './services'
import {
	TokenTypeError,
	CredentialsEncodedError,
	CredentialsFormatError,
} from './services'

export const login = async (ctx) => {
	try {
		const [inputEmail, inputPassword] = decodeBasicToken(
			ctx.request.headers.authorization
		)

		const user = await model.findUnique({
			where: { email: inputEmail },
		})

		if (!user) {
			ctx.status = 404 // Not found
			return
		}

		const { password: userPassword, ...userNoPassword } = user
		const passwordEqual = await bcrypt.compare(inputPassword, userPassword) // userPassword is hashed, came from the db

		if (!passwordEqual) {
			ctx.status = 404 // Not found
			return
		}

		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
		ctx.body = { user: userNoPassword, token }
	} catch (error) {
		if (error instanceof TokenTypeError) {
			ctx.status = 400
			ctx.body = 'TokenTypeError'
			return
		} else if (error instanceof CredentialsEncodedError) {
			ctx.status = 400
			ctx.body = 'CredentialsEncodedError'
			return
		} else if (error instanceof CredentialsFormatError) {
			ctx.status = 400
			ctx.body = 'CredentialsFormatError'
			return
		} else {
			ctx.status = 500
			ctx.body = 'Ops! Algo deu errado, tente novamente.'
			return
		}
	}
}

export const list = async (ctx) => {
	try {
		const users = await model.findMany()
		ctx.body = users
	} catch (error) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
		return
	}
}

export const create = async (ctx) => {
	try {
		const saltRounds = 10

		const hashedPassword = await bcrypt.hash(
			ctx.request.body.password,
			saltRounds
		)

		const user = await model.create({
			data: {
				name: ctx.request.body.name,
				email: ctx.request.body.email,
				password: hashedPassword,
			},
		})

		ctx.body = user
	} catch (err) {
		console.log(err)
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
	}
}

export const update = async (ctx) => {
	// Updates just name and email
	const { name, email } = ctx.request.body

	try {
		const user = await model.update({
			where: { id: ctx.params.id },
			data: { name, email },
		})

		ctx.body = user
	} catch (err) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
	}
}

export const remove = async (ctx) => {
	try {
		await model.remove({
			where: { id: ctx.params.id },
		})

		ctx.body = { id: ctx.params.id }
	} catch (err) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
	}
}
