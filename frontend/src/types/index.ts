export type EmployeeName = 'Alice' | 'Bob' | 'Carol'

export type Employee = {
  id: string
  name: EmployeeName
  isMinted?: boolean
  isReceived?: boolean
  index?: string
}
