import type { Employee, EmployeeName } from '@/types'
import { generate256BitHash } from '@/utils'

export const EMPLOYEE_NAMES: Record<EmployeeName, EmployeeName> = {
  Alice: 'Alice',
  Bob: 'Bob',
  Carol: 'Carol',
  Dave: 'Dave',
  Eve: 'Eve'
} as const

export const employees: Employee[] = [
  {
    id: generate256BitHash('1'),
    name: EMPLOYEE_NAMES.Alice
  },
  {
    id: generate256BitHash('2'),
    name: EMPLOYEE_NAMES.Bob
  },
  {
    id: generate256BitHash('3'),
    name: EMPLOYEE_NAMES.Carol
  },
  {
    id: generate256BitHash('4'),
    name: EMPLOYEE_NAMES.Dave
  },
  {
    id: generate256BitHash('5'),
    name: EMPLOYEE_NAMES.Eve
  }
]
