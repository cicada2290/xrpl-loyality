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
} from '@transia/xrpl'
import { Client, Wallet, AccountSetAsfFlags } from '@transia/xrpl'
import { ALICE_WALLET_SECRET, BOB_WALLET_SECRET, CAROL_WALLET_SECRET, COMPANY_WALLET_SECRET } from '@/constants'

export class XrplClient {
  private client: Client

  constructor(url: string) {
    this.client = new Client(url)
  }

  wallet(name: EmployeeName | 'Company') {
    switch (name) {
      case 'Alice':
        return Wallet.fromSeed(ALICE_WALLET_SECRET)
      case 'Bob':
        return Wallet.fromSeed(BOB_WALLET_SECRET)
      case 'Carol':
        return Wallet.fromSeed(CAROL_WALLET_SECRET)
      case 'Company':
        return Wallet.fromSeed(COMPANY_WALLET_SECRET)
    }
  }

  async requestAccountObjects(request: AccountObjectsRequest) {
    return this.#request(request)
  }

  async submitURITokenMint(tx: URITokenMint, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async submitURITokenBuy(tx: URITokenBuy, executeWallet: Wallet) {
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

  async #request(request: AccountObjectsRequest | AccountLinesRequest) {
    await this.client.connect()

    try {
      return await this.client.request(request)
    } catch (error) {
      console.error('XrplClient: request: ', error)
      throw error
    } finally {
      await this.client.disconnect()
    }
  }

  async #submit(tx: URITokenMint | URITokenBuy | AccountSet | Payment, executeWallet: Wallet) {
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
