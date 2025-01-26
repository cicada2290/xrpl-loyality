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
