import type { AccountSet } from '@transia/xrpl'
import { useState } from 'react'
import { Wallet } from '@transia/xrpl'
import { useAccountStore } from '@/store/accountStore'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'
import { stringToHex, generateMD5Hash } from '@/utils'
import { useRequestAccountRoot } from '@/hooks/useRequestAccountRoot'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export type AccountSetData = {
  domain: string
  email: string
  messageKey: string
  nftokenMinter: string
  transferRate: number
  tickSize: number
  flag: number
  clearFlag: boolean
}

export const useAccountSet = () => {
  const { account, setAccount } = useAccountStore()
  const { request } = useRequestAccountRoot()
  const [loading, setLoading] = useState<boolean>(false)

  const submit = async (data: AccountSetData, wallet: Wallet) => {
    console.log('AccountSetData: ', data)
    try {
      if (!wallet) {
        throw new Error('Wallet is not connected')
      }

      setLoading(true)

      const tx: AccountSet = {
        TransactionType: 'AccountSet',
        Account: wallet.address,
        Domain: data.domain !== 'None' ? stringToHex(data.domain) : '',
        EmailHash: generateMD5Hash(data.email)
      }

      if (!data.clearFlag && data.flag !== 0) {
        tx.SetFlag = data.flag
      }

      if (data.clearFlag && data.flag !== 0) {
        tx.ClearFlag = data.flag
      }

      await xrplClient.submitAccountSet(tx, wallet)

      setAccount({
        ...account,
        root: await request(wallet)
      })
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    submit
  }
}
