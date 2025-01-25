'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

const TopbarLinkButton = ({ href, label }: { href: string; label: string }) => {
  const router = useRouter()
  return (
    <Button color="inherit" onClick={() => router.push(href)}>
      {label}
    </Button>
  )
}

export default TopbarLinkButton
