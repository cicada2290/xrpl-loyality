import { employees } from './../constants/employees'
import axios from 'axios'
import { useState } from 'react'
import { XrplClient } from '@/libs/XrplClient'
import { hexToString } from '@/utils'

const xrplClient = new XrplClient()

export const useURITokenGet = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const request = async (accountName: string) => {
    try {
      setLoading(true)

      const employeeWallet = xrplClient.employeeWallets(accountName)
      const companyWallet = xrplClient.companyWallets('Company')

      const [companyAccountObjectsResponse, employeeAccountObjectsResponse] =
        await xrplClient.multiRequest([
          {
            command: 'account_objects',
            account: companyWallet.address,
            ledger_index: 'validated'
          },
          {
            command: 'account_objects',
            account: employeeWallet.address,
            ledger_index: 'validated'
          }
        ])

      const employeeAccountObjects =
        employeeAccountObjectsResponse.result?.account_objects
      const companyAccountObjects =
        companyAccountObjectsResponse.result?.account_objects
      console.info(
        'useURITokenGet: request: employeeAccountObjects: ',
        employeeAccountObjects
      )
      console.info(
        'useURITokenGet: request: companyAccountObjects: ',
        companyAccountObjects
      )
      const employeeURIToken = await employeeAccountObjects
        // @ts-ignore
        .filter((data) => data.LedgerEntryType === 'URIToken')
        // @ts-ignore
        .filter((data) => data.Owner === employeeWallet.address)
        .shift()

      const companyURIToken = await companyAccountObjects
        // @ts-ignore
        .filter((data) => data.LedgerEntryType === 'URIToken')
        // @ts-ignore
        .filter((data) => data.Owner === companyWallet.address)
        .shift()

      console.info(
        'useURITokenGet: request: employeeURIToken: ',
        employeeURIToken
      )
      console.info(
        'useURITokenGet: request: companyURIToken: ',
        companyURIToken
      )

      let image = null
      let uriTokenID = null
      let isMyOwn = false

      if (employeeURIToken) {
        const uri = hexToString(employeeURIToken.URI)
        const { data } = await axios.get(uri, {
          params: {
            URITokenID: employeeURIToken.index
          }
        })
        image = data.image
        uriTokenID = employeeURIToken.index
        isMyOwn = true

        setData({
          image,
          uriTokenID,
          isMyOwn
        })
      } else {
        setData(null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    request,
    setData,
    loading,
    data
  }
}
