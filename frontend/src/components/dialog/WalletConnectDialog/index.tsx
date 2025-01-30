'use client'

import type { EmployeeName } from '@/types'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LinearProgress from '@mui/material/LinearProgress'
import { employees } from '@/constants/employees'
import { useWalletConnect } from '@/hooks/useWalletConnect'

interface WalletConnectDialogProps {
  open: boolean
  onClose: () => void
}

const WalletConnectDialog = ({ open, onClose }: WalletConnectDialogProps) => {
  const { connect } = useWalletConnect()

  const [loading, setLoading] = useState<boolean>(false)

  const handleConnect = async (
    accountType: EmployeeName | 'Company' | 'UtilityToken'
  ) => {
    setLoading(true)
    await connect(accountType)
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
          <Button
            variant="contained"
            disableElevation
            fullWidth
            disabled={loading}
            onClick={() => handleConnect('UtilityToken')}
          >
            Utility Token Issuer
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default WalletConnectDialog
