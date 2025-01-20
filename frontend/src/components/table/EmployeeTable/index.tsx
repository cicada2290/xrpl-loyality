'use client'

import { ALICE_WALLET_SECRET, COMPANY_WALLET_SECRET } from '@/constants'
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useAccountObject } from '@/hooks/useAccountObject'
import { useURITokenBuy } from '@/hooks/useURITokenBuy'
import useAccountStore from '@/store'
import { Wallet } from '@transia/xrpl'
import URITokenMintButton from '@/components/button/URITokenMintButton'
import URITokenClaimButton from '@/components/button/URITokenClaimButton'

const aliceWallet = Wallet.fromSeed(ALICE_WALLET_SECRET)
const companyWallet = Wallet.fromSeed(COMPANY_WALLET_SECRET)

const EmployeeTable = () => {
  const { request, data } = useAccountObject()
  const { account } = useAccountStore()
  const { submit } = useURITokenBuy()

  useEffect(() => {
    request()
  }, [])

  useEffect(() => {
    console.info('EmployeeTable: data: ', data)
  }, [data])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Token ID</TableCell>
          <TableCell>Employee ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id.slice(0, 8)}...{row.id.slice(-8)}</TableCell>
            <TableCell>{row.empolyID}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.owner || '-'}</TableCell>
            <TableCell>
              {!row.owner && <URITokenMintButton />}
              {row.owner == companyWallet.address && <URITokenClaimButton />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EmployeeTable
