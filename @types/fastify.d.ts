import 'fastify'
import { Express } from 'express'

declare module 'fastify' {
  interface FastifyRequest {
    file?: Express.Multer.File
  }
}
