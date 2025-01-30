import { Wallet } from '@transia/xrpl'
import { prisma } from '../src/libs/PrismaClient'
import { generate256BitHash } from '../src/utils/hash'
import { WALLET_SEEDS } from '../src/constants/index'

const employees = [
  {
    name: 'Alice',
    address: Wallet.fromSeed(WALLET_SEEDS.ALICE).address,
    degit: generate256BitHash('1')
  },
  {
    name: 'Bob',
    address: Wallet.fromSeed(WALLET_SEEDS.BOB).address,
    degit: generate256BitHash('2')
  },
  {
    name: 'Carol',
    address: Wallet.fromSeed(WALLET_SEEDS.CAROL).address,
    degit: generate256BitHash('3')
  },
  {
    name: 'Dave',
    address: Wallet.fromSeed(WALLET_SEEDS.DAVE).address,
    degit: generate256BitHash('4')
  },
  {
    name: 'Eve',
    address: Wallet.fromSeed(WALLET_SEEDS.EVE).address,
    degit: generate256BitHash('5')
  }
]

const main = async () => {
  await prisma.$connect()

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: {
        address: employee.address
      },
      update: {
        name: employee.name
      },
      create: {
        name: employee.name,
        address: employee.address,
        degit: employee.degit
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
