sto_subarray
Index into a xrpld serialized array and return the location and length of an index

Concepts
Serialized Objects
Behaviour
Parse a STArray pointed to by read_ptr
Find the array index specified by array_id
Return the byte offset and length of the serialized field within the STObject, if it is found
🚧
Field ID encoding

The sto_ apis accept a field_id parameter encoded as follows: (type << 16U) + field
Thus type 1 field 2 would be 0x10002U.

In the case of this array field ID is array_id.

Definition
C

int64_t sto_subfield (
    uint32_t read_ptr,
  	uint32_t read_len,
  	uint32_t array_id
);
Example
C

#define SUB_OFFSET(x) ((int32_t)(x >> 32))
#define SUB_LENGTH(x) ((int32_t)(x & 0xFFFFFFFFULL))

  int64_t memo_lookup =
    sto_subarray(memos, memos_len, 0);

if (memo_lookup < 0)
{
    // sfMemo was not found in the STObject pointed at by memo_ptr
}
else
{
    // 0th index of the STArray was found and its location is as follows:
    uint8_t*  memo_ptr = SUB_OFFSET(memo_lookup) + memos;
    uint32_t  memo_len = SUB_LENGTH(memo_lookup);
}
📘
hookmacro.h already contains the SUB_OFFSET and SUB_LENGTH macros.

Parameters
Name	Type	Description
read_ptr	uint32_t	Pointer to the buffer containing the STArray
read_len	uint32_t	Length of STArray
array_id	uint32_t	The index of the entry within the STArray you are seeking. Starts from 0.
Return Code
Type	Description
int64_t	The location of the field within the specified buffer:
- The high 32 bits are the offset location.
- The low 32 bits are the length.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL
- Input buffer isn't large enough to possibly contain a valid STArray.

DOESNT_EXIST
- The searched for index isn't present in the supplied STArray.

PARSE_ERROR
- The supplied STArray is malformed or not an STArray.
