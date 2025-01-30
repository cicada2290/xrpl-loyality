import type { Employee } from '@prisma/client'
import type { EmployeeData } from '@/types'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useEmployeesList = () => {
  const { data: employees, error } = useSWR<Employee[]>(
    '/api/employees',
    fetcher
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<EmployeeData[]>([])

  const list = async () => {
    try {
      setLoading(true)
      if (!employees) throw new Error('Employees not found')

      console.log('employees', employees)

      setData(
        employees.map((employee) => {
          return {
            id: employee.id.toString(),
            name: employee.name,
            address: employee.address
          }
        })
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (employees) {
      list()
    }
  }, [employees])

  return {
    data,
    error,
    loading,
    list
  }
}
