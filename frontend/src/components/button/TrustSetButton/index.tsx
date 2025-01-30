'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import { useTrustSet } from '@/hooks/useTrustSet'
import { useAccountStore } from '@/store/accountStore'
import { useWalletConnect } from '@/hooks/useWalletConnect'

const TrustSetButton = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { account } = useAccountStore()
  const { refresh } = useWalletConnect()
  const { submit } = useTrustSet()

  const handleClick = async () => {
    if (!account.wallet) return
    if (!account.name) return

    setLoading(true)
    await submit(account.wallet.address, account.wallet)
    await refresh(account.name)
    setLoading(false)
  }

  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      Trust Set
    </Button>
  )
}

export default TrustSetButton
