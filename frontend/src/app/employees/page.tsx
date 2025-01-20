import PageTitle from '@/components/typography/PageTitle'
import EmployeeIDCardDialog from '@/components/dialog/EmployeeIDCardDialog'
import EmployeeTable from '@/components/table/EmployeeTable'

const EmployeesPage = () => {
  return (
    <>
      <PageTitle>EMPLOYEES</PageTitle>
      <EmployeeIDCardDialog />
      <EmployeeTable />
    </>
  )
}

export default EmployeesPage
