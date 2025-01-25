import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { XrplClient } from '@/libs'
import { useState } from 'react'

const xrplClient = new XrplClient(XAHAU_WSS_ENDPOINT)

export const useMintToken = () => {
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)

    try {
      await xrplClient.submitMintToken()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    submit,
    setLoading
  }
}
