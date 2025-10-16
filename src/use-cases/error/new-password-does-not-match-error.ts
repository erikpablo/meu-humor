export class NewPasswordDoesNotMatchError extends Error {
  constructor() {
    super('New password does not match')
  }
}
