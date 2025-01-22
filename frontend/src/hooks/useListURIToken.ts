import type { Employee } from '@/types'
import { useEffect, useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { generate256BitHash } from '@/utils'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

const defaultEmployee: Employee[] = [
  {
    id: generate256BitHash('1'),
    empolyID: xrplClient.wallet('alice').address,
    name: 'Alice',
    isMinted: false,
    isReceived: false,
  },
  {
    id: generate256BitHash('2'),
    empolyID: xrplClient.wallet('bob').address,
    name: 'Bob',
    isMinted: false,
    isReceived: false,
  },
  {
    id: generate256BitHash('3'),
    empolyID: xrplClient.wallet('carol').address,
    name: 'Carol',
    isMinted: false,
    isReceived: false,
  },
]

export const useListURIToken = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Employee[]>([])

  const fetch = async () => {
    setLoading(true)

    try {
      await xrplClient.connect()

      const result = await Promise.all(
        defaultEmployee.map(async (employeeData) => {
          const response = await xrplClient.singleRequest({
            command: 'account_objects',
            account: employeeData.empolyID,
            ledger_index: 'validated',
          })

          console.log('Response: ', employeeData.name, response.result.account_objects)

          const accountObjest = response.result.account_objects
            .filter((data) => data.LedgerEntryType === 'URIToken')
            .filter((data) => employeeData.id === data.Digest)
            .shift()

          console.log('AccountObjest: ', accountObjest)

          return {
            ...employeeData,
            isMinted: !!accountObjest,
            isReceived: employeeData.empolyID === accountObjest?.Owner,
            index: accountObjest?.index,
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
