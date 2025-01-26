'use client'

import Box from '@mui/material/Box'
import PageTitle from '@/components/typography/PageTitle'

type PageHeaderProps = {
  title: string
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Box mb={2}>
      <PageTitle>{title}</PageTitle>
    </Box>
  )
}

export default PageHeader
