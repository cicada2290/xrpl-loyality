import type { URITokenMint } from '@transia/xrpl'
import { BACKEND_API_URL, XAHAU_WSS_ENDPOINT, COMPANY_WALLET_SECRET } from '@/constants'
import { useState } from 'react'
import { Client, Wallet, URITokenMintFlags, convertStringToHex } from '@transia/xrpl'
import { generate256BitHash } from '@/utils'

const EMPLOYEE_ID_CARD_URI = `${BACKEND_API_URL}/api/empoly/`

export type SubmitRequest = {
  tokenID: string
  destination: string
}

export const useURITokenMint = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async ({ tokenID, destination }: SubmitRequest): Promise<void> => {
    const client = new Client(XAHAU_WSS_ENDPOINT)
    const wallet = Wallet.fromSeed(COMPANY_WALLET_SECRET)

    try {
      setLoading(true)
      await client.connect()

      const tx: URITokenMint = {
        TransactionType: 'URITokenMint',
        Amount: '0',
        Account: wallet.address,
        Destination: destination,
        Digest: generate256BitHash(tokenID),
        URI: convertStringToHex(`${EMPLOYEE_ID_CARD_URI}/${tokenID}`),
        Flags: URITokenMintFlags.tfBurnable,
        NetworkID: await client.getNetworkID(),
      }

      console.info('useURITokenMint: submit: ', tx)

      const opts = {
        autofill: true,
        wallet,
      }

      const response = await client.submitAndWait(tx, opts)
      console.info('useURITokenMint: submit: ', response)
    } catch (error) {
      console.error('useURITokenMint: submit: ', error)
    } finally {
      await client.disconnect()
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
  }
}
