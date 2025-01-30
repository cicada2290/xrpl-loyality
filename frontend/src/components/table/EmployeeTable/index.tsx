'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import EmployeeTableHeader from './EmployeeTableHeader'
import EmployeeTableRow from './EmployeeTableRow'
import { useEmployeesList } from '@/hooks/useEmployeesList'

const EmployeeTable = () => {
  const { data: employees } = useEmployeesList()

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ color: 'gray' }}>
          Employee List
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>
          You can manage employees.
        </Typography>
      </Grid>
      <Grid size={12}>
        <Table>
          <EmployeeTableHeader />
          <TableBody>
            {employees.map((employee) => (
              <EmployeeTableRow key={employee.id} employee={employee} />
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default EmployeeTable
