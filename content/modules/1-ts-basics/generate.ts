import crypto from 'crypto';

const target = process.argv[2];

function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
}

function addFixed() {}

const map = {
  12: () => {
    const add = (n: number, max: number) => {};
    random(10, 500);
    random(20, 500);
    random(100, 500);
    random(500, 500);
    random(1000, 500);
  },
};

const fn = map[target];
if (!fn) {
  throw new Error(`Invalid target ${target}`);
}

fn();
