import { APP_NAME } from '@/app/constants'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import WalletConnectButton from '@/components/button/WalletConnectButton'

const Topbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography
          sx={{
            mr: 2,
            letterSpacing: '.3rem',
          }}
        >
          {APP_NAME}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" href="/">
            HOME
          </Button>
          <Button color="inherit" href="/employee">
            EMPLOYEE
          </Button>
          <Button color="inherit" href="/hook">
            HOOK
          </Button>
        </Box>
        <Box>
          <WalletConnectButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
