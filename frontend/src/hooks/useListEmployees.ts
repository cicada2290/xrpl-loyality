import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { employees } from '@/constants/employees'
import { XrplClient } from '@/libs/XrplClient'
import type { Employee } from '@/types'
import type {
  AccountLinesResponse,
  AccountObjectsResponse
} from '@transia/xrpl'
import { useEffect, useState } from 'react'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useListEmployees = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Employee[]>([])

  const fetch = async () => {
    setLoading(true)

    try {
      const result: Employee[] = []

      const [companyAccountObjectsResponse, companyAccountLinesResponse] =
        (await xrplClient.multiRequest([
          {
            command: 'account_objects',
            account: xrplClient.wallet('Company').address,
            ledger_index: 'validated'
          },
          {
            command: 'account_lines',
            account: xrplClient.wallet('Company').address,
            ledger_index: 'validated'
          }
        ])) as [AccountObjectsResponse, AccountLinesResponse]

      console.info(
        'useListEmployees: companyAccountObjects: ',
        companyAccountObjectsResponse
      )
      console.info(
        'useListEmployees: companyAccountLines: ',
        companyAccountLinesResponse
      )

      const companyURIToken =
        companyAccountObjectsResponse.result?.account_objects
          .filter((data) => data.LedgerEntryType === 'URIToken')
          .filter(
            (data) => data.Issuer === xrplClient.wallet('Company').address
          )

      for (const employee of employees) {
        const [employeeAccountObjectsResponse, employeeAccountLinesResponse] =
          (await xrplClient.multiRequest([
            {
              command: 'account_objects',
              account: xrplClient.wallet(employee.name).address,
              ledger_index: 'validated'
            },
            {
              command: 'account_lines',
              account: xrplClient.wallet(employee.name).address,
              ledger_index: 'validated'
            }
          ])) as [AccountObjectsResponse, AccountLinesResponse]

        console.info(
          'useListEmployees: employeeAccountObjects: ',
          employeeAccountObjectsResponse,
        )
        console.info(
          'useListEmployees: emmployeeAccountLists: ',
          employeeAccountLinesResponse
        )

        const uriToken = employeeAccountObjectsResponse.result?.account_objects
          .filter((data) => data.LedgerEntryType === 'URIToken')
          .filter((data) => employee.id === data.Digest)
          .shift()

        const balance = employeeAccountLinesResponse.result?.lines
          .filter(
            (data) => data.currency === xrplClient.getUtilityToken().currency
          )
          .shift()

        console.info('useListEmployees: balance: ', balance);

        const employeeID = xrplClient.wallet(employee.name).address
        const isMinted =
          !!companyURIToken
            .filter((data) => employee.id === data.Digest)
            .shift() !== undefined || !!uriToken
        const isReceived = isMinted ? employeeID === uriToken?.Owner : false

        result.push({
          ...employee,
          employeeID,
          isMinted,
          isReceived,
          balance: balance?.balance ? BigInt(balance.balance) : 0n,
          index: uriToken?.index
        })
      }

      setData(result)
    } catch (error) {
      console.error('useListURIToken: request: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return {
    data,
    loading,
    fetch
  }
}
