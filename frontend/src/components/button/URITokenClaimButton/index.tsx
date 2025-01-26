'use client'

import { useState } from 'react'
import { useClaimURIToken } from '@/hooks/useClaimURIToken'
import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'
import { useSnackbar } from 'notistack'
import { useAccountStore } from '@/store/accountStore'

interface URITokenClaimButtonProps {
  destination: EmployeeName
  URITokenID: string
  fetch: () => Promise<void>
}

const URITokenClaimButton = ({
  destination,
  URITokenID,
  fetch
}: URITokenClaimButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { account } = useAccountStore()

  const { submit } = useClaimURIToken()
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = async () => {
    setLoading(true)

    try {
      if (!account.wallet) {
        throw new Error('Not connected to the wallet')
      }

      if (account.name === 'Company') {
        throw new Error('Only the employee can claim URIToken')
      }

      await submit({ destination, URITokenID })
      await fetch()
      enqueueSnackbar('URIToken claimed successfully', {
        variant: 'success'
      })
    } catch (error) {
      console.warn('URITokenClaimButton: handleClick: ', error)
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
      color="warning"
      onClick={handleClick}
    >
      URIToken Claim
    </Button>
  )
}

export default URITokenClaimButton
