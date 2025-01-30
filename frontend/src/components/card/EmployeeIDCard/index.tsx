'use client'

import Image from 'next/image'

interface EmployeeIDCardProps {
  imageURL: string
}

const EmployeeIDCard = ({ imageURL }: EmployeeIDCardProps) => {
  return <Image src={imageURL} alt="ID Card" width={380} height={220} />
}

export default EmployeeIDCard
