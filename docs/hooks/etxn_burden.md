# etxn_burden

発行予定のトランザクションの負荷（burden）を取得するための関数です。

## Behaviour

- 発行予定のトランザクションの負荷を計算
- 計算された負荷値を返却

## Definition

```c
int64_t etxn_burden (
    void
);
```

## Example

```c
int64_t burden = etxn_burden();
if (burden < 0)
    rollback("Failed to get burden", 20, 1);
```

## Parameters

パラメータはありません。

## Return Code

| Type | Description |
|------|-------------|
| int64_t | emit()に渡すために必要なトランザクションの負荷値。 |

エラー発生時は負の値が返され、以下のようになります:

| Error | Description |
|-------|-------------|
| PREREQUISITE_NOT_MET | etxn_reserveが事前に呼び出されていない。 |
