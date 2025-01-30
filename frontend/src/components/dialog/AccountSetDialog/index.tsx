'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AccountSetForm from '@/components/form/AccountSetForm'

const AccountSetDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Button variant="contained" disableElevation onClick={() => handleOpen()}>
        Account Set
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Account Set</DialogTitle>
        <DialogContent>
          <AccountSetForm closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AccountSetDialog
