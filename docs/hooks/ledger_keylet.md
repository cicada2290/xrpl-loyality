ledger_keylet
Search for a keylet within a specified range on the current ledger

Behaviour
Read a 34 byte Keylet from the lread_ptr
Read a 32 byte Keylet from the hread_ptr
Search the ledger for the first (lowest) Keylet of this type in this range.
If any matching Keylet is found, write it to write_ptr.
Definition
C

int64_t ledger_keylet (
    uint32_t write_ptr,
    uint32_t write_len,
    uint32_t lread_ptr,
    uint32_t lread_len,
    uint32_t hread_ptr,
    uint32_t hread_len
);
Example
C

//TODO
Parameters
Name	Type	Description
write_ptr	uint32_t	Pointer to a buffer to store the output serialised Keylet. .
write_len	uint32_t	Length of the output buffer. Must be 34 bytes
lread_ptr	uint32_t	Pointer to the 34 byte serialised Keylet that represents the lower boundary of the Keylet range to search.
lread_len	uint32_t	Always 34 bytes
hread_ptr	uint32_t	Pointer to the 34 byte serialised Keylet that represents the upper boundary of the Keylet range to search.
hread_len	uint32_t	Always 34 bytes
Return Code
Type	Description
int64_t	The number of bytes written (34 bytes) on success.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL / TOO_BIG
- write_len, lread_len or hread_len was not 34 bytes

INVALID_ARGUMENT
- One or more of the provided Keylets was not a valid serialised Keylet

DOES_NOT_MATCH
- The two provided Keylets were not of the same Keylet Type.

DOESNT_EXIST
- No matching Keylet was found in the specified range.
