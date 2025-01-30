import type {
  AccountLinesRequest,
  AccountLinesResponse,
  AccountObjectsRequest,
  AccountObjectsResponse,
  AccountInfoRequest,
  AccountInfoResponse,
  AccountSet,
  Payment,
  TrustSet,
  URITokenBuy,
  URITokenMint,
  URITokenBurn
} from '@transia/xrpl'
import type { EmployeeName } from '@/types'
import { XAHAU_WSS_ENDPOINT } from '@/constants'
import { AccountSetAsfFlags, Client, Wallet } from '@transia/xrpl'
import { getWallet } from '@/utils/wallet'

type RequestCommandParams =
  | AccountObjectsRequest
  | AccountLinesRequest
  | AccountInfoRequest

type SubmitTransactionParams = {
  tx: URITokenMint | URITokenBuy | AccountSet | Payment | TrustSet
  wallet: Wallet
}

const UTILITY_TOKEN_CURRENCY = 'LOY'

export class XrplClient {
  private client: Client

  constructor(url?: string) {
    this.client = new Client(url || XAHAU_WSS_ENDPOINT)
  }

  employeeWallets(accountName: string) {
    return getWallet(accountName)
  }

  companyWallets(accountName: 'Company' | 'UtilityToken') {
    return getWallet(accountName)
  }

  wallet(accountName: EmployeeName | 'Company' | 'UtilityToken'): Wallet {
    return getWallet(accountName)
  }

  utilityToken() {
    return {
      issuer: this.wallet('UtilityToken').address,
      currency: UTILITY_TOKEN_CURRENCY
    }
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }

  /**
   * request account lines
   * @param request - AccountLinesRequest
   * @returns AccountLinesResponse
   */
  async requestAccountLines(
    request: AccountLinesRequest
  ): Promise<AccountLinesResponse> {
    return await this.#withConnection(async () => {
      const response = await this.#request(request)
      return response as AccountLinesResponse
    })
  }

  /**
   * request account objects
   * @param request - AccountObjectsRequest
   * @returns AccountObjectsResponse
   */
  async requestAccountObjects(
    request: AccountObjectsRequest
  ): Promise<AccountObjectsResponse> {
    return await this.#withConnection(async () => {
      const response = await this.#request(request)
      return response as AccountObjectsResponse
    })
  }

  /**
   * request account root
   * @param account - string
   * @returns AccountInfoResponse
   */
  async requestAccountRoot(account: string): Promise<AccountInfoResponse> {
    return await this.#withConnection(async () => {
      const response = await this.#request({
        command: 'account_info',
        account,
        ledger_index: 'validated'
      })
      return response as AccountInfoResponse
    })
  }

  async submitURITokenMint(tx: URITokenMint, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitURITokenBuy(tx: URITokenBuy, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitURITokenBurn(tx: URITokenBurn, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitAccountSet(tx: AccountSet, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitTrustSet(tx: TrustSet, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
  }

  async submitPayment(tx: Payment, executeWallet: Wallet) {
    return await this.#withConnection(async () => {
      return await this.#submit(tx, executeWallet)
    })
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
          NetworkID: await this.client.getNetworkID()
        },
        { wallet: this.wallet('Company') }
      )

      console.info('accoutnsetResponse: ', accoutnsetResponse)

      const trustSetResponse = await this.client.submitAndWait(
        {
          TransactionType: 'TrustSet',
          Account: this.wallet('Company').address,
          LimitAmount: {
            issuer: this.wallet('Company').address,
            currency: 'LOY',
            value: '100000'
          },
          NetworkID: await this.client.getNetworkID()
        },
        { wallet: this.wallet('Company') }
      )

      console.info('trustSetResponse: ', trustSetResponse)

      await this.client.disconnect()
    } catch (error) {
      console.error('XrplClient: submitMintToken: ', error)
      throw error
    }
  }

  async multiRequest(requests: RequestCommandParams[]) {
    try {
      return await this.#withConnection(async () => {
        return await Promise.all(
          requests.map((request) => this.#request(request))
        )
      })
    } catch (error) {
      console.error('XrplClient: multiRequest: ', error)
      throw error
    }
  }

  async multiSubmit(params: SubmitTransactionParams[]) {
    try {
      return await this.#withConnection(async () => {
        return await Promise.all(
          params.map(async ({ tx, wallet }) => {
            tx.NetworkID = await this.client.getNetworkID()
            return await this.#submit(tx, wallet)
          })
        )
      })
    } catch (error) {
      console.error('XrplClient: multiSubmit: ', error)
      throw error
    }
  }

  // ==============================
  // private methods
  // ==============================

  async #withConnection(operation: () => Promise<any>) {
    try {
      await this.client.connect()
      return await operation()
    } catch (error) {
      throw error
    } finally {
      await this.client.disconnect()
    }
  }

  async #request(
    request: AccountObjectsRequest | AccountLinesRequest | AccountInfoRequest
  ) {
    try {
      return await this.client.request(request)
    } catch (error) {
      console.error('XrplClient: request: ', error)
      throw error
    }
  }

  async #submit(
    tx:
      | URITokenMint
      | URITokenBuy
      | URITokenBurn
      | AccountSet
      | Payment
      | TrustSet,
    executeWallet: Wallet
  ) {
    try {
      tx.NetworkID = await this.client.getNetworkID()

      return await this.client.submitAndWait(tx, {
        wallet: executeWallet,
        autofill: true
      })
    } catch (error) {
      console.error('XrplClient: submit: ', error)
      throw error
    }
  }
}
