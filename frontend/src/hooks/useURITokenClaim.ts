import type { URITokenBuy } from '@transia/xrpl'
import { xrpToDrops, Wallet } from '@transia/xrpl'
import { XrplClient } from '@/libs/XrplClient'
import { useXrplTransaction } from '@/hooks/core/useXrplTransaction'

interface ClaimParams {
  URITokenID: string
}

const xrplClient = new XrplClient()

export const useURITokenClaim = () => {
  const { execute, loading } = useXrplTransaction()

  const claim = async (params: ClaimParams, wallet: Wallet): Promise<void> => {
    try {
      const tx: URITokenBuy = {
        TransactionType: 'URITokenBuy',
        Account: wallet.address,
        Amount: xrpToDrops(0),
        URITokenID: params.URITokenID
      }

      execute(async () => {
        const response = await xrplClient.submitURITokenBuy(tx, wallet)
        console.info('useURITokenClaim: claim: ', response)
        return response
      })
    } catch (error) {
      console.error('useURITokenBuy: claim: ', error)
      throw error
    }
  }

  return {
    loading,
    claim
  }
}
