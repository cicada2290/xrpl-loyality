import type { Wallet } from '@transia/xrpl'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useTokenPayment = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async (wallet: Wallet) => {
    try {
      setLoading(true)

      const response = await xrplClient.submitPayment(
        {
          TransactionType: 'Payment',
          Account: wallet.address,
          Destination: xrplClient.wallet('Company').address,
          Amount: {
            currency: xrplClient.utilityToken().currency,
            issuer: xrplClient.utilityToken().issuer,
            value: '1'
          }
        },
        wallet
      )

      console.info('useTokenPayment: ', response)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, submit }
}
