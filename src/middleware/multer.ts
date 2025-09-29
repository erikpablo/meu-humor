import multer from 'fastify-multer'
import { randomUUID } from 'crypto'
import { join } from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '..', '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}-${file.originalname}`
    cb(null, uniqueName)
  },
})

export const upload = multer({ storage })
