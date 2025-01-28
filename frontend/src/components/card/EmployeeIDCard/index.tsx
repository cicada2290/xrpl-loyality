'use client'

import ObtainedCard from './ObtainedCard'
import PublishedCard from './PublishedCard'
import UnpublishedCard from './UnpublishedCard'

interface EmployeeIDCardProps {
  isMinted: boolean
  isReceived: boolean
}

export default function EmployeeIDCard({
  isMinted,
  isReceived
}: EmployeeIDCardProps) {
  if (isReceived) {
    return <ObtainedCard />
  }

  if (isMinted) {
    return <PublishedCard />
  }

  return <UnpublishedCard />
}
