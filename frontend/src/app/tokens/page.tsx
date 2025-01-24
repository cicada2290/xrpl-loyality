'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/typography/PageTitle'
import UtilityTokenForm from '@/components/form/UtilityTokenForm'
import { SnackbarProvider } from 'notistack'

const TokensPage = () => {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <PageContainer maxWidth="sm">
        <PageTitle>TOKENS</PageTitle>
        <Box sx={{ mt: 2 }} display="flex" flexDirection="column" gap={2} alignItems="center">
          <UtilityTokenForm />
          {/* TODO: バランスを表示する */}
          <Typography variant="body1" sx={{ color: 'gray' }}>
            Balance: {Number(1000).toLocaleString()}
          </Typography>
        </Box>
      </PageContainer>
    </SnackbarProvider>
  )
}

export default TokensPage
