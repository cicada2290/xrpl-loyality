'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const UnpublishedCard = () => {
  return (
    <Card variant="outlined" sx={{ backgroundColor: 'lightgray' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary" pt={1}>
          Employee ID Card has not been issued
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UnpublishedCard
