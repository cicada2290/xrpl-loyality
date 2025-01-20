import { APP_NAME } from '@/constants'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import WalletConnectButton from '@/components/button/WalletConnectButton'
import TopbarLinkButton from '@/components/layout/TopbarLinkButton'

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
          <TopbarLinkButton href="/" label="HOME" />
          <TopbarLinkButton href="/employees" label="EMPLOYEES" />
          <TopbarLinkButton href="/hooks" label="HOOKS" />
        </Box>
        <Box>
          <WalletConnectButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
