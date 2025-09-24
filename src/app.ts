import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { register } from './http/controller/user/register'
import { UsersRoute } from './http/controller/user/route'

export const app = fastify()

app.register(UsersRoute)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: enviar para um serviço de monitoramento tool datadog/newRelic
  }

  reply.status(500).send({
    message: 'Internal server error',
  })
})

// Criamos o app.setErrorHandler() para tratar erros de forma global
