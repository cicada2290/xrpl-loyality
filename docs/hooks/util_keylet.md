# util_keylet

指定された種類のシリアライズされたkeyletを計算するための関数です。

## Behaviour

- keylet_typeに基づいて、必要なパラメータを読み取る
- 指定されたkeyletを計算
- write_ptrに34バイトのkeyletを書き込む

## Definition

```c
int64_t util_keylet (
    uint32_t write_ptr,
    uint32_t write_len,
    uint32_t keylet_type,
    uint32_t a, uint32_t b,
    uint32_t c, uint32_t d,
    uint32_t e, uint32_t f
);
```

## Example

```c
// アカウントkeyletの生成例
uint8_t keylet_out[34];
uint8_t account_id[20] = { ... };
int64_t ret = util_keylet(keylet_out, 34,
                         KEYLET_ACCOUNT,
                         account_id, 20,
                         0, 0, 0, 0);
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| write_ptr | uint32_t | 出力keyletを格納するバッファへのポインタ。34バイトが必要。 |
| write_len | uint32_t | 出力バッファの長さ。 |
| keylet_type | uint32_t | 生成するkeyletの種類。以下の表を参照。 |
| a | uint32_t | keylet_typeに応じたパラメータ。 |
| b | uint32_t | keylet_typeに応じたパラメータ。 |
| c | uint32_t | keylet_typeに応じたパラメータ。 |
| d | uint32_t | keylet_typeに応じたパラメータ。 |
| e | uint32_t | keylet_typeに応じたパラメータ。 |
| f | uint32_t | keylet_typeに応じたパラメータ。 |

### Keylet Types

| Type | Parameters |
|------|------------|
| KEYLET_HOOK | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c, d, e, f: すべて0 |
| KEYLET_ACCOUNT | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c, d, e, f: すべて0 |
| KEYLET_SIGNERS | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c, d, e, f: すべて0 |
| KEYLET_OWNER_DIR | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c, d, e, f: すべて0 |
| KEYLET_EMITTED_TXN | a: キーへのポインタ<br>b: キーの長さ（32バイト）<br>c, d, e, f: すべて0 |
| KEYLET_CHILD | a: キーへのポインタ<br>b: キーの長さ（32バイト）<br>c, d, e, f: すべて0 |
| KEYLET_UNCHECKED | a: キーへのポインタ<br>b: キーの長さ（32バイト）<br>c, d, e, f: すべて0 |
| KEYLET_PAGE | a: キーへのポインタ<br>b: キーの長さ（32バイト）<br>c: uint64の上位32ビット<br>d: uint64の下位32ビット<br>e, f: すべて0 |
| KEYLET_DEPOSIT_PREAUTH | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c: アカウントIDへのポインタ<br>d: cの長さ（20バイト）<br>e, f: すべて0 |
| KEYLET_NFT_OFFER | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c: シーケンス番号（32ビット整数）またはキーへのポインタ<br>d: 0またはキーの長さ（32バイト）<br>e, f: すべて0 |
| KEYLET_PAYCHAN | a: アカウントIDへのポインタ<br>b: aの長さ（20バイト）<br>c: アカウントIDへのポインタ<br>d: cの長さ（20バイト）<br>e: 32ビット整数またはキーへのポインタ<br>f: 0またはキーの長さ（32バイト） |

## Return Code

| Type | Description |
|------|-------------|
| int64_t | 書き込まれたバイト数（常に34）。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| OUT_OF_BOUNDS | ポインタ/長さがフックメモリの範囲外を指定している。 |
| TOO_SMALL | write_lenが34バイト未満。 |
| INVALID_ARGUMENT | 無効なkeylet_typeまたはパラメータが指定された。 |
