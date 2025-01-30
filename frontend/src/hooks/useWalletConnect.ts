import type { EmployeeName } from '@/types'
import type { AccountLinesResponse, AccountInfoResponse } from '@transia/xrpl'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { useAccountStore } from '@/store/accountStore'
import { useAccountFlagStore } from '@/store/accountFlagStore'
import { getWallet } from '@/utils'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useWalletConnect = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setAccount } = useAccountStore()
  const { setAccountFlag } = useAccountFlagStore()

  const connect = async (
    accountType: EmployeeName | 'Company' | 'UtilityToken'
  ) => {
    try {
      setLoading(true)

      const wallet = getWallet(accountType)

      const [accountRootResponse, accountLinesResponse] =
        (await xrplClient.multiRequest([
          {
            command: 'account_info',
            account: wallet.address,
            ledger_index: 'validated'
          },
          {
            command: 'account_lines',
            account: wallet.address,
            ledger_index: 'validated'
          }
        ])) as [AccountInfoResponse, AccountLinesResponse]

      const accountRoot = accountRootResponse.result.account_data
      // @ts-ignore
      const accountFlags = accountRootResponse.result.account_flags
      const accountLines = accountLinesResponse.result.lines

      console.log('accountRoot: ', accountRoot)
      console.log('accountLines: ', accountLines)

      const isSetTrustline = !!accountLines.find(
        (line) =>
          line.currency === xrplClient.utilityToken().currency &&
          line.account === xrplClient.utilityToken().issuer
      )

      console.log('isSetTrustline: ', isSetTrustline)

      setAccount({
        name: accountType,
        wallet,
        root: {
          balance: Number(accountRoot.Balance),
          domain: accountRoot.Domain ? accountRoot.Domain : '',
          emailHash: accountRoot.EmailHash ?? '',
          ownerCount: accountRoot.OwnerCount,
          // @ts-ignore
          urlgravatar: accountRoot.urlgravatar
        },
        lines: accountLines,
        isConnected: true,
        isSetTrustline
      })

      setAccountFlag({
        defaultRipple: accountFlags.defaultRipple,
        depositAuth: accountFlags.depositAuth,
        disableMasterKey: accountFlags.disableMasterKey,
        disallowIncomingCheck: accountFlags.disallowIncomingCheck,
        disallowIncomingNFTokenOffer: accountFlags.disallowIncomingNFTokenOffer,
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
      })
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const refresh = async (
    accountType: EmployeeName | 'Company' | 'UtilityToken'
  ) => {
    await connect(accountType)
  }

  return {
    loading,
    connect,
    refresh
  }
}
