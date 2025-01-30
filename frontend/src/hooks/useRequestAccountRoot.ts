import type { AccountInfoResponse } from '@transia/xrpl'
import { useState } from 'react'
import { Wallet } from '@transia/xrpl'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useRequestAccountRoot = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const request = async (wallet: Wallet) => {
    try {
      if (!wallet) {
        throw new Error('Wallet is not connected')
      }

      setLoading(true)

      const accountRootResponse: AccountInfoResponse =
        await xrplClient.requestAccountRoot(wallet.address)

      console.log('useRequestAccountRoot: ', accountRootResponse)

      const accountRoot = accountRootResponse.result.account_data
      // @ts-ignore
      const accountFlags = accountRootResponse.result.account_flags

      return {
        balance: accountRoot.Balance,
        domain: accountRoot.Domain ? accountRoot.Domain : '',
        emailHash: accountRoot.EmailHash,
        ownerCount: accountRoot.OwnerCount,
        // @ts-ignore
        urlgravatar: accountRoot.urlgravatar,
        flags: {
          defaultRipple: accountFlags.defaultRipple,
          depositAuth: accountFlags.depositAuth,
          disableMasterKey: accountFlags.disableMasterKey,
          disallowIncomingCheck: accountFlags.disallowIncomingCheck,
          disallowIncomingNFTokenOffer:
            accountFlags.disallowIncomingNFTokenOffer,
          disallowIncomingPayChan: accountFlags.disallowIncomingPayChan,
          disallowIncomingRemit: accountFlags.disallowIncomingRemit,
          disallowIncomingTrustline: accountFlags.disallowIncomingTrustline,
          disallowIncomingXRP: accountFlags.disallowIncomingXRP,
          globalFreeze: accountFlags.globalFreeze,
          noFreeze: accountFlags.noFreeze,
          passwordSpent: accountFlags.passwordSpent,
          requireAuthorization: accountFlags.requireAuthorization,
          requireDestinationTag: accountFlags.requireDestinationTag,
          tshCollect: accountFlags.tshCollect
        }
      }
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { loading, request }
}
