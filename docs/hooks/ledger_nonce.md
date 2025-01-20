ledger_nonce
Generate a 32 byte nonce for use in an emitted transaction

Behaviour
Write a 32 byte random value to the write_ptr
Definition
C

int64_t ledger_nonce (
    uint32_t write_ptr,
    uint32_t write_len
);
Example
C

uint8_t n[32];
int64_t bytes_written = 
    ledger_nonce(n, 32);
Parameters
Name	Type	Description
write_ptr	uint32_t	Pointer to a buffer of a suitable size to store the output. Should be at least 32 bytes.
write_len	uint32_t	Length of the output buffer.
Return Code
Type	Description
int64_t	The number of bytes written

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.
