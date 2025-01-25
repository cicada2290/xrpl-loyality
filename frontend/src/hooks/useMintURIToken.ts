import { BACKEND_API_URL, XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs'
import type { EmployeeName } from '@/types'
import type { URITokenMint } from '@transia/xrpl'
import { URITokenMintFlags, convertStringToHex } from '@transia/xrpl'
import { useState } from 'react'

const EMPLOYEE_ID_CARD_URI = `${BACKEND_API_URL}/api/employee`

export type SubmitRequest = {
  tokenID: string
  destination: EmployeeName
}

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useURITokenMint = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async ({
    tokenID,
    destination
  }: SubmitRequest): Promise<void> => {
    setLoading(true)

    console.info('useURITokenMint: request: ', tokenID, destination)

    try {
      const tx: URITokenMint = {
        TransactionType: 'URITokenMint',
        Amount: '0',
        Account: xrplClient.wallet('Company').address,
        Destination: xrplClient.wallet(destination).address,
        Digest: tokenID,
        URI: convertStringToHex(`${EMPLOYEE_ID_CARD_URI}/${tokenID}`),
        Flags: URITokenMintFlags.tfBurnable
      }

      console.info('useURITokenMint: submit: ', tx)

      const response = await xrplClient.submitURITokenMint(
        tx,
        xrplClient.wallet('Company')
      )
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
    loading
  }
}
