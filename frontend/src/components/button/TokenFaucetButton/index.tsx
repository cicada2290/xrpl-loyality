'use client'

import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { useReceiveToken } from '@/hooks/useReceiveToken'
import { XrplClient } from '@/libs/XrplClient'
import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

const TokenFaucetButton = ({
  employeeName
}: { employeeName: EmployeeName }) => {
  const { submit, loading } = useReceiveToken()

  return (
    <Button
      variant="outlined"
      disableElevation
      loading={loading}
      onClick={() => submit(employeeName)}
    >
      Send 10 {xrplClient.utilityToken().currency}
    </Button>
  )
}

export default TokenFaucetButton
