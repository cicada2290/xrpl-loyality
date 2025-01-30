import type { AccountObjectsResponse } from '@transia/xrpl'
import { useState } from 'react'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useGetEmployee = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<{
    isMinted: boolean
    isReceived: boolean
  } | null>(null)

  const submit = async (address: string) => {
    try {
      setLoading(true)
      console.log('address: ', address)

      const [companyAccountObjectsResponse] = (await xrplClient.multiRequest([
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
      ])) as [AccountObjectsResponse]

      console.info(
        'useListEmployees: companyAccountObjects: ',
        companyAccountObjectsResponse
      )

      const companyURIToken =
        companyAccountObjectsResponse.result?.account_objects
          .filter((data) => data.LedgerEntryType === 'URIToken')
          .filter(
            (data) => data.Issuer === xrplClient.wallet('Company').address
          )

      const [employeeAccountObjectsResponse] = (await xrplClient.multiRequest([
        {
          command: 'account_objects',
          account: address,
          ledger_index: 'validated'
        }
      ])) as [AccountObjectsResponse]

      console.info(
        'useListEmployees: employeeAccountObjects: ',
        employeeAccountObjectsResponse
      )

      const uriToken = employeeAccountObjectsResponse.result?.account_objects
        .filter((data) => data.LedgerEntryType === 'URIToken')
        .filter((data) => xrplClient.wallet('Company').address === data.Issuer)
        .shift()

      // Check if the company holds the NFT
      const isHoldNFTCompany =
        companyURIToken
          .filter(
            (data) => xrplClient.wallet('Company').address === data.Issuer
          )
          .shift() !== undefined

      // Check if the employee holds the NFT
      const isHoldNFTEmployee = !!uriToken

      // Check if the NFT is minted
      const isMintedNFT = isHoldNFTCompany || isHoldNFTEmployee

      // Check if the NFT is received
      const isReceivedNFT = isMintedNFT ? address === uriToken?.Owner : false

      setData({
        isMinted: isMintedNFT,
        isReceived: isReceivedNFT
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    submit,
    data
  }
}
