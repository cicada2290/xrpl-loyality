'use client'

import Button from '@mui/material/Button'

type SubmitButtonProps = {
  onSubmit: () => void
  loading: boolean
}

const SubmitButton = ({ onSubmit, loading }: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="large"
      onClick={onSubmit}
      loading={loading}
    >
      Submit
    </Button>
  )
}

export default SubmitButton
