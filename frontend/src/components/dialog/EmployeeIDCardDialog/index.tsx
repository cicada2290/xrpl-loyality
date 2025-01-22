'use client'

import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import useAccountStore from '@/store'
import { useURITokenMint } from '@/hooks/useMintURIToken'

const EmployeeIDCardDialog = () => {
  const [open, setOpen] = useState(false)

  const { submit, loading } = useURITokenMint()

  const { account } = useAccountStore()

  const handleCreateEmployeeIDCard = async () => {
    try {
      if (!account) {
        throw new Error('Account is not connected')
      }

      await submit({ tokenID: '1', destination: account })

      setOpen(false)
    } catch (error) {
      console.error('DEBUG: error: ', error)
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create Employee ID Card
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Employee ID Card</DialogTitle>
        <DialogContent>hoge</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleCreateEmployeeIDCard} loading={loading}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EmployeeIDCardDialog
