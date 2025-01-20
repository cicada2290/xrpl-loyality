export const stringToHex = (str: string): string => {
  return Buffer.from(str).toString('hex')
}

export const hexToString = (hex: string): string => {
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16))
  }
  return String.fromCharCode.apply(null, bytes)
}
