'use client'

import Button from '@mui/material/Button'
import { useTrustSet } from '@/hooks/useTrustSet'

const SetTrustButton = () => {
  const { loading, submit } = useTrustSet()

  return (
    <Button variant="contained" color="primary" disableElevation loading={loading} onClick={submit}>
      Set Trust
    </Button>
  )
}

export default SetTrustButton
