'use client'

import { useEffect, useState } from 'react'
import { useSnackbar, SnackbarProvider } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import EmployeeIDCard from '@/components/card/EmployeeIDCard'
import WalletConnectButton from '@/components/button/WalletConnectButton'
import WalletDisconnectButton from '@/components/button/WalletDisconnectButton'
import { useAccountStore } from '@/store/accountStore'
import { useURITokenGet } from '@/hooks/useURITokenGet'
import { useURITokenClaim } from '@/hooks/useURITokenClaim'

const LoginPage = () => {
  const [connected, setConnected] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()

  const { account } = useAccountStore()
  const {
    data: idCardData,
    loading: idCardLoading,
    request: idCardRequest,
    setData: setIdCardData
  } = useURITokenGet()

  const { claim } = useURITokenClaim()

  const handleClaim = async () => {
    try {
      setLoading(true)

      if (!account.name) {
        throw new Error('Account name is required')
      }

      if (!idCardData?.uriTokenID) {
        throw new Error('URITokenID is required')
      }

      await claim({
        accountName: account.name,
        URITokenID: idCardData.uriTokenID
      })
      enqueueSnackbar('Claim successful', { variant: 'success' })
    } catch (error) {
      console.error('handleClaim: ', error)
      enqueueSnackbar('Claim failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setConnected(account.isConnected)
  }, [account.isConnected])

  useEffect(() => {
    if (connected && account.name) {
      idCardRequest(account.name)
    }
    if (!connected) {
      setIdCardData(null)
    }
  }, [connected])

  const IDCardSection = () => {
    return (
      <>
        {idCardLoading && (
          <Skeleton
            variant="rounded"
            width={380}
            height={220}
            sx={{ mb: 2, py: 2, px: 3 }}
          />
        )}
        {idCardData !== null && (
          <Card sx={{ mb: 2, py: 2, px: 3, backgroundColor: 'grey.200' }}>
            <CardContent>
              <EmployeeIDCard image={idCardData.image} />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                loading={loading}
                onClick={handleClaim}
              >
                Claim
              </Button>
            </CardActions>
          </Card>
        )}
      </>
    )
  }

  const WalletConnectSection = ({ isConnected }: { isConnected: boolean }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 1
      }}
    >
      {isConnected && <IDCardSection />}
      {!isConnected && <WalletConnectButton />}
      {isConnected && <WalletDisconnectButton />}
    </Box>
  )

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        <WalletConnectSection isConnected={connected} />
      </Box>
    </SnackbarProvider>
  )
}

export default LoginPage
