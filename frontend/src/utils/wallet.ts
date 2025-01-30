import { Wallet } from '@transia/xrpl'
import { WALLET_SEEDS } from '@/constants'

export const getWallet = (accountName: string | null): Wallet => {
  if (accountName !== null) {
    switch (accountName) {
      case 'Alice':
        return Wallet.fromSeed(WALLET_SEEDS.ALICE)
      case 'Bob':
        return Wallet.fromSeed(WALLET_SEEDS.BOB)
      case 'Carol':
        return Wallet.fromSeed(WALLET_SEEDS.CAROL)
      case 'Dave':
        return Wallet.fromSeed(WALLET_SEEDS.DAVE)
      case 'Eve':
        return Wallet.fromSeed(WALLET_SEEDS.EVE)
      case 'Company':
        return Wallet.fromSeed(WALLET_SEEDS.COMPANY)
      case 'UtilityToken':
        return Wallet.fromSeed(WALLET_SEEDS.UTILITY_TOKEN)
      default:
        throw new Error('Invalid account name')
    }
  }

  throw new Error('Invalid account name')
}
