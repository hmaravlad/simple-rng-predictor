import { ArgumentConfig } from 'ts-command-line-args';

export interface IArgs {
  mode: string,
}

export const argsConfig: ArgumentConfig<IArgs> = {
  mode: String,
};