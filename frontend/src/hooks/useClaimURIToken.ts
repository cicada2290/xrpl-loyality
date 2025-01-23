import type { URITokenBuy } from '@transia/xrpl'
import type { EmployeeName } from '@/types'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs'
import { xrpToDrops } from '@transia/xrpl'

export type SubmitRequest = {
  destination: EmployeeName
  URITokenID: string
}

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useClaimURIToken = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async ({ destination, URITokenID }: SubmitRequest) => {
    setLoading(true)

    try {
      const tx: URITokenBuy = {
        TransactionType: 'URITokenBuy',
        Account: xrplClient.wallet(destination).address,
        Amount: xrpToDrops(0),
        URITokenID,
      }

      const response = await xrplClient.submitURITokenBuy(tx, xrplClient.wallet(destination))
      console.info('useClaimURIToken: submit: ', response)
    } catch (error) {
      console.error('useClaimURIToken: submit: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
  }
}
