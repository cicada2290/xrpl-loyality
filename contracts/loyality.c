#include "hookapi.h"

int64_t cbak(uint32_t reserved)
{
    TRACESTR("Carbon: callback called.");

    return 0;
}

int64_t hook(uint32_t reserved ) {

    TRACESTR("loyality.c: Called.");

    // HOOK ON: TT
    int64_t tt = otxn_type();
    TRACEVAR(tt);

    // NFTokenMint Tx
    if (tt == ttNFTOKEN_MINT) {
        TRACESTR("NFTokenMint Tx");
    }

    // Payment Tx
    if (tt == ttPAYMENT) {
        TRACESTR("Payment Tx");
    }

    accept (0,0,0);

    _g(1,1);

    return 0;
}
