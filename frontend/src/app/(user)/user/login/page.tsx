'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSnackbar, SnackbarProvider } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import EmployeeIDCard from '@/components/card/EmployeeIDCard'
import WalletConnectButton from '@/components/button/WalletConnectButton'
import WalletDisconnectButton from '@/components/button/WalletDisconnectButton'
import { useAccountStore } from '@/store/accountStore'
import { useURITokenGet } from '@/hooks/useURITokenGet'
import { useURITokenClaim } from '@/hooks/useURITokenClaim'

const UserLoginPage = () => {
  // State hooks
  const [loading, setLoading] = useState<boolean>(false)

  // Other hooks
  const { account } = useAccountStore()
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const {
    data: idCardData,
    loading: idCardLoading,
    request: idCardRequest,
    setData: setIdCardData
  } = useURITokenGet()
  const { claim } = useURITokenClaim()

  // Event handlers
  const handleClaim = async () => {
    try {
      setLoading(true)

      if (!account.wallet) {
        throw new Error('Wallet is required')
      }

      if (!idCardData?.uriTokenID) {
        throw new Error('URITokenID is required')
      }

      await claim({
        URITokenID: idCardData.uriTokenID
      }, account.wallet)
      enqueueSnackbar('Claim successful', { variant: 'success' })
    } catch (error) {
      console.error('handleClaim: ', error)
      enqueueSnackbar('Claim failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Effects
  useEffect(() => {
    if (account.isConnected && account.name) {
      idCardRequest(account.name)
    }
    if (!account.isConnected) {
      setIdCardData(null)
    }
  }, [account.isConnected])

  useEffect(() => {
    if (idCardData !== null && idCardData.isMyOwn) {
      push('/user/profile')
    }
  }, [idCardData])

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
        {idCardData !== null && !idCardData.isMyOwn && (
          <Card
            variant="outlined"
            sx={{ mb: 2, py: 2, px: 3, backgroundColor: 'grey.200' }}
          >
            <CardHeader title="Please claim your ID card" />
            <CardContent>
              <EmployeeIDCard imageURL={idCardData.image} />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
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

  return (
    <SnackbarProvider autoHideDuration={3000}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh'
        }}
      >
        {/* ID card section */}
        <section>{account.isConnected && <IDCardSection />}</section>

        {/* Wallet connect section */}
        <section>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pb: 1
            }}
          >
            {!account.isConnected && <WalletConnectButton />}
            {account.isConnected && <WalletDisconnectButton />}
          </Box>
        </section>
      </Box>
    </SnackbarProvider>
  )
}

export default UserLoginPage
