'use client'

import Box from '@mui/material/Box'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/typography/PageTitle'
import EmployeeTable from '@/components/table/EmployeeTable'
import { SnackbarProvider } from 'notistack'

const EmployeesPage = () => {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <PageContainer maxWidth="lg">
        <PageTitle>EMPLOYEES</PageTitle>
        <Box sx={{ mt: 2 }}>
          <EmployeeTable />
        </Box>
      </PageContainer>
    </SnackbarProvider>
  )
}

export default EmployeesPage
