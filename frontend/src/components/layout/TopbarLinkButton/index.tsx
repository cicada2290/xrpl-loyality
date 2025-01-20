'use client'

import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'

const TopbarLinkButton = ({ href, label }: { href: string; label: string }) => {
  const router = useRouter()
  return (
    <Button color="inherit" onClick={() => router.push(href)}>
      {label}
    </Button>
  )
}

export default TopbarLinkButton
