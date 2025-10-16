export class OldPasswordDoesNotMatchError extends Error {
  constructor() {
    super('Old password does not match')
  }
}
