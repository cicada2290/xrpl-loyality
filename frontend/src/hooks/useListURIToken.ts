import type { Employee } from '@/types'
import { useEffect, useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { employees } from '@/constants/employees'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useListURIToken = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Employee[]>([])

  const fetch = async () => {
    setLoading(true)

    try {
      await xrplClient.connect()

      const result = await Promise.all(
        employees.map(async (employee) => {
          const [employeeResponse, companyResponse] = await Promise.all([
            xrplClient.singleRequest({
              command: 'account_objects',
              account: xrplClient.wallet(employee.name).address,
              ledger_index: 'validated',
            }),
            xrplClient.singleRequest({
              command: 'account_objects',
              account: xrplClient.wallet('Company').address,
              ledger_index: 'validated',
            }),
          ])

          const uriToken = [
            ...(employeeResponse?.result.account_objects ?? []),
            ...(companyResponse?.result.account_objects ?? []),
          ]
            .filter((data) => data.LedgerEntryType === 'URIToken')
            .filter((data) => employee.id === data.Digest)
            .shift()

          return {
            ...employee,
            isMinted: !!uriToken,
            isReceived: uriToken ? employee.id === uriToken.Owner : false,
            index: uriToken?.index,
          }
        }),
      )

      setData(result)
    } catch (error) {
      console.error('useListURIToken: request: ', error)
      throw error
    } finally {
      await xrplClient.disconnect()
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return {
    data,
    loading,
    fetch,
  }
}
