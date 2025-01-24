import type { EmployeeName } from '@/types'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useReceiveToken = () => {
  const [loading, setLoading] = useState(false)

  const submit = async (employeeName: EmployeeName) => {
    setLoading(true)

    try {
      const paymentResponse = await xrplClient.submitPayment(
        {
          TransactionType: 'Payment',
          Account: xrplClient.wallet('Company').address,
          Destination: xrplClient.wallet(employeeName).address,
          Amount: {
            value: '10',
            currency: 'LOY',
            issuer: xrplClient.wallet('Company').address,
          },
        },
        xrplClient.wallet('Company'),
      )

      console.info('Payment Response: ', paymentResponse)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    submit,
    setLoading,
  }
}
