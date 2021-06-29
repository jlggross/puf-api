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

		await prisma.user.create({
			data: { email, password: hashedPassword },
		})

		// Execution
		const result = await request(server).get('/login').auth(email, password) // Return HTTP request
		console.log(result.body)

		// Expectation
		expect(result.status).toBe(200)
		expect(result.body.user).toBeTruthy()
		expect(result.body.user.id).toBeTruthy()
		expect(result.body.user.email).toBe(email)
		//expect(result.body.user.password).toBe(false)
	})
})

afterAll((done) => {
	server.close()
	done()
})
