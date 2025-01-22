import type { URITokenMint } from '@transia/xrpl'
import { useState } from 'react'
import { URITokenMintFlags, convertStringToHex } from '@transia/xrpl'
import { BACKEND_API_URL, XAHAU_WSS_ENDPOINT } from '@/constants'
import { generate256BitHash } from '@/utils'
import { XrplClient } from '@/libs'

const EMPLOYEE_ID_CARD_URI = `${BACKEND_API_URL}/api/employee`

export type SubmitRequest = {
  tokenID: string
  destination: string
}

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useURITokenMint = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async ({ tokenID, destination }: SubmitRequest): Promise<void> => {
    setLoading(true)

    try {
      const tx: URITokenMint = {
        TransactionType: 'URITokenMint',
        Amount: '0',
        Account: xrplClient.wallet('company').address,
        Destination: destination,
        Digest: generate256BitHash(tokenID),
        URI: convertStringToHex(`${EMPLOYEE_ID_CARD_URI}/${tokenID}`),
        Flags: URITokenMintFlags.tfBurnable,
      }

      console.info('useURITokenMint: submit: ', tx)

      const response = await xrplClient.submitURITokenMint(tx, xrplClient.wallet('company'))
      console.info('useURITokenMint: submit: ', response)
    } catch (error) {
      console.error('useURITokenMint: submit: ', error)
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
