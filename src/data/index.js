import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

/*
prisma.users
  .findMany({
    where: {
      email: 'joao@gmail.com',
    },
  })
  .then(docs => console.log(docs))
  .catch(err => console.log(err))
*/
