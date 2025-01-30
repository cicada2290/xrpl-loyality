export type EmployeeName = 'Alice' | 'Bob' | 'Carol' | 'Dave' | 'Eve'

export type Employee = {
  id: string
  name: EmployeeName
  address?: string
  isMinted?: boolean
  isReceived?: boolean
  index?: string
  balance?: bigint
}

export type EmployeeData = {
  id: string
  name: string
  address: string
  degit: string
}
