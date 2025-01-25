'use client'

import useAccountStore from '@/store'
import { getAddress, isInstalled } from '@gemwallet/api'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const WalletConnectButton = () => {
  const { account, setAccount } = useAccountStore()

  const handleConnectWallet = async () => {
    isInstalled()
      .then((response) => {
        if (response.result.isInstalled) {
          getAddress()
            .then((response) => {
              if (!response.result) {
                throw new Error('Failed to get address')
              }
              setAccount(response.result.address)
            })
            .catch((error) => {
              console.error('DEBUG: error: ', error)
            })
        }
      })
      .catch((error) => {
        console.error('DEBUG: error: ', error)
      })
  }

  return (
    <>
      {account ? (
        <Typography>{account}</Typography>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          disableElevation
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default WalletConnectButton
