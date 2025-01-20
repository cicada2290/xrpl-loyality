# hook_account

フックが実行されているアカウントのアカウントIDを取得するための関数です。

## Behaviour

- フックが実行されているアカウントのアカウントIDを取得
- write_ptrに20バイトのアカウントIDを書き込む

## Definition

```c
int64_t hook_account (
    uint32_t write_ptr,
    uint32_t write_len
);
```

## Example

```c
uint8_t hook_acc_id[20];
int64_t bytes_written = hook_account(hook_acc_id, 20);
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| write_ptr | uint32_t | アカウントIDを格納するバッファへのポインタ。20バイトが必要。 |
| write_len | uint32_t | バッファの長さ。 |

## Return Code

| Type | Description |
|------|-------------|
| int64_t | 書き込まれたバイト数（常に20）。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| OUT_OF_BOUNDS | ポインタ/長さがフックメモリの範囲外を指定している。 |
| TOO_SMALL | write_lenが20バイト未満。 |