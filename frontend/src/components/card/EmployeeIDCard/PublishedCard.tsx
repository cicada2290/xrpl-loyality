'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const PublishedCard = () => {
  return (
    <Card variant="outlined" sx={{ backgroundColor: 'lightgray' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary" pt={1} pb={1}>
          Employee ID Card has not been issued
        </Typography>
        <Button variant="contained" disableElevation>
          Issue Employee ID Card
        </Button>
      </CardContent>
    </Card>
  )
}

export default PublishedCard
