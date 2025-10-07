export class MissingTokenError extends Error {
  constructor() {
    super('Missing token or expiration time')
  }
}
