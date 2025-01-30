'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import { useTokenFaucet } from '@/hooks/useTokenFaucet'
import { useAccountStore } from '@/store/accountStore'

const TokenFaucetButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { submit } = useTokenFaucet()
  const { account } = useAccountStore()

  const handleClick = async () => {
    if (!account.wallet) return
    if (!account.name) return

    setLoading(true)
    await submit(account.name, account.wallet.address)
    setLoading(false)
  }

  return (
    <Button
      variant="contained"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      Faucet
    </Button>
  )
}

export default TokenFaucetButton
