import Box from '@mui/material/Box'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/typography/PageTitle'
import UtilityTokenForm from '@/components/form/UtilityTokenForm'

const TokensPage = () => {
  return (
    <PageContainer maxWidth="sm">
      <PageTitle>TOKENS</PageTitle>
      <Box sx={{ mt: 4 }}>
        <UtilityTokenForm />
      </Box>
    </PageContainer>
  )
}

export default TokensPage
