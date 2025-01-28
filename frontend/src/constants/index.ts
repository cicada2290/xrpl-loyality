export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME

export const XAHAU_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_XAHAU_RPC_ENDPOINT || 'https://xahau-test.net'
export const XAHAU_WSS_ENDPOINT =
  process.env.NEXT_PUBLIC_XAHAU_WSS_ENDPOINT || 'wss://xahau-test.net'

export const NFTOKEN_TAXON_ID = process.env.NEXT_PUBLIC_NFTOKEN_TAXON_ID

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const WALLET_SEEDS = {
  ALICE: 'snixUxC9hGc6hsKLhSdmPmrzQMoJf',
  BOB: 'snHAKeDNCSz8B7UtHY28Jp6cSKEYD',
  CAROL: 'shaLKoutS4EFG8XrCB4TMT5FRHfDv',
  DAVE: 'ssCLqn6cPwRySuBUutbtubFhrCaaz',
  EVE: 'shKyb8VikJHjF8jEcE6erBHQPZL2E',
  COMPANY: 'ssmj2XB7jqyowF8MJX8GqphZk97js',
  UTILITY_TOKEN: 'spqCcVP9BYv28aJEukzypbQuK4WDB'
}

export const COMPANY_XAHAU_CONFIG_URL =
  'https://xxxx.com/.well-known/xah-ledger.toml'

export const AUTO_HIDE_DURATION = 3000
