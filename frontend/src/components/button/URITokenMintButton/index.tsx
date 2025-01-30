'use client'

import { useState } from 'react'
import { useSnackbar } from 'notistack'
import Button from '@mui/material/Button'
import { useURITokenMint } from '@/hooks/useURITokenMint'

interface URITokenMintButtonProps {
  employeeId: string
  employeeName: string
  handleRequest: (employeeId: string, employeeName: string) => void
}

const URITokenMintButton = ({
  employeeId,
  employeeName,
  handleRequest
}: URITokenMintButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { mint } = useURITokenMint()
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = async () => {
    setLoading(true)

    try {
      await mint({ employeeId, employeeName })
      await handleRequest(employeeId, employeeName)
      enqueueSnackbar('URIToken minted successfully', {
        variant: 'success'
      })
    } catch (error) {
      console.warn('URITokenMintButton: handleClick: ', error)
      enqueueSnackbar((error as Error).message, {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="contained"
      disableElevation
      loading={loading}
      onClick={handleClick}
    >
      Mint ID Card
    </Button>
  )
}

export default URITokenMintButton
