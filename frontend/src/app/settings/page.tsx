'use client'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'
import AccountSetForm from '@/components/form/AccountSetForm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SnackbarProvider } from 'notistack'

const SettingsPage = () => {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <PageContainer maxWidth="sm">
        <PageHeader title="SETTINGS" />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="account-set-panel"
            id="account-set-panel"
          >
            AccountSet
          </AccordionSummary>
          <AccordionDetails>
            <AccountSetForm />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="account-set-panel"
            id="account-set-panel"
          >
            AccountSet
          </AccordionSummary>
          <AccordionDetails>
            <AccountSetForm />
          </AccordionDetails>
        </Accordion>
      </PageContainer>
    </SnackbarProvider>
  )
}

export default SettingsPage
