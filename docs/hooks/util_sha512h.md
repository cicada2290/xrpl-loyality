util_sha512h
Compute an sha512-half over some data

Behaviour
Compute an SHA512 hash over the data pointed to by read_ptr
Write the first half of the hash to write_ptr
Definition
C

int64_t util_sha512h (
    uint32_t write_ptr,
    uint32_t write_len,
    uint32_t read_ptr,
    uint32_t read_len
);
Example
C

uint8_t hash_out[32];
if (util_sha512h(hash_out, 32, data_in_ptr, data_in_len) < 0)
	rollback("Could not generate Hash", 23, 1);
Parameters
Name	Type	Description
write_ptr	uint32_t	Pointer to a buffer the hash will be written to
write_len	uint32_t	Length of output buffer, should be at least 32.
read_ptr	uint32_t	Pointer to the buffer data will be read from (to compute the hash over)
read_len	uint32_t	Length of input data
Return Code
Type	Description
int64_t	The number of bytes written, should always be 32.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL
- Output buffer isn't large enough
