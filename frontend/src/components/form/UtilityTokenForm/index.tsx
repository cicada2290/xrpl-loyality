'use client'

import type { CreateUtilityTokenData } from '@/hooks/useCreateUtilityToken'
import { Controller, useForm } from 'react-hook-form'
import { XrplClient } from '@/libs/XrplClient'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import SubmitButton from '@/components/button/SubmitButton'
import { useCreateUtilityToken } from '@/hooks/useCreateUtilityToken'
import { Typography } from '@mui/material'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

const UtilityTokenForm = () => {
  const { control, handleSubmit } = useForm<CreateUtilityTokenData>({})

  const { loading, submit } = useCreateUtilityToken()

  const onSubmit = async (data: CreateUtilityTokenData) => {
    try {
      await submit(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ color: 'gray' }}>
          Faucet for utility token
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>
          You can issue utility tokens and receive them in the company&apos;s wallet.
        </Typography>
      </Grid>
      <Grid size={12} display="flex" flexDirection="column" gap={2}>
        <Controller
          name="currency"
          control={control}
          defaultValue={xrplClient.getUtilityToken().currency}
          render={({ field }) => <TextField label="Currency" type="text" value={field.value} disabled fullWidth />}
        />
        <Controller
          name="issuer"
          control={control}
          defaultValue={xrplClient.getUtilityToken().issuer}
          render={({ field }) => <TextField label="Issuer" type="text" value={field.value} disabled fullWidth />}
        />
        <Controller
          name="issueAmount"
          control={control}
          defaultValue={10000}
          render={({ field, formState: { errors } }) => (
            <TextField
              label="Issue amount"
              type="number"
              value={field.value}
              error={errors.issueAmount ? true : false}
              fullWidth
            />
          )}
        />
        <Controller
          name="recipient"
          control={control}
          defaultValue={xrplClient.getWallet().company.address}
          render={({ field }) => <TextField label="Recipient" type="text" value={field.value} disabled fullWidth />}
        />
        <SubmitButton onSubmit={handleSubmit(onSubmit)} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default UtilityTokenForm
