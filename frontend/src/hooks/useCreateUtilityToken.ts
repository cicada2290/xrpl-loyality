import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { AccountSetAsfFlags } from '@transia/xrpl'
import { useState } from 'react'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export interface CreateUtilityTokenData {
  currency: string
  issuer: string
  recipient: string
  issueAmount: number
}

export const useCreateUtilityToken = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async (data: CreateUtilityTokenData) => {
    try {
      setLoading(true)

      const [utilityTokenResponse, companyResponse, paymentResponse] =
        await xrplClient.multiSubmit([
          {
            tx: {
              TransactionType: 'AccountSet',
              Account: data.issuer,
              SetFlag: AccountSetAsfFlags.asfDefaultRipple
            },
            wallet: xrplClient.wallet('UtilityToken')
          },
          {
            tx: {
              TransactionType: 'TrustSet',
              Account: xrplClient.wallet('Company').address,
              LimitAmount: {
                issuer: data.issuer,
                currency: data.currency,
                value: data.issueAmount.toString()
              }
            },
            wallet: xrplClient.wallet('Company')
          },
          {
            tx: {
              TransactionType: 'Payment',
              Account: xrplClient.wallet('UtilityToken').address,
              Destination: xrplClient.wallet('Company').address,
              Amount: {
                currency: data.currency,
                issuer: data.issuer,
                value: data.issueAmount.toString()
              }
            },
            wallet: xrplClient.wallet('UtilityToken')
          }
        ])

      console.info('useCreateUtilityToken: AccountSet', utilityTokenResponse)
      console.info('useCreateUtilityToken: TrustSet', companyResponse)
      console.info('useCreateUtilityToken: Payment', paymentResponse)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    submit,
    setLoading
  }
}
