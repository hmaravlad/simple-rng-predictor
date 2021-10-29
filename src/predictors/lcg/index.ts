import { Casino } from 'src/casino';
import { Predictor } from 'src/types/predictor';

const hm = Math.pow(2, 31);

const fromUnsigned = (n: number) => {
  return n -= hm;
};

const toUnsigned = (n: number) => {
  return n += hm;
};

export class LcgPredictor implements Predictor {
  private a = 0;

  private c = 0;

  private m = Math.pow(2, 32);

  private hm = Math.pow(2, 31);

  private lastX = 0;

  private normalize = (n: number) => {
    while (n < 0 || n > this.m) {
      if (n < 0) {
        n += this.m;
      } else {
        n -= this.m;
      }
    }
    return n;
  };

  private generate(lastX: number): number {
    const res = (lastX * this.a + this.c) % this.m;
    return res;
  }

  constructor(private casino: Casino) { }

  async init(): Promise<void> {
    const x1 = toUnsigned((await this.casino.makeBet(100, 1)).realNumber);
    const x2 = toUnsigned((await this.casino.makeBet(100, 1)).realNumber);
    const x3 = toUnsigned((await this.casino.makeBet(100, 1)).realNumber);

    let i;

    const possibleIs: number[] = [];

    for (i = -10000000; i < 10000000; i++) {
      const a = (x2 - x3 + i * this.m) / (x1 - x2);
      if (Number.isInteger(a)) {
        possibleIs.push(i);
        this.a = a;
      }
    }

    let possibleCs: number[] = [];
    possibleCs.push(this.normalize(x2 + possibleIs[0] * this.m - this.a * x1));

    possibleCs = possibleCs.filter(c => Number.isInteger(c));

    const numbers: number[] = [];

    for (let j = 0; j < 10; j++) {
      const num = toUnsigned((await this.casino.makeBet(1, 1)).realNumber);
      numbers.push(num);
    }

    let maxI = 0;

    for (const c of possibleCs) {
      let flag = true;
      this.c = c;
      let x = x3;
      for (let j = 0; j < numbers.length; j++) {
        const predictedX = this.generate(x);
        const actualX = numbers[j];
        if (predictedX !== actualX) {
          if (j > maxI) maxI = j;
          flag = false;
          break;
        }
        x = predictedX;
      }
      if (flag) {
        break;
      }
    }

    this.lastX = numbers[numbers.length - 1];
  }

  predict(): number {
    const x = this.generate(this.lastX);
    this.lastX = x;
    return fromUnsigned(x);
  }
}