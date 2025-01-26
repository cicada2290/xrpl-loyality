import type { EmployeeName } from '@/types'
import { Wallet } from '@transia/xrpl'
import { create } from 'zustand'
import { WALLET_SEEDS } from '@/constants'

type State = {
  account: {
    name: EmployeeName | 'Company' | null
    wallet: Wallet | null
  }
  setAccount: (account: EmployeeName | 'Company' | null) => void
}

export const useAccountStore = create<State>((set) => ({
  account: {
    name: null,
    wallet: null
  },
  setAccount: (account: EmployeeName | 'Company' | null) => {
    let wallet: Wallet | null = null

    if (account !== null) {
      switch (account) {
        case 'Alice':
          wallet = Wallet.fromSeed(WALLET_SEEDS.ALICE)
          break
        case 'Bob':
          wallet = Wallet.fromSeed(WALLET_SEEDS.BOB)
          break
        case 'Carol':
          wallet = Wallet.fromSeed(WALLET_SEEDS.CAROL)
          break
        case 'Dave':
          wallet = Wallet.fromSeed(WALLET_SEEDS.DAVE)
          break
        case 'Eve':
          wallet = Wallet.fromSeed(WALLET_SEEDS.EVE)
          break
        case 'Company':
          wallet = Wallet.fromSeed(WALLET_SEEDS.COMPANY)
          break
        default:
          wallet = null
      }
    }

    set({
      account: {
        name: account,
        wallet
      }
    })
  }
}))

export default useAccountStore
