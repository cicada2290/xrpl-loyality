'use client'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ObtainedCard = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex' }}>
        <Avatar
          variant="square"
          sx={{ mr: 2, bgcolor: 'lightblue', width: 100, height: 100 }}
        >
          N
        </Avatar>
        <Typography variant="h6">Employee ID Card</Typography>
      </CardContent>
    </Card>
  )
}

export default ObtainedCard
