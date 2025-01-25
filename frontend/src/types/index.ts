export type EmployeeName = 'Alice' | 'Bob' | 'Carol'

export type Employee = {
  id: string
  name: EmployeeName
  employeeID?: string
  isMinted?: boolean
  isReceived?: boolean
  index?: string
  balance?: bigint
}
