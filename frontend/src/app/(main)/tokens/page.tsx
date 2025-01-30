'use client'

import UtilityTokenForm from '@/components/form/UtilityTokenForm'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/typography/PageTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SnackbarProvider } from 'notistack'
import { AUTO_HIDE_DURATION } from '@/constants'

const TokensPage = () => {
  return (
    <SnackbarProvider autoHideDuration={AUTO_HIDE_DURATION}>
      <PageContainer maxWidth="sm">
        <PageTitle>TOKENS</PageTitle>
        <Box
          sx={{ mt: 2 }}
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
        >
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
