import type { EmployeeName } from '@/types'
import { Wallet } from '@transia/xrpl'
import { create } from 'zustand'

export interface AccountRoot {
  balance: number
  domain: string
  emailHash: string
  ownerCount: number
  urlgravatar: string
}

export interface Account {
  name: EmployeeName | 'Company' | 'UtilityToken' | null
  wallet: Wallet | null
  root: AccountRoot | null
  lines: any[]
  isConnected: boolean
  isSetTrustline: boolean
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
    root: null,
    lines: [],
    isConnected: false,
    isSetTrustline: false
  },
  setAccount: (account: Account) => set({ account }),
  resetAccount: () =>
    set({
      account: {
        name: null,
        wallet: null,
        root: null,
        lines: [],
        isConnected: false,
        isSetTrustline: false
      }
    })
}))
