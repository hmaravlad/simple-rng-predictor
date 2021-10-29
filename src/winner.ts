import { Casino } from './casino';
import { Predictor } from './types/predictor';

const WINNING_MONEY = 1000000;

export class Winner {
  constructor(private casino: Casino) { }

  async win(predictor: Predictor): Promise<string> {
    let message = 'unknown';
    let money = 1;
    while (money < WINNING_MONEY) {
      const num = predictor.predict();
      const response = await this.casino.makeBet(num, money);
      //console.dir({ response });
      money = response.account.money;
      message = response.message;
    }
    return message;
  }
}