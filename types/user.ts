import { FastifyRequest } from 'fastify'
import { File } from 'fastify-multer/lib/interfaces'

export interface RegisterRequest extends FastifyRequest {
  file?: File
  body: {
    name: string
    email: string
    password: string
  }
}
