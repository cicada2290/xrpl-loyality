import { NextResponse } from 'next/server'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return NextResponse.json({
    name: 'Employee ID Card',
    description: 'Employee ID Card',
    image: 'https://arweave.net/Drv0VlbkmfU9A3YTLSQ5t7S2HlFJKEpSkx9AvhGmgFI',
  })
}
