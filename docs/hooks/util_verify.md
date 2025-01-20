util_verify
Verify a cryptographic signature

Behaviour
Verify a cryptographic signature

If the public key is prefixed with 0xED then use ED25519
Otherwise assume SECP256k1
Definition
C

int64_t util_verify (
    uint32_t dread_ptr,
    uint32_t dread_len,
    uint32_t sread_ptr,
    uint32_t sread_len,
    uint32_t kread_ptr,
    uint32_t kread_len
);
Example
C

if (!util_verify(payload_ptr,    payload_len,
                 signature_ptr,  signature_len,
                 publickey_ptr,  publickey_len))
	rollback("Invalid Signature", 17, 60);
Parameters
Name	Type	Description
dread_ptr	uint32_t	Pointer to the signed data
dread_len	uint32_t	Length of the signed data
sread_ptr	uint32_t	Pointer to the signature
sread_len	uint32_t	Length of the signature
kread_ptr	uint32_t	Pointer to the public key
kread_len	uint32_t	Length of the public key
Return Code
Type	Description
int64_t	0 - validation failed, the signature is invalid.
1 - validation succeeded, the signature is valid.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.
