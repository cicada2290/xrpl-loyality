'use client'

import TokenFaucetButton from '@/components/button/TokenFaucetButton'
import URITokenClaimButton from '@/components/button/URITokenClaimButton'
import URITokenMintButton from '@/components/button/URITokenMintButton'
import { useListEmployees } from '@/hooks/useListEmployees'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import InfoIcon from '@mui/icons-material/Info'

const info =
  'The id assigns a unique identifier to each employee by generating a 256-bit hash, ensuring data uniqueness and is also used in the Degit of URIToken.'

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
              <TableCell>
                ID
                <Tooltip title={info} placement="top-start">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Tooltip title={row.id} placement="top-start">
                    <Typography variant="body2">
                      {row.id.slice(0, 6)}...{row.id.slice(-6)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.address}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.balance}</Typography>
                </TableCell>
                <TableCell>
                  {!row.isMinted && (
                    <URITokenMintButton
                      fetch={fetch}
                      tokenID={row.id}
                      destination={row.name}
                    />
                  )}
                  {row.isMinted && !row.isReceived && (
                    <URITokenClaimButton
                      fetch={fetch}
                      destination={row.name}
                      URITokenID={row.index || ''}
                    />
                  )}
                  {row.isReceived && (
                    <TokenFaucetButton employeeName={row.name} />
                  )}
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
