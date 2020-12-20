var hash = exports;

hash.utils = require('./utils');
hash.common = require('./common');
hash.sha = require('./sha');
hash.ripemd = require('./ripemd');
hash.hmac = require('./hmac');

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;
