'use client'

import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'
import { useURITokenMint } from '@/hooks/useMintURIToken'

interface URITokenMintButtonProps {
  tokenID: string
  destination: EmployeeName
  fetch: () => void
}

const URITokenMintButton = ({ tokenID, destination, fetch }: URITokenMintButtonProps) => {
  const { submit, loading } = useURITokenMint()

  const handleClick = async () => {
    await submit({ tokenID, destination })
    await fetch()
  }

  return (
    <Button variant="outlined" disableElevation loading={loading} onClick={handleClick}>
      Mint
    </Button>
  )
}

export default URITokenMintButton
