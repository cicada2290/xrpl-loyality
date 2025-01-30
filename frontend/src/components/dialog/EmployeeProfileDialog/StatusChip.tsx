'use client'

import Chip from '@mui/material/Chip'

interface StatusChipProps {
  status: string
}

const StatusChip = ({ status }: StatusChipProps) => {
  return <Chip variant="outlined" label={status} size="small" color="warning" />
}

export default StatusChip
