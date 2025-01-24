'use client'

import { Typography } from '@mui/material'

const PageSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="subtitle1" sx={{ color: 'grey' }}>
      {children}
    </Typography>
  )
}

export default PageSubtitle
