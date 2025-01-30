'use client'

import type { EmployeeData } from '@/types'
import { useEffect } from 'react'
import Image from 'next/image'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CloseIcon from '@mui/icons-material/Close'
import StatusChip from '@/components/dialog/EmployeeProfileDialog/StatusChip'
import URITokenMintButton from '@/components/button/URITokenMintButton'
import { useEmployeeGet } from '@/hooks/useEmployeeGet'

interface EmployeeProfileDialogProps {
  open: boolean
  onClose: () => void
  employee: EmployeeData
}

const EmployeeProfileDialog = ({
  open,
  onClose,
  employee
}: EmployeeProfileDialogProps) => {
  const { request, loading, data } = useEmployeeGet()

  useEffect(() => {
    if (open) {
      request(employee.id, employee.name)
    }
  }, [open])

  const LabelText = ({ label }: { label: string }) => {
    return (
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>
    )
  }

  const TableRowText = ({ label, value }: { label: string; value: string }) => {
    return (
      <>
        <Grid size={4}>
          <LabelText label={label} />
        </Grid>
        <Grid size={8}>
          <Typography variant="body1" color="text.primary">
            {value}
          </Typography>
        </Grid>
      </>
    )
  }

  const TableRowDivider = () => {
    return (
      <Grid size={12}>
        <Divider />
      </Grid>
    )
  }

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500]
        })}
      >
        <CloseIcon />
      </IconButton>
      {loading && <LinearProgress color="primary" />}
      <DialogTitle>Employee Profile</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <TableRowText label="ID" value={employee.id} />
          <TableRowDivider />
          <TableRowText label="Name" value={employee.name} />
          <TableRowDivider />
          <TableRowText label="Address" value={employee.address} />
          <TableRowDivider />
          {loading && (
            <Grid size={12}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          )}
          {!loading && (
            <>
              {/* ID Card status */}
              <Grid size={4}>
                <LabelText label="ID Card status" />
              </Grid>
              <Grid size={8}>
                {data?.isMinted && <StatusChip status="Minted" />}
                {data?.isHeld && <StatusChip status="Held" />}
                {!data?.isMinted && !data?.isHeld && (
                  <StatusChip status="Not minted" />
                )}
              </Grid>
              <TableRowDivider />
              {/* ID Card owner */}
              <TableRowText label="ID Card owner" value={data?.owner || '-'} />
              <TableRowDivider />
              {/* ID Card issuer */}
              <TableRowText
                label="ID Card issuer"
                value={data?.issuer || '-'}
              />
              {data?.image && (
                <>
                  <TableRowDivider />
                  <Grid size={12} textAlign="center" mt={1}>
                    <Image
                      src={data.image}
                      alt="Employee ID Card"
                      width={380}
                      height={220}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </DialogContent>
      {!loading && (
        <DialogActions>
          {data && !data.isMinted && (
            <URITokenMintButton
              employeeId={employee.id.toString()}
              employeeName={employee.name}
              handleRequest={request}
            />
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default EmployeeProfileDialog
