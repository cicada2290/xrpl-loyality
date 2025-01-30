'use client'

import Button from '@mui/material/Button'
import { useAccountStore } from '@/store/accountStore'

type SubmitButtonProps = {
  onSubmit: () => void
  loading: boolean
}

const SubmitButton = ({ onSubmit, loading }: SubmitButtonProps) => {
  const { account } = useAccountStore()

  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="large"
      onClick={onSubmit}
      loading={loading}
      disabled={!account.wallet}
    >
      {!account.name ? 'Please connect wallet' : 'Submit'}
    </Button>
  )
}

export default SubmitButton
