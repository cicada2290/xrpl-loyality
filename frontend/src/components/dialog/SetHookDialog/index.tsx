'use client'

import { useState } from 'react'
import { setHook } from '@gemwallet/api'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import useAccountStore from '@/store'
import { xor } from '@/utils/hook'

const SetHookDialog = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { account } = useAccountStore()

  const handleSetHook = async () => {
    try {
      xor(25n)
      setLoading(true)

      if (!account) {
        throw new Error('Account is not connected')
      }

      const response = await setHook({
        hooks: [
          {
            Hook: {
              CreateCode:
                '0061736D0100000001200560057F7F7F7F7F017E6000017E60037F7F7E017E60027F7F017F60017F017E02430503656E76057472616365000003656E76096F74786E5F74797065000103656E760974726163655F6E756D000203656E7606616363657074000203656E76025F67000303030204040503010002062B077F0141A089040B7F004180080B7F004195090B7F004180080B7F0041A089040B7F0041000B7F0041010B070F02046362616B000504686F6F6B00060AD2810002DF800001017F230041106B220124002001200036020C41E608411A419D084119410010001A20011001370300419A0841022001290300A74108410010001A2001290300422D51044041C8084110418008410F410010001A0B200141106A240042000BEC800001017F230041106B220124002001200036020C418109411341B6084112410010001A20011001370300419A084102200129030010021A200129030050044041D908410C418F08410B410010001A0B410022002000420010031A41012200200010041A200141106A240042000B0B9C0101004180080B94014E46546F6B656E4D696E74205478005061796D656E7420547800747400436172626F6E3A2063616C6C6261636B2063616C6C65642E004163636570742E633A2043616C6C65642E00224E46546F6B656E4D696E742054782200225061796D656E74205478220022436172626F6E3A2063616C6C6261636B2063616C6C65642E2200224163636570742E633A2043616C6C65642E22',
              Flags: 1,
              HookApiVersion: 0,
              HookOn: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDBFFFFF',
              HookNamespace: '4FF9961269BF7630D32E15276569C94470174A5DA79FA567C0F62251AA9A36B9',
            },
          },
        ],
      })

      console.log('DEBUG: response: ', response)
      setOpen(false)
    } catch (error) {
      console.error('DEBUG: error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Set Hook
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Set Hook</DialogTitle>
        <DialogContent>hoge</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSetHook} loading={loading}>
            Set Hook
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SetHookDialog
