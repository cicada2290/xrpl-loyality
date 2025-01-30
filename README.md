# XRPL LOYALTY

A corporate loyalty system operating on the XRP Ledger 🎯

## Overview

A system that provides incentives through employee URI Token minting and custom token transactions.
Smart contracts are implemented using Hooks on the Xahau Network.

### Key Features ✨

1. **Employee ID Card (URI Token)**
   - Company can mint URI Tokens as employee ID cards
   - Employees can claim their ID cards through the system
   - ID cards are non-transferable
   - Company can burn ID cards when employees leave

2. **Custom Token**
   - Custom tokens issued by the company
   - Distributed as rewards to employees

3. **Incentive System**
   - Employees send custom tokens to the company
   - XRP rewards available when conditions are met

## メモ

- エンタープライズ向けのシステム
- 従業員の管理システム
- 従業員IDをURIトークンとして管理

### 登場人物

- 管理者 => ウォレット
- 従業員 => ウォレット
- システム => ブロックチェーン

### 業務フロー

#### 1. カスタムトークンを受け取る (従業員)

#### 2. IDカード申請 (従業員 => 管理者)

- カスタムトークンを送る (これがIDカード申請のトリガーとなる)

#### 3. IDカード発行 (管理者)

- カスタムトークンを受け取り、IDカードを発行する

#### 4. IDカード請求 (従業員 => 管理者)

#### 5. IDカード返却 (従業員 => 管理者)

