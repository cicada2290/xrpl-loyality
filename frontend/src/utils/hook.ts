/*
const tts = {
  ttPAYMENT: 0,
  ttESCROW_CREATE: 1,
  ttESCROW_FINISH: 2,
  ttACCOUNT_SET: 3,
  ttESCROW_CANCEL: 4,
  ttREGULAR_KEY_SET: 5,
  ttOFFER_CREATE: 7,
  ttOFFER_CANCEL: 8,
  ttTICKET_CREATE: 10,
  ttSIGNER_LIST_SET: 12,
  ttPAYCHAN_CREATE: 13,
  ttPAYCHAN_FUND: 14,
  ttPAYCHAN_CLAIM: 15,
  ttCHECK_CREATE: 16,
  ttCHECK_CASH: 17,
  ttCHECK_CANCEL: 18,
  ttDEPOSIT_PREAUTH: 19,
  ttTRUST_SET: 20,
  ttACCOUNT_DELETE: 21,
  ttHOOK_SET: 22,
  ttURITOKEN_MINT: 45,
  ttURITOKEN_BURN: 46,
  ttURITOKEN_BUY: 47,
  ttURITOKEN_CREATE_SELL_OFFER: 48,
  ttURITOKEN_CANCEL_SELL_OFFER: 49,
  ttINVOKE: 99
}
*/

export function xor(n: bigint) {
  let v = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffffn;
  v ^= (1n << n);

  let s = v.toString(16).padStart(64, '0');
  s = `0x${s}`;

  console.log("s: ", s);
  console.log("s: ", s.toLocaleUpperCase())
}