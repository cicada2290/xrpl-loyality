# util_raddr

20バイトのアカウントIDをrアドレス（例: rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh）に変換するための関数です。

## Behaviour

- read_ptrから20バイトのアカウントIDを読み取る
- write_ptrにrアドレスを書き込む

## Definition

```c
int64_t util_raddr (
    uint32_t write_ptr,
    uint32_t write_len,
    uint32_t read_ptr,
    uint32_t read_len
);
```

## Example

```c
uint8_t raddr_out[40];
uint8_t acc_id[20] = {
    0x2dU, 0xd8U, 0xaaU, 0xdbU, 0x4eU, 0x15U,
    0xebU, 0xeaU,  0xeU, 0xfdU, 0x78U, 0xd1U, 0xb0U,
    0x35U, 0x91U,  0x4U, 0x7bU, 0xfaU, 0x1eU,  0xeU
};
int64_t bytes_written =
    util_raddr(raddr_out, sizeof(raddr_out), acc_id, 20);
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| write_ptr | uint32_t | 出力rアドレスを格納するのに適切なサイズのバッファへのポインタ。少なくとも35バイトを推奨。 |
| write_len | uint32_t | 出力バッファの長さ。 |
| read_ptr | uint32_t | アカウントIDへのポインタ。 |
| read_len | uint32_t | 入力の長さ。常に20。 |

## Return Code

| Type | Description |
|------|-------------|
| int64_t | 書き込まれたバイト数（出力rアドレスの長さ）。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| OUT_OF_BOUNDS | ポインタ/長さがフックメモリの範囲外を指定している。 |
| INVALID_ARGUMENT | read_lenが20ではない。 |
