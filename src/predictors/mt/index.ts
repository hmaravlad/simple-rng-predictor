import mt19937 from '@stdlib/random-base-mt19937';
import { Casino } from 'src/casino';
import { Predictor } from 'src/types/predictor';

export class MtPredictor implements Predictor {
  private prFn: () => number = () => 0;

  constructor(private casino: Casino) { }

  async init(): Promise<void> {
    let time = (+(new Date(new Date().toUTCString()))) / 1000 - 5;
    let mt = mt19937.factory({ seed: time });
    const { realNumber } = await this.casino.makeBet(0, 1);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const num = mt();
      if (realNumber === num) break;
      time += 1;
      mt = mt19937.factory({ seed: time });
    }

    this.prFn = () => mt();
  }

  predict(): number {
    return this.prFn();
  }
}