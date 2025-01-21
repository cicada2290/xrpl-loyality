import type { URITokenMint, Wallet } from '@transia/xrpl'
import { Client } from '@transia/xrpl'

export class XrplClient {
  private client: Client

  constructor(url: string) {
    this.client = new Client(url)
  }

  submitURITokenMint(tx: URITokenMint, executeWallet: Wallet) {
    return this.#submit(tx, executeWallet)
  }

  async #submit(tx: URITokenMint, executeWallet: Wallet) {
    await this.client.connect()

    try {
      const opts = {
        wallet: executeWallet,
        autofill: true,
      }

      const response = await this.client.submitAndWait(tx, opts)
      return response
    } catch (error) {
      console.error('XrplClient: submit: ', error)
    } finally {
      await this.client.disconnect()
    }
  }
}
