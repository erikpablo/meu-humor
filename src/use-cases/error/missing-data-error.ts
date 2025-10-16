export class MissingDataError extends Error {
  constructor() {
    super('Missing mandatory data')
  }
}
