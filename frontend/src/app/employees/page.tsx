'use client'

import PageContainer from '@/components/layout/PageContainer'
import EmployeeTable from '@/components/table/EmployeeTable'
import PageTitle from '@/components/typography/PageTitle'
import Box from '@mui/material/Box'
import { SnackbarProvider } from 'notistack'
import { AUTO_HIDE_DURATION } from '@/constants'

const EmployeesPage = () => {
  return (
    <SnackbarProvider autoHideDuration={AUTO_HIDE_DURATION}>
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
