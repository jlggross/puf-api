import request from 'supertest'
import { app } from './server-setup'

const server = app.listen()

describe('User routes', () => {
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
})

afterAll((done) => {
	server.close()
	done()
})
