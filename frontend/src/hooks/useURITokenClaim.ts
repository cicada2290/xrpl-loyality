import { XAHAU_WSS_ENDPOINT } from '@/constants'
import type { URITokenBuy } from '@transia/xrpl'
import { Client, type Wallet, xrpToDrops } from '@transia/xrpl'
import { useState } from 'react'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient()

export const useURITokenClaim = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const claim = async ({
    accountName,
    URITokenID
  }: { accountName: string; URITokenID: string }) => {
    try {
      setLoading(true)

      const employeeWallet = xrplClient.employeeWallets(accountName)

      const response = await xrplClient.submitURITokenBuy(
        {
          TransactionType: 'URITokenBuy',
          Account: employeeWallet.address,
          Amount: xrpToDrops(0),
          URITokenID
        },
        employeeWallet
      )
      console.info('useURITokenBuy: claim: ', response)
    } catch (error) {
      console.error('useURITokenBuy: claim: ', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    claim
  }
}
