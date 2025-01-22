import { APP_NAME } from '@/constants'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import WalletConnectButton from '@/components/button/WalletConnectButton'
import TopbarLinkButton from '@/components/layout/TopbarLinkButton'

import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreVert'

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
        <IconButton size="large" aria-label="display more actions" edge="end" color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
