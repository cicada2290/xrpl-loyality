# util_accid

rアドレス（例: rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh）を20バイトのアカウントIDに変換するための関数です。

## Behaviour

- read_ptrからrアドレスを読み取る
- write_ptrに20バイトのアカウントIDを書き込む

## Definition

```c
int64_t util_accid (
    uint32_t write_ptr,
    uint32_t write_len,
    uint32_t read_ptr,
    uint32_t read_len
);
```

## Example

```c
uint8_t accid_out[20];
uint8_t raddr_in[] = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh";

int64_t bytes_written =
    util_accid(accid_out, 20, raddr_in, sizeof(raddr_in)-1);
// NB: if specified as a c-string as above, account for the nul char
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| write_ptr | uint32_t | 出力アカウントIDを格納するのに適切なサイズのバッファへのポインタ。少なくとも20バイトが必要。 |
| write_len | uint32_t | 出力バッファの長さ。 |
| read_ptr | uint32_t | rアドレスへのポインタ。 |
| read_len | uint32_t | rアドレスの長さ。 |

## Return Code

| Type | Description |
|------|-------------|
| int64_t | 書き込まれたバイト数（出力rアドレスの長さ）。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| OUT_OF_BOUNDS | ポインタ/長さがフックメモリの範囲外を指定している。 |
| INVALID_ARGUMENT | read_ptrが有効なrアドレスを指していない。 |
| TOO_SMALL | write_lenが生成されるアカウントIDを格納するのに十分な大きさではない（20バイトが必要）。 |
| TOO_BIG | read_lenがrアドレスの最大長を超えている。 |
