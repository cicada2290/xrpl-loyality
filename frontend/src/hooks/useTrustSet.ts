import type { Wallet } from '@transia/xrpl'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useTrustSet = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async (address: string, wallet: Wallet) => {
    try {
      setLoading(true)

      const response = await xrplClient.submitTrustSet(
        {
          TransactionType: 'TrustSet',
          Account: address,
          LimitAmount: {
            issuer: xrplClient.utilityToken().issuer,
            currency: xrplClient.utilityToken().currency,
            value: '10000000'
          }
        },
        wallet
      )

      console.info('useTrustSet: ', response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, submit }
}
