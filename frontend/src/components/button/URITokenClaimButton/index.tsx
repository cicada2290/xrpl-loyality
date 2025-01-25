'use client'

import { useClaimURIToken } from '@/hooks/useClaimURIToken'
import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'

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
  const { submit, loading } = useClaimURIToken()

  const handleClick = async () => {
    await submit({ destination, URITokenID })
    await fetch()
  }

  return (
    <Button
      variant="outlined"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      Claim
    </Button>
  )
}

export default URITokenClaimButton
