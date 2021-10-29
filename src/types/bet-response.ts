import { Account } from './account';

export interface BetResponse {
  message: string;
  account: Account;
  realNumber: number;
}