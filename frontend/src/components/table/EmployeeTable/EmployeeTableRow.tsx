'use client'

import type { EmployeeData } from '@/types'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import EmployeeProfileDialog from '@/components/dialog/EmployeeProfileDialog'

interface EmployeeTableRowProps {
  employee: EmployeeData
}

const EmployeeTableRow = ({ employee }: EmployeeTableRowProps) => {
  const [openEmployeeProfileDialog, setOpenEmployeeProfileDialog] =
    useState<boolean>(false)

  return (
    <TableRow key={employee.id}>
      <TableCell>
        <Typography variant="body2">{employee.id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{employee.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{employee.address}</Typography>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpenEmployeeProfileDialog(true)}
        >
          Details
        </Button>
        <EmployeeProfileDialog
          open={openEmployeeProfileDialog}
          onClose={() => setOpenEmployeeProfileDialog(false)}
          employee={employee}
        />
      </TableCell>
    </TableRow>
  )
}

export default EmployeeTableRow
