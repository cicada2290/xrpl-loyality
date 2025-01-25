'use client'

import type { EmployeeName } from '@/types'
import Button from '@mui/material/Button'
import { useReceiveToken } from '@/hooks/useReceiveToken'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs/XrplClient'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

const TokenFaucetButton = ({ employeeName }: { employeeName: EmployeeName }) => {
  const { submit, loading } = useReceiveToken()

  return (
    <Button variant="outlined" disableElevation loading={loading} onClick={() => submit(employeeName)}>
      Send 10 {xrplClient.getUtilityToken().currency}
    </Button>
  )
}

export default TokenFaucetButton
