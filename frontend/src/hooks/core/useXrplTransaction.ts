import { useState } from 'react'

export const useXrplTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const execute = async <T>(transaction: () => Promise<T>) => {
    try {
      setLoading(true)
      const result = await transaction()
      return result
    } catch (error) {
      console.error('useXrplTransaction: execute: ', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    execute
  }
}
