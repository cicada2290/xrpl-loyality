import type { EmployeeName } from '@/types'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useTokenFaucet = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { refresh } = useWalletConnect()

  const submit = async (
    name: EmployeeName | 'Company' | 'UtilityToken',
    address: string
  ) => {
    try {
      setLoading(true)

      const isCompany = name === 'Company'
      const wallet = xrplClient.wallet(isCompany ? 'UtilityToken' : 'Company')

      const paymentResponse = await xrplClient.submitPayment(
        {
          TransactionType: 'Payment',
          Account: wallet.address,
          Destination: address,
          Amount: {
            value: isCompany ? '5000' : '5',
            currency: xrplClient.utilityToken().currency,
            issuer: xrplClient.utilityToken().issuer
          }
        },
        wallet
      )

      console.info('Payment Response: ', paymentResponse)

      await refresh(name)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, submit }
}
