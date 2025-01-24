'use client'

import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'
import { useReceiveToken } from '@/hooks/useReceiveToken'

const TokenFaucetButton = ({ employeeName }: { employeeName: EmployeeName }) => {
  const { submit, loading } = useReceiveToken()

  return (
    <Button variant="outlined" disableElevation loading={loading} onClick={() => submit(employeeName)}>
      Faucet
    </Button>
  )
}

export default TokenFaucetButton
