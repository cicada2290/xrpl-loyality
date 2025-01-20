export const APP_NAME = process.env.APP_NAME
export const NFTOKEN_TAXON = Number(process.env.NFTOKEN_TAXON  || 1)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const XAHAU_WSS_URL = process.env.XAHAU_WSS_URL || 'wss://hooks-testnet-v3.xrpl-labs.com'
export const COMPANY_WALLET_SECRET = process.env.NEXT_PUBLIC_COMPANY_WALLET_SECRET || ''