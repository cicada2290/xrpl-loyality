'use client'

import { useEffect } from 'react'
import { useAccountStore } from '@/store/accountStore'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import AccountSetDialog from '@/components/dialog/AccountSetDialog'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'
import EmployeeIDCard from '@/components/card/EmployeeIDCard'
import { COMPANY_XAHAU_CONFIG_URL } from '@/constants'
import { stringToHex } from '@/utils'
import { SnackbarProvider } from 'notistack'
import { useGetEmployee } from '@/hooks/useGetEmployee'
import { AUTO_HIDE_DURATION } from '@/constants'

const ProfilePage = () => {
  const { account } = useAccountStore()

  useEffect(() => {
    if (account.wallet?.address) {
      submit(account.wallet?.address)
    }
  }, [account.wallet])

  const { submit, data } = useGetEmployee()

  const DividerArea = () => {
    return (
      <Grid size={12}>
        <Divider />
      </Grid>
    )
  }

  const TextArea = ({
    key,
    value,
    divider = true
  }: { key: string; value: string; divider?: boolean }) => {
    return (
      <>
        <Grid size={4}>
          <Typography variant="body1" color="text.secondary">
            {key}
          </Typography>
        </Grid>
        <Grid size={8}>
          <Typography variant="body1" color="text.primary">
            {value}
          </Typography>
        </Grid>
        {divider && <DividerArea />}
      </>
    )
  }

  const ChipArea = ({
    key,
    value,
    divider = true
  }: { key: string; value: boolean; divider?: boolean }) => {
    return (
      <>
        <Grid size={4}>
          <Typography variant="body1" color="text.secondary">
            {key}
          </Typography>
        </Grid>
        <Grid size={8}>
          <Chip
            label={value ? 'Enabled' : 'Disabled'}
            color={value ? 'success' : 'error'}
          />
        </Grid>
        {divider && <DividerArea />}
      </>
    )
  }

  return (
    <SnackbarProvider autoHideDuration={AUTO_HIDE_DURATION}>
      <PageContainer maxWidth="md">
        <PageHeader title="MY PROFILE" />
        <Grid container spacing={2}>
          <Grid size={12} sx={{ px: 24 }}>
            <EmployeeIDCard
              isMinted={data?.isMinted || false}
              isReceived={data?.isReceived || false}
            />
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AccountSetDialog />
          </Grid>

          {/* Address */}
          {TextArea({ key: 'Address', value: account.wallet?.address || '-' })}

          {/* Balance */}
          {TextArea({
            key: 'Balance',
            value: account.root
              ? `${account.root?.balance.toString()} XAH`
              : '-'
          })}

          {/* Affiliation */}
          {TextArea({
            key: 'Affiliation',
            value:
              account.root?.domain === stringToHex(COMPANY_XAHAU_CONFIG_URL)
                ? 'RuckPlus, Inc.'
                : '-'
          })}

          {/* Gravatar */}
          {TextArea({
            key: 'Gravatar',
            value: account.root?.urlgravatar || '-'
          })}

          {/* asfDefaultRipple */}
          {ChipArea({
            key: 'asfDefaultRipple',
            value: account.root?.flags?.defaultRipple || false
          })}
        </Grid>
      </PageContainer>
    </SnackbarProvider>
  )
}

export default ProfilePage
