import { useAccountStore } from '@/store/accountStore'
import { useAccountFlagStore } from '@/store/accountFlagStore'

export const useWalletDisconnect = () => {
  const { resetAccount } = useAccountStore()
  const { resetAccountFlag } = useAccountFlagStore()

  const disconnect = () => {
    resetAccount()
    resetAccountFlag()
  }

  return { disconnect }
}
