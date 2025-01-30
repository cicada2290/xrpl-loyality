'use client'

import { useWalletDisconnect } from '@/hooks/useWalletDisconnect'
import Button from '@mui/material/Button'

const WalletDisconnectButton = () => {
  const { disconnect } = useWalletDisconnect()

  return (
    <Button variant="outlined" onClick={disconnect}>
      Disconnect
    </Button>
  )
}

export default WalletDisconnectButton
