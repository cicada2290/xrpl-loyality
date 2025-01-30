'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import { useTokenPayment } from '@/hooks/useTokenPayment'
import { useAccountStore } from '@/store/accountStore'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const TokenPaymentButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { account } = useAccountStore()
  const { submit } = useTokenPayment()
  const { refresh } = useWalletConnect()

  const handleClick = async () => {
    if (!account.wallet) return
    if (!account.name) return

    setLoading(true)
    await submit(account.wallet)
    await refresh(account.name)
    setLoading(false)
  }

  return (
    <Button
      variant="contained"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      Token Payment
    </Button>
  )
}

export default TokenPaymentButton
