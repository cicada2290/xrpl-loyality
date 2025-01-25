'use client'

import { useMintToken } from '@/hooks/useMintToken'
import Button from '@mui/material/Button'

const TokenMintButton = () => {
  const { loading, submit } = useMintToken()

  return (
    <Button
      variant="contained"
      disableElevation
      loading={loading}
      onClick={submit}
    >
      Mint
    </Button>
  )
}

export default TokenMintButton
