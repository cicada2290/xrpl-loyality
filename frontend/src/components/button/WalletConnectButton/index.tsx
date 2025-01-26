'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccountStore } from '@/store/accountStore'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import WalletConnectDialog from '@/components/dialog/WalletConnectDialog'

const WalletConnectButton = () => {
  const [open, setOpen] = useState<boolean>(false)

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)

  const router = useRouter()

  const { account, resetAccount } = useAccountStore()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleProfile = () => {
    router.push('/profile')
    handleMenuClose()
  }

  const handleLogout = () => {
    resetAccount()
    handleMenuClose()
  }

  return (
    <>
      {account.name !== null ? (
        <>
          <Button variant="text" color="inherit" onClick={handleMenuOpen}>
            {account.name}
          </Button>
          <Menu
            id="wallet-connect-menu"
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'wallet-connect-menu'
            }}
          >
            <MenuList>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="avatar" src={account.root?.urlgravatar || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={account.name}
                  secondary={account.wallet?.address}
                />
              </ListItem>
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Typography variant="body1" color="inherit">
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <Typography variant="body1" color="inherit">
                  Disconnect
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <Button variant="outlined" color="inherit" onClick={handleOpen}>
          Connect Wallet
        </Button>
      )}
      <WalletConnectDialog open={open} onClose={handleClose} />
    </>
  )
}

export default WalletConnectButton
