import { create } from 'zustand'

export interface AccountFlag {
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

export interface AccountFlagStore {
  accountFlag: AccountFlag | null
  setAccountFlag: (accountFlag: AccountFlag) => void
  resetAccountFlag: () => void
}

export const useAccountFlagStore = create<AccountFlagStore>((set) => ({
  accountFlag: null,
  setAccountFlag: (accountFlag: AccountFlag) => set({ accountFlag }),
  resetAccountFlag: () => set({ accountFlag: null })
}))
