import type { Employee } from '@/types'
import { XAHAU_WSS_ENDPOINT, ALICE_WALLET_SECRET, BOB_WALLET_SECRET, CAROL_WALLET_SECRET, COMPANY_WALLET_SECRET } from '@/constants'
import { useState } from 'react'
import { Client, Wallet } from '@transia/xrpl'
import { generate256BitHash } from '@/utils'

const aliceWallet = Wallet.fromSeed(ALICE_WALLET_SECRET)
const bobWallet = Wallet.fromSeed(BOB_WALLET_SECRET)
const carolWallet = Wallet.fromSeed(CAROL_WALLET_SECRET)

const defaultEmployee: Employee[] = [
  {
    id: generate256BitHash('1'),
    empolyID: aliceWallet.address,
    name: 'Alice',
  },
  {
    id: generate256BitHash('2'),
    empolyID: bobWallet.address,
    name: 'Bob',
  },
  {
    id: generate256BitHash('3'),
    empolyID: carolWallet.address,
    name: 'Carol',
  }
]

export const useAccountObject = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])

  const request = async () => {
    const client = new Client(XAHAU_WSS_ENDPOINT)
    const wallet = Wallet.fromSeed(COMPANY_WALLET_SECRET)

    try {
      await client.connect()
      setLoading(true)

      const response = await client.request({
        command: 'account_objects',
        account: wallet.address,
        ledger_index: "validated"
      })

      const accountObjects = response.result.account_objects
      console.info('useAccountObject: request: ', accountObjects)

      const formetedAccountObjects = accountObjects.map((data: any) => {
        switch (data.LedgerEntryType) {
          case 'URIToken':
            return {
              ledgerEntryType: data.LedgerEntryType,
              flag: data.Flags,
              tokenID: data.TokenID,
              destination: data.Destination,
              digest: data.Digest,
              uri: data.URI,
            }
        }
      })

      console.info('useAccountObject: formetedAccountObjects: ', formetedAccountObjects)

      setData(defaultEmployee)
    } catch (error) {
      console.error('useAccountObject: request: ', error)
    } finally {
      client.disconnect()
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    request,
  }
}
