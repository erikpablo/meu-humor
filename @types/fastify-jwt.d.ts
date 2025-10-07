import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; exp: number; iat: number }
    user: { sub: string; exp: number; iat: number }
  }
}
declare module 'fastify' {
  interface FastifyRequest {
    user: { sub: string; exp: number; iat: number }
  }
}
