import 'fastify'
import type { File } from 'multer'

declare module 'fastify' {
  interface FastifyRequest {
    file?: File
    files?: File[]
  }
}
