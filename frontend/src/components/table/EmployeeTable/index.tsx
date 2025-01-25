'use client'

import Grid from '@mui/material/Grid2'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import URITokenMintButton from '@/components/button/URITokenMintButton'
import URITokenClaimButton from '@/components/button/URITokenClaimButton'
import TokenFaucetButton from '@/components/button/TokenFaucetButton'
import { useListEmployees } from '@/hooks/useListEmployees'

const EmployeeTable = () => {
  const { data, fetch } = useListEmployees()

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ color: 'gray' }}>
          Employee List
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>
          You can manage employees.
        </Typography>
      </Grid>
      <Grid size={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.id.slice(0, 8)}...{row.id.slice(-8)}
                </TableCell>
                <TableCell>{row.employeeID}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell>
                  {!row.isMinted && <URITokenMintButton fetch={fetch} tokenID={row.id} destination={row.name} />}
                  {row.isMinted && !row.isReceived && (
                    <URITokenClaimButton fetch={fetch} destination={row.name} URITokenID={row.index || ''} />
                  )}
                  {row.isReceived && <TokenFaucetButton employeeName={row.name} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default EmployeeTable
