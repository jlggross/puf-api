import { decodeBasicToken } from './services'
import {
	TokenTypeError,
	CredentialsEncodedError,
	CredentialsFormatError,
} from './services'

/*
const multBy2 = (v) => v * 2

describe('multiply by 2', () => {
	it('test if multBy2 multiply 10 to 20', () => {
		const result = multBy2(10)
		expect(result).toBe(20)
	})

	it('test if multBy2 multiply 20 to 40', () => {
		const result = multBy2(20)
		expect(result).toBe(40)
	})
})
*/

describe('User services', () => {
	it('should return credentials by basic authentication token', () => {
		// Preparation
		const email = 'joao@gmail.com'
		const password = '123456'
		const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
		const basicToken = `Basic ${token}`

		// Execution
		const result = decodeBasicToken(basicToken)

		// Expected result
		expect(result).toEqual([email, password])
	})

	it('should throw new error when token is not Basic type', () => {
		// Preparation
		const email = 'joao@gmail.com'
		const password = '123456'
		const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
		const basicToken = `Bearer ${token}`

		// Execution
		const result = () => decodeBasicToken(basicToken)

		// Expected result
		expect(result).toThrowError(new TokenTypeError())
	})

	it('should throw new error when credentials are not in correct format', () => {
		// Preparation
		const email = 'joao@gmail.com'
		const password = '123456'
		const token = Buffer.from(`${email}${password}`, 'utf8').toString('base64')
		const basicToken = `Basic ${token}`

		// Execution
		const result = () => decodeBasicToken(basicToken)

		// Expected result
		expect(result).toThrowError(new CredentialsFormatError())
	})

	it('should throw new error when credentials are not base64 encoded', () => {
		// Preparation
		const email = 'joao@gmail.com'
		const password = '123456'
		const token = `${email}:${password}`
		const basicToken = `Basic ${token}`

		// Execution
		const result = () => decodeBasicToken(basicToken)

		// Expected result
		expect(result).toThrowError(new CredentialsEncodedError())
	})
})
