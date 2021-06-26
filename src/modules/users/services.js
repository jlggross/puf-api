export class TokenTypeError extends Error {
	constructor(message = 'Wrong token type') {
		super()
		this.message = message
	}
}

export class CredentialsEncodedError extends Error {
	constructor(message = 'Credentials not correctly encoded') {
		super()
		this.message = message
	}
}

export class CredentialsFormatError extends Error {
	constructor(message = 'Wrong credentials format') {
		super()
		this.message = message
	}
}

export const decodeBasicToken = (basicToken) => {
	const [type, credentials] = basicToken.split(' ')

	if (type !== 'Basic') {
		throw new TokenTypeError()
	}

	const decoded = Buffer.from(credentials, 'base64').toString()
	const encoded = Buffer.from(decoded, 'utf-8').toString('base64')

	if (encoded !== credentials) {
		throw new CredentialsEncodedError()
	}

	if (decoded.indexOf(':') === -1) {
		throw new CredentialsFormatError()
	}

	return decoded.split(':')
}
