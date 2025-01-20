'use client'

import { XAHAU_WSS_URL, API_URL, COMPANY_WALLET_SECRET } from '@/app/constants'
import { useState } from 'react'
import { mintNFT, signTransaction } from "@gemwallet/api"
import { Client, Wallet, URITokenMintFlags } from '@transia/xrpl'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import useAccountStore from '@/store'
import { stringToHex } from '@/utils'

const EMPLOYEE_ID_CARD_URI = `${API_URL}/api/empoly/`

const EmployeeIDCardDialog = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { account } = useAccountStore()

  const handleCreateEmployeeIDCard = async () => {
    const companyWallet = Wallet.fromSeed(COMPANY_WALLET_SECRET)

    const client = new Client(XAHAU_WSS_URL)
    await client.connect()

    try {
      setLoading(true)
      if (!account) {
        throw new Error('Account is not connected')
      }

      const tokenId = '1'

      const response = await client.submitAndWait({
        TransactionType: 'URITokenMint',
        Account: companyWallet.address,
        URI: stringToHex(`${EMPLOYEE_ID_CARD_URI}/${tokenId}`),
        Flags: URITokenMintFlags.tfBurnable,
        NetworkID: await client.getNetworkID()
      }, { wallet: companyWallet })

      console.log('DEBUG: response: ', response)
      setOpen(false)
    } catch (error) {
      console.error('DEBUG: error: ', error)
    } finally {
      client.disconnect()
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create Employee ID Card
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Create Employee ID Card
        </DialogTitle>
        <DialogContent>hoge</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleCreateEmployeeIDCard} loading={loading}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EmployeeIDCardDialog
