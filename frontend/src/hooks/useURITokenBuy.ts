import { XAHAU_WSS_ENDPOINT } from '@/constants'
import type { URITokenBuy } from '@transia/xrpl'
import { Client, type Wallet, xrpToDrops } from '@transia/xrpl'
import { useState } from 'react'

export const useURITokenBuy = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async ({
    execWallet,
    URITokenID
  }: { execWallet: Wallet; URITokenID: string }) => {
    const client = new Client(XAHAU_WSS_ENDPOINT)

    try {
      setLoading(true)
      await client.connect()

      const tx: URITokenBuy = {
        TransactionType: 'URITokenBuy',
        Account: execWallet.address,
        Amount: xrpToDrops(0),
        URITokenID,
        NetworkID: await client.getNetworkID()
      }

      const opts = {
        wallet: execWallet,
        autofill: true
      }

      const response = await client.submitAndWait(tx, opts)
      console.info('useURITokenBuy: submit: ', response)
    } catch (error) {
      console.error('useURITokenBuy: submit: ', error)
    } finally {
      setLoading(false)
      client.disconnect()
    }
  }

  return {
    loading,
    submit
  }
}
