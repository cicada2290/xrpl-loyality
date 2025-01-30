'use client'

import type { AccountSetData } from '@/hooks/useAccountSet'
import { useAccountStore } from '@/store/accountStore'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useAccountSet } from '@/hooks/useAccountSet'
import { useSnackbar } from 'notistack'
import SubmitButton from '@/components/button/SubmitButton'
import { COMPANY_XAHAU_CONFIG_URL } from '@/constants'
import { schema } from './schema'

interface AccountSetFormProps {
  closeDialog?: () => void
}

const AccountSetForm = ({ closeDialog }: AccountSetFormProps) => {
  const { control, handleSubmit } = useForm<AccountSetData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })

  const { account } = useAccountStore()
  const { loading, submit } = useAccountSet()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data: AccountSetData) => {
    try {
      if (!account.wallet) {
        throw new Error('Wallet is not connected')
      }

      await submit(data, account.wallet)
      enqueueSnackbar('Successfully submitted AccountSet transaction', {
        variant: 'success'
      })
      closeDialog?.()
    } catch (error) {
      enqueueSnackbar('Error submitting AccountSet transaction', {
        variant: 'error'
      })
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Controller
          name="domain"
          control={control}
          defaultValue=""
          render={({ field, formState: { errors } }) => (
            <FormControl
              size="small"
              fullWidth
              error={errors.domain ? true : false}
            >
              <InputLabel id="domain-label">Domain</InputLabel>
              <Select
                labelId="domain-label"
                id="domain"
                label="Domain"
                {...field}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value={COMPANY_XAHAU_CONFIG_URL}>
                  RuckPlus, Inc.
                </MenuItem>
              </Select>
              <FormHelperText>
                {errors.domain?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="Email"
              size="small"
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email?.message as string}
            />
          )}
        />

        <Controller
          name="messageKey"
          control={control}
          defaultValue=""
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="MessageKey"
              size="small"
              fullWidth
              error={errors.messageKey ? true : false}
              helperText={errors.messageKey?.message as string}
            />
          )}
        />

        <Controller
          name="nftokenMinter"
          control={control}
          defaultValue=""
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="NFTokenMinter"
              size="small"
              fullWidth
              error={errors.nftokenMinter ? true : false}
              helperText={errors.nftokenMinter?.message as string}
            />
          )}
        />

        <Controller
          name="transferRate"
          control={control}
          defaultValue={0}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="TransferRate"
              size="small"
              type="number"
              error={errors.transferRate ? true : false}
              helperText={errors.transferRate?.message as string}
              fullWidth
            />
          )}
        />

        <Controller
          name="tickSize"
          control={control}
          defaultValue={0}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="TickSize"
              size="small"
              type="number"
              error={errors.tickSize ? true : false}
              helperText={errors.tickSize?.message as string}
              fullWidth
            />
          )}
        />

        <Controller
          name="flag"
          control={control}
          defaultValue={0}
          render={({ field, formState: { errors } }) => (
            <FormControl
              size="small"
              fullWidth
              error={errors.flag ? true : false}
            >
              <InputLabel id="flag-label">Flag</InputLabel>
              <Select labelId="flag-label" id="flag" label="Flag" {...field}>
                <MenuItem value={0}>Not selected</MenuItem>
                <MenuItem value={8}>asfDefaultRipple</MenuItem>
                <MenuItem value={9}>asfDepositAuth</MenuItem>
                <MenuItem value={4}>asfDisableMaster</MenuItem>
                <MenuItem value={13}>asfDisallowIncomingCheck</MenuItem>
                <MenuItem value={12}>asfDisallowIncomingNFTokenOffer</MenuItem>
                <MenuItem value={14}>asfDisallowIncomingPayChan</MenuItem>
                <MenuItem value={15}>asfDisallowIncomingTrustline</MenuItem>
                <MenuItem value={16}>asfDisallowIncomingRemit</MenuItem>
                <MenuItem value={3}>asfDisallowXRP</MenuItem>
                <MenuItem value={4}>asfGlobalFreeze</MenuItem>
                <MenuItem value={6}>asfNoFreeze</MenuItem>
                <MenuItem value={2}>asfRequireAuth</MenuItem>
                <MenuItem value={1}>asfRequireDestTag</MenuItem>
                <MenuItem value={11}>asfTshCollect</MenuItem>
              </Select>
              <FormHelperText>{errors.flag?.message as string}</FormHelperText>
            </FormControl>
          )}
        />

        <Box sx={{ ml: 2 }}>
          <Controller
            name="clearFlag"
            control={control}
            defaultValue={false}
            render={({ field, formState: { errors } }) => (
              <FormGroup {...field}>
                <FormControlLabel
                  control={<Checkbox name="clearFlag" />}
                  label="Clear Flag"
                  value={field.value}
                />
                <FormHelperText>
                  {errors.clearFlag?.message || ''}
                </FormHelperText>
              </FormGroup>
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SubmitButton loading={loading} onSubmit={handleSubmit(onSubmit)} />
        </Box>
      </Box>
    </Box>
  )
}

export default AccountSetForm
