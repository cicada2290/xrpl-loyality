'use client'

import PageContainer from '@/components/layout/PageContainer'
import EmployeeTable from '@/components/table/EmployeeTable'
import PageTitle from '@/components/typography/PageTitle'
import Box from '@mui/material/Box'
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
