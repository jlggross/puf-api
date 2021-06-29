import jwt from 'jsonwebtoken'
import request from 'supertest'
import bcrypt from 'bcryptjs'

import { prisma } from '~/data'

import { app } from './server-setup'

const server = app.listen()

describe('User routes', () => {
	beforeAll(async () => {
		await prisma.user.deleteMany({})
	})

	it('should return NOT FOUND when using wrong password', async () => {
		// Prepare
		const email = 'joao@gmail.com'
		const password = '111111'

		// Execution
		const result = await request(server).get('/login').auth(email, password) // Return HTTP request

		// Expectation
		expect(result.status).toBe(404)
	})

	it('should return NOT FOUND when using wrong email', async () => {
		// Prepare
		const email = 'test@gmail.com'
		const password = '123456'

		// Execution
		const result = await request(server).get('/login').auth(email, password) // Return HTTP request

		// Expectation
		expect(result.status).toBe(404)
	})

	it('should return logged user using correct credentials', async () => {
		// Prepare
		const email = 'joao@gmail.com'
		const password = '123456'

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		})

		// Execution
		const result = await request(server).get('/login').auth(email, password) // Return HTTP request

		const decodedToken = jwt.verify(result.body.token, process.env.JWT_SECRET)

		// Expectation
		expect(result.status).toBe(200)
		expect(result.body.user).toBeTruthy()
		expect(result.body.token).toBeTruthy()
		expect(result.body.user.id).toBe(user.id)
		expect(result.body.user.email).toBe(email)
		expect(result.body.user.password).toBeFalsy()
		expect(decodedToken.sub).toBe(user.id)
	})
})

afterAll((done) => {
	server.close()
	done()
})
