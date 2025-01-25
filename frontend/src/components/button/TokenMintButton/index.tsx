'use client'

import Button from '@mui/material/Button'
import { useMintToken } from '@/hooks/useMintToken'

const TokenMintButton = () => {
  const { loading, submit } = useMintToken()

  return (
    <Button variant="contained" disableElevation loading={loading} onClick={submit}>
      Mint
    </Button>
  )
}

export default TokenMintButton
