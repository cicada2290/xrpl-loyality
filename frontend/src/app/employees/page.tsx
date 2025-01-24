import Box from '@mui/material/Box'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/typography/PageTitle'
import EmployeeTable from '@/components/table/EmployeeTable'

const EmployeesPage = () => {
  return (
    <PageContainer>
      <PageTitle>EMPLOYEES</PageTitle>
      <Box sx={{ mt: 2 }}>
        <EmployeeTable />
      </Box>
    </PageContainer>
  )
}

export default EmployeesPage
