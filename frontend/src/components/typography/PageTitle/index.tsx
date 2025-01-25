'use client'

import Typography from '@mui/material/Typography'

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'grey' }}>
      {children}
    </Typography>
  )
}

export default PageTitle
