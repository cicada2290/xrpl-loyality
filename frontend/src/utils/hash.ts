import * as crypto from 'crypto';

export const generate256BitHash = (input: string): string => {
  const hash = crypto.createHash('sha256')
  return hash.update(input).digest('hex').toUpperCase()
}
