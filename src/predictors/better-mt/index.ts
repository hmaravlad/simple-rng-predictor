// import mt19937 from '@stdlib/random-base-mt19937';
import { Casino } from '../../casino';
import { Predictor } from '../../types/predictor';
import mt19937 from '@stdlib/random-base-mt19937';
import { untemper } from './untemper.js';


export class BetterMtPredictor implements Predictor {
  private prFn: () => number = () => 0;

  constructor(private casino: Casino) { }

  async init(): Promise<void> {
    const numbers = [];
    for (let i = 0; i < 624; i++) {
      const { realNumber } = await this.casino.makeBet(0, 1);
      numbers.push(realNumber);
    }

    const state = [];
    for (let i = 0; i < numbers.length; i++) {
      state.push(untemper(numbers[i]));
    }
    state.unshift(1, 3, 624);
    state.push(1, 624, 1, 266);

    const mt = mt19937.factory({ state: new Uint32Array(state) });

    this.prFn = () => mt();
  }

  predict(): number {
    return this.prFn();
  }
}