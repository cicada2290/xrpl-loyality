import type { AccountObjectsRequest, URITokenMint } from '@transia/xrpl'
import { Client, Wallet } from '@transia/xrpl'
import { ALICE_WALLET_SECRET, BOB_WALLET_SECRET, CAROL_WALLET_SECRET, COMPANY_WALLET_SECRET } from '@/constants'
import type { EmployeeName } from '@/types'

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

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }

  async singleRequest(request: AccountObjectsRequest) {
    return await this.client.request(request)
  }

  async #request(request: AccountObjectsRequest) {
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

  async #submit(tx: URITokenMint, executeWallet: Wallet) {
    await this.client.connect()

    try {
      const opts = {
        wallet: executeWallet,
        autofill: true,
      }

      tx.NetworkID = await this.client.getNetworkID()

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
