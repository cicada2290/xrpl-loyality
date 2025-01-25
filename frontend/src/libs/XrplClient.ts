import type { EmployeeName } from '@/types'
import type {
  AccountObjectsRequest,
  AccountObjectsResponse,
  AccountLinesRequest,
  AccountLinesResponse,
  URITokenMint,
  URITokenBuy,
  AccountSet,
  Payment,
  TrustSet,
} from '@transia/xrpl'
import { Client, Wallet, AccountSetAsfFlags } from '@transia/xrpl'
import {
  ALICE_WALLET_SECRET,
  BOB_WALLET_SECRET,
  CAROL_WALLET_SECRET,
  COMPANY_WALLET_SECRET,
  UTILITY_TOKEN_SECRET,
} from '@/constants'

type BaseRequest = AccountObjectsRequest | AccountLinesRequest
type BaseTx = URITokenMint | URITokenBuy | AccountSet | Payment | TrustSet
type UtilityToken = {
  currency: string
  issuer: string
}

type SubmitTx = {
  tx: BaseTx
  wallet: Wallet
}

export class XrplClient {
  private client: Client

  private utilityToken: UtilityToken

  constructor(url: string) {
    this.client = new Client(url)

    this.utilityToken = {
      currency: 'XXX',
      issuer: this.wallet('UtilityToken').address,
    }
  }

  getUtilityToken(): UtilityToken {
    return this.utilityToken
  }

  getWallet() {
    return {
      alice: Wallet.fromSeed(ALICE_WALLET_SECRET),
      bob: Wallet.fromSeed(BOB_WALLET_SECRET),
      carol: Wallet.fromSeed(CAROL_WALLET_SECRET),
      company: Wallet.fromSeed(COMPANY_WALLET_SECRET),
      utilityToken: Wallet.fromSeed(UTILITY_TOKEN_SECRET),
    }
  }

  wallet(name: EmployeeName | 'Company' | 'UtilityToken') {
    switch (name) {
      case 'Alice':
        return Wallet.fromSeed(ALICE_WALLET_SECRET)
      case 'Bob':
        return Wallet.fromSeed(BOB_WALLET_SECRET)
      case 'Carol':
        return Wallet.fromSeed(CAROL_WALLET_SECRET)
      case 'Company':
        return Wallet.fromSeed(COMPANY_WALLET_SECRET)
      case 'UtilityToken':
        return Wallet.fromSeed(UTILITY_TOKEN_SECRET)
    }
  }

  async requestAccountLines(request: AccountLinesRequest): Promise<AccountLinesResponse> {
    await this.connect()
    const response = await this.#request(request)
    await this.disconnect()
    return response as AccountLinesResponse
  }

  async requestAccountObjects(request: AccountObjectsRequest): Promise<AccountObjectsResponse> {
    await this.connect()
    const response = await this.#request(request)
    await this.disconnect()
    return response as AccountObjectsResponse
  }

  async submitURITokenMint(tx: URITokenMint, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitURITokenBuy(tx: URITokenBuy, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitAccountSet(tx: AccountSet, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitTrustSet(tx: TrustSet, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitPayment(tx: Payment, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitMintToken() {
    try {
      await this.client.connect()

      console.log('submitMintToken: ', this.wallet('Company').address)

      const accoutnsetResponse = await this.client.submitAndWait(
        {
          TransactionType: 'AccountSet',
          Account: this.wallet('Company').address,
          SetFlag: AccountSetAsfFlags.asfDefaultRipple,
          NetworkID: await this.client.getNetworkID(),
        },
        { wallet: this.wallet('Company') },
      )

      console.info('accoutnsetResponse: ', accoutnsetResponse)

      const trustSetResponse = await this.client.submitAndWait(
        {
          TransactionType: 'TrustSet',
          Account: this.wallet('Company').address,
          LimitAmount: {
            issuer: this.wallet('Company').address,
            currency: 'LOY',
            value: '100000',
          },
          NetworkID: await this.client.getNetworkID(),
        },
        { wallet: this.wallet('Company') },
      )

      console.info('trustSetResponse: ', trustSetResponse)

      await this.client.disconnect()
    } catch (error) {
      console.error('XrplClient: submitMintToken: ', error)
      throw error
    }
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }

  async singleRequest(
    request: AccountObjectsRequest | AccountLinesRequest,
  ): Promise<AccountObjectsResponse | AccountLinesResponse> {
    return await this.client.request(request)
  }

  async multiRequest(requests: BaseRequest[]) {
    try {
      await this.connect()
      return await Promise.all(requests.map((request) => this.#request(request)))
    } catch (error) {
      console.error('XrplClient: multiRequest: ', error)
      throw error
    } finally {
      await this.disconnect()
    }
  }

  async multiSubmit(params: SubmitTx[]) {
    try {
      await this.client.connect()

      const responses = await Promise.all(
        params.map(async ({ tx, wallet }) => {
          tx.NetworkID = await this.client.getNetworkID()
          return this.client.submitAndWait(tx, { wallet })
        }),
      )

      console.info('multiSubmit responses: ', responses)
      return responses
    } catch (error) {
      console.error('XrplClient: multiSubmit: ', error)
      throw error
    } finally {
      await this.client.disconnect()
    }
  }

  // ==============================
  // private methods
  // ==============================

  async #request(request: AccountObjectsRequest | AccountLinesRequest) {
    try {
      return await this.client.request(request)
    } catch (error) {
      console.error('XrplClient: request: ', error)
      throw error
    }
  }

  async #submit(tx: URITokenMint | URITokenBuy | AccountSet | Payment | TrustSet, executeWallet: Wallet) {
    await this.client.connect()

    try {
      const opts = {
        wallet: executeWallet,
        autofill: true,
      }

      tx.NetworkID = await this.client.getNetworkID()

      console.info('submit tx: ', tx)

      const response = await this.client.submitAndWait(tx, opts)
      return response
    } catch (error) {
      console.error('XrplClient: submit: ', error)
      throw error
    } finally {
      await this.client.disconnect()
    }
  }
}
