import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { UsersRoute } from './http/controller/user/route'
import { join } from 'path'
import fastifyStatic from '@fastify/static'

export const app = fastify()

app.register(fastifyStatic, {
  root: join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
})

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
