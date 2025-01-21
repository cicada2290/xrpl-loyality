import { ALICE_WALLET_SECRET, BOB_WALLET_SECRET, CAROL_WALLET_SECRET, COMPANY_WALLET_SECRET } from '@/constants'
import { Wallet } from '@transia/xrpl'

export class WalletClient {
  alice() {
    return Wallet.fromSeed(ALICE_WALLET_SECRET)
  }

  bob() {
    return Wallet.fromSeed(BOB_WALLET_SECRET)
  }

  carol() {
    return Wallet.fromSeed(CAROL_WALLET_SECRET)
  }

  company() {
    return Wallet.fromSeed(COMPANY_WALLET_SECRET)
  }
}
