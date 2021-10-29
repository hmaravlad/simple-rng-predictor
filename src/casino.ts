import fetch from 'node-fetch';
import { Account } from './types/account';
import { BetResponse } from './types/bet-response';

export class Casino {
  private baseUrl = 'http://95.217.177.249/casino';

  private playerId: string;

  constructor(private mode: string) {
    this.playerId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
  }

  async createAccount(): Promise<Account> {
    const response = await fetch(`${this.baseUrl}/createacc?id=${this.playerId}`);
    return await response.json() as Account;
  }

  async makeBet(num: number, money: number): Promise<BetResponse> {
    const response = await fetch(`${this.baseUrl}/play${this.mode}?id=${this.playerId}&bet=${money}&number=${num}`);
    return await response.json() as BetResponse;
  }
}