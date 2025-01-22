'use client'

import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import URITokenMintButton from '@/components/button/URITokenMintButton'
import URITokenClaimButton from '@/components/button/URITokenClaimButton'
import { useListURIToken } from '@/hooks/useListURIToken'

const EmployeeTable = () => {
  const { data, fetch } = useListURIToken()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Token ID</TableCell>
          <TableCell>Employee ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              {row.id.slice(0, 8)}...{row.id.slice(-8)}
            </TableCell>
            <TableCell>{row.empolyID}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              {!row.isMinted && <URITokenMintButton fetch={fetch} tokenID={row.id} destination={row.empolyID} />}
              {row.isMinted && <URITokenClaimButton />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EmployeeTable
