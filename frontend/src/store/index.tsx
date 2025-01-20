import { create } from 'zustand'

type State = {
  account: string
  setAccount: (account: string) => void
}

const useAccountStore = create<State>((set) => ({
  account: '',
  setAccount: (account: string) => set({ account }),
}))

export default useAccountStore
