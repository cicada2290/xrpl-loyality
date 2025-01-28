import type { EmployeeName } from '@/types'
import { Wallet } from '@transia/xrpl'
import { create } from 'zustand'

export interface AccountRoot {
  balance: number
  domain: string
  emailHash: string
  ownerCount: number
  urlgravatar: string
  flags: {
    defaultRipple: boolean
    depositAuth: boolean
    disableMasterKey: boolean
    disallowIncomingCheck: boolean
    disallowIncomingNFTokenOffer: boolean
    disallowIncomingPayChan: boolean
    disallowIncomingRemit: boolean
    disallowIncomingTrustline: boolean
    disallowIncomingXRP: boolean
    globalFreeze: boolean
    noFreeze: boolean
    passwordSpent: boolean
    requireAuthorization: boolean
    requireDestinationTag: boolean
    tshCollect: boolean
  }
}

export interface Account {
  name: EmployeeName | 'Company' | null
  wallet: Wallet | null
  root: AccountRoot | null
}

export interface AccountStore {
  account: Account
  setAccount: (account: Account) => void
  resetAccount: () => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  account: {
    name: null,
    wallet: null,
    root: null
  },
  setAccount: (account: Account) => set({ account }),
  resetAccount: () =>
    set({
      account: {
        name: null,
        wallet: null,
        root: null
      }
    })
}))
