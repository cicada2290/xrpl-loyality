import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { useState } from 'react'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useTrustSet = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async () => {
    try {
      setLoading(true)

      const response = await xrplClient.submitTrustSet(
        {
          TransactionType: 'TrustSet',
          Account: xrplClient.getWallet().company.address,
          LimitAmount: {
            issuer: xrplClient.getUtilityToken().issuer,
            currency: xrplClient.getUtilityToken().currency,
            value: '100000000000'
          }
        },
        xrplClient.wallet('Company')
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
