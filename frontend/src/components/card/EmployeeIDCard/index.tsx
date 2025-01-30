'use client'

import Image from 'next/image'

interface EmployeeIDCardProps {
  image: string
}

const EmployeeIDCard = ({ image }: EmployeeIDCardProps) => {
  return <Image src={image} alt="ID Card" width={380} height={220} />
}

export default EmployeeIDCard
