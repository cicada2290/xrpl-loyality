'use client'

import Button from '@mui/material/Button'
import { useURITokenMint } from '@/hooks/useMintURIToken'

interface URITokenMintButtonProps {
  tokenID: string
  destination: string
  fetch: () => void
}

const URITokenMintButton = ({ tokenID, destination, fetch }: URITokenMintButtonProps) => {
  const { submit, loading } = useURITokenMint()

  const handleClick = async () => {
    await submit({ tokenID, destination })
    fetch()
  }

  return (
    <Button variant="outlined" disableElevation loading={loading} onClick={handleClick}>
      Mint
    </Button>
  )
}

export default URITokenMintButton
