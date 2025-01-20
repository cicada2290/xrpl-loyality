# etxn_details

発行予定のトランザクション用のsfEmitDetailsを生成するための関数です。

## Behaviour

- cbakが定義されていない場合、105バイトのsfEmitDetailsオブジェクトを生成してwrite_ptrに書き込む
- cbakが定義されている場合、127バイトのsfEmitDetailsオブジェクトを生成してwrite_ptrに書き込む

## Definition

```c
int64_t etxn_details (
    uint32_t write_ptr,
    uint32_t write_len
);
```

## Example

```c
uint8_t emitdet[105];
int64_t result = etxn_details(emitdet, 105);
if (result != 105)
    rollback("Etxndetails failed.", 19, 1);
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| write_ptr | uint32_t | sfEmitDetailsレコードを受け取るバッファへのポインタ。 |
| write_len | uint32_t | バッファの長さ。 |

## Return Code

| Type | Description |
|------|-------------|
| int64_t | 書き込まれたバイト数。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| OUT_OF_BOUNDS | ポインタ/長さがフックメモリの範囲外を指定している。 |
| TOO_SMALL | バッファがレコードを受け取るのに十分な大きさではない。 |
| PREREQUISITE_NOT_MET | フックが事前にetxn_reserve(n)を呼び出していない。 |
| FEE_TOO_LARGE | ネットワークが許可する範囲を超える負荷となる。 |
| INTERNAL_ERROR | rippledが必要なフィールドの生成に問題が発生した。 |
