import fastify from 'fastify'
import { env } from './env'
import z, { ZodError } from 'zod'
import { UsersRoute } from './http/controller/user/route'
import { join } from 'path'
import fastifyStatic from '@fastify/static'
import fastifyMultipart from '@fastify/multipart'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import fastifyRedis from '@fastify/redis'
import { moodRoutes } from './http/controller/moody/route'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Meu humor',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyRedis, {
  url: env.REDIS_URL,
})

app.register(fastifyStatic, {
  root: join(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
})
app.register(fastifyMultipart)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(UsersRoute)
app.register(moodRoutes)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      message: 'Response Validation Error',
      statusCode: 400,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    })
  }

  if (isResponseSerializationError(error)) {
    return reply.code(500).send({
      message: 'Internal Server Error',
      statusCode: 500,
      details: {
        issues: error.cause.issues,
        method: error.method,
        url: error.url,
      },
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
