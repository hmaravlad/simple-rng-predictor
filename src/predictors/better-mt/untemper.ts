const params = {
  w: 32,
  n: 624,
  m: 397,
  r: 31,
  a: 0x9908b0df,
  u: 11,
  s: 7,
  t: 15,
  l: 18,
  b: 0x9d2c5680,
  c: 0xefc60000,
};

function undoXorRShift(x: number, shift: number): number {
  let i = 0;
  let result = 0;
  while (i * shift < params.w) {
    const partMask = (-1 << (32 - shift)) >>> (shift * i);
    const part = x & partMask;
    x ^= part >>> shift;
    result |= part;
    i++;
  }
  return result;
}

function undoXorLShiftMask(x: number, shift: number, mask: number): number {
  let i = 0;
  let result = 0;
  while (i * shift < params.w) {
    const partMask = (-1 >>> (32 - shift)) << (shift * i);
    const part = x & partMask;
    x ^= (part << shift) & mask;
    result |= part;
    i++;
  }
  return result;
}

export function untemper(x: number): number {
  x = undoXorRShift(x, params.l);
  x = undoXorLShiftMask(x, params.t, params.c);
  x = undoXorLShiftMask(x, params.s, params.b);
  x = undoXorRShift(x, params.u);
  return x;
}
