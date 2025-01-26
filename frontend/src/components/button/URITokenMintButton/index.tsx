'use client'

import type { EmployeeName } from '@/types'
import { useState } from 'react'
import { useURITokenMint } from '@/hooks/useURITokenMint'
import Button from '@mui/material/Button'
import { useAccountStore } from '@/store/accountStore'
import { useSnackbar } from 'notistack'

interface URITokenMintButtonProps {
  tokenID: string
  destination: EmployeeName
  fetch: () => void
}

const URITokenMintButton = ({
  tokenID,
  destination,
  fetch
}: URITokenMintButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { submit } = useURITokenMint()
  const { enqueueSnackbar } = useSnackbar()

  const { account } = useAccountStore()

  const handleClick = async () => {
    setLoading(true)

    try {
      if (!account.wallet) {
        throw new Error('Not connected to the wallet')
      }

      if (account.name !== 'Company') {
        throw new Error('Only the company can mint URIToken')
      }

      await submit({ tokenID, destination, executeWallet: account.wallet })
      await fetch()
      enqueueSnackbar('URIToken minted successfully', {
        variant: 'success'
      })
    } catch (error) {
      console.warn('URITokenMintButton: handleClick: ', error)
      enqueueSnackbar((error as Error).message, {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outlined"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      URIToken Mint
    </Button>
  )
}

export default URITokenMintButton
