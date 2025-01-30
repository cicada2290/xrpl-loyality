import { useState } from 'react'
import { BACKEND_API_URL } from '@/constants'
import { XrplClient } from '@/libs'
import { URITokenMintFlags, convertStringToHex } from '@transia/xrpl'
import { generate256BitHash } from '@/utils'

const EMPLOYEE_ID_CARD_URI = `${BACKEND_API_URL}/api/uritokens`

const xrplClient = new XrplClient()

export const useURITokenMint = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const mint = async ({
    employeeId,
    employeeName
  }: {
    employeeId: string
    employeeName: string
  }): Promise<void> => {
    setLoading(true)

    try {
      const degit = generate256BitHash(employeeId)
      const companyWallet = xrplClient.companyWallets('Company')
      const employeeWallet = xrplClient.employeeWallets(employeeName)

      const response = await xrplClient.submitURITokenMint(
        {
          TransactionType: 'URITokenMint',
          Amount: '0',
          Account: companyWallet.address,
          Destination: employeeWallet.address,
          Digest: degit,
          URI: convertStringToHex(`${EMPLOYEE_ID_CARD_URI}/${degit}`),
          Flags: URITokenMintFlags.tfBurnable
        },
        companyWallet
      )

      console.info('useURITokenMint: mint: ', response)
    } catch (error) {
      console.error('useURITokenMint: mint: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    mint,
    loading
  }
}
