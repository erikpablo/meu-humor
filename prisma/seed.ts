import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const moods = [
    {
      name: 'Muito Triste',
      emoji: '😢',
      weight: 1,
    },
    {
      name: 'Triste',
      emoji: '🙁',
      weight: 2,
    },
    {
      name: 'Neutro',
      emoji: '😐',
      weight: 3,
    },
    {
      name: 'Feliz',
      emoji: '🙂',
      weight: 4,
    },
    {
      name: 'Muito Feliz',
      emoji: '😄',
      weight: 5,
    },
  ]

  for (const mood of moods) {
    await prisma.moodType.upsert({
      where: { name: mood.name },
      update: {},
      create: mood,
    })
  }

  console.log('✅ Seed de humores criado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
