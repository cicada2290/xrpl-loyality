'use client'

import type { EmployeeName } from '@/types'
import { useState } from 'react'
import { useAccountStore } from '@/store/accountStore'
import { useRequestAccountRoot } from '@/hooks/useRequestAccountRoot'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LinearProgress from '@mui/material/LinearProgress'
import { employees } from '@/constants/employees'
import { getWallet } from '@/utils'

interface WalletConnectDialogProps {
  open: boolean
  onClose: () => void
}

const WalletConnectDialog = ({ open, onClose }: WalletConnectDialogProps) => {
  const { setAccount } = useAccountStore()
  const { request } = useRequestAccountRoot()

  const [loading, setLoading] = useState<boolean>(false)

  const handleConnect = async (accountType: EmployeeName | 'Company') => {
    setLoading(true)

    const wallet = getWallet(accountType)
    const root = await request(wallet)

    setAccount({
      name: accountType,
      wallet,
      root
    })

    setLoading(false)

    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      {loading && <LinearProgress color="primary" />}
      <DialogTitle>Select Wallet</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {employees.map((employee) => (
            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              key={employee.id}
              onClick={() => handleConnect(employee.name)}
            >
              {employee.name}
            </Button>
          ))}
          <Button
            variant="contained"
            disableElevation
            fullWidth
            disabled={loading}
            onClick={() => handleConnect('Company')}
          >
            Company
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default WalletConnectDialog
