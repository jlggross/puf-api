import jwt from 'jsonwebtoken'
import { prisma } from '~/data'

export const login = async (ctx) => {
	try {
		const { email, password } = ctx.request.body
		const [user] = await prisma.user.findMany({
			where: { email, password },
		})

		if (!user) {
			ctx.status = 404 // Not found
			return
		}

		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
		ctx.body = { user, token }
	} catch (error) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
		return
	}
}

export const list = async (ctx) => {
	try {
		const users = await prisma.user.findMany()
		ctx.body = users
	} catch (error) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
		return
	}
}

export const create = async (ctx) => {
	try {
		const user = await prisma.user.create({
			data: ctx.request.body,
		})

		ctx.body = user
	} catch (err) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
	}
}

export const update = async (ctx) => {
	// Updates just name and email
	const { name, email } = ctx.request.body

	try {
		const user = await prisma.user.update({
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
		await prisma.user.delete({
			where: { id: ctx.params.id },
		})

		ctx.body = { id: ctx.params.id }
	} catch (err) {
		ctx.status = 500
		ctx.body = 'Ops! Algo deu errado, tente novamente.'
	}
}
