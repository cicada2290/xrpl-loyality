import axios from 'axios'
import { useState } from 'react'
import { XrplClient } from '@/libs/XrplClient'
import { generate256BitHash, hexToString } from '@/utils'

const xrplClient = new XrplClient()

export const useEmployeeGet = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const request = async (id: string, AccountName: string) => {
    try {
      setLoading(true)

      const employeeHashId = generate256BitHash(id)
      const employeeWallet = xrplClient.employeeWallets(AccountName)
      const companyWallet = xrplClient.companyWallets('Company')

      let isHeld = false
      let isMinted = false
      let image = ''
      let owner = ''
      let issuer = ''

      const accountObjectsResponse = await xrplClient.requestAccountObjects({
        command: 'account_objects',
        account: employeeWallet.address,
        ledger_index: 'validated'
      })

      const accountObjects = accountObjectsResponse.result?.account_objects

      console.log('useEmployeeGet: accountObjects: ', accountObjects)

      const employeeURIToken =
        accountObjects
          .filter((data) => data.LedgerEntryType === 'URIToken')
          .filter((data) => employeeHashId === data.Digest)
          .shift() || null

      // Non Held URIToken
      if (employeeURIToken === null) {
        const companyAccountObjectsResponse =
          await xrplClient.requestAccountObjects({
            command: 'account_objects',
            account: companyWallet.address,
            ledger_index: 'validated'
          })

        console.log(
          'useEmployeeGet: companyAccountObjects: ',
          companyAccountObjectsResponse
        )

        const companyURIToken =
          companyAccountObjectsResponse.result?.account_objects
            .filter((data) => data.LedgerEntryType === 'URIToken')
            .filter((data) => data.Issuer === companyWallet.address)
            .filter((data) => employeeHashId === data.Digest)
            .shift()

        if (companyURIToken) {
          const uri = hexToString(companyURIToken.URI)
          const { data } = await axios.get(uri, {
            params: {
              URITokenID: companyURIToken.index
            }
          })
          image = data.image
          owner = companyURIToken.Owner
          issuer = companyURIToken.Issuer
        }

        isMinted = companyURIToken !== undefined
      }

      console.log('useEmployeeGet: employeeURIToken: ', employeeURIToken)
      setData({
        isHeld,
        isMinted,
        image,
        owner,
        issuer
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    data,
    request
  }
}
