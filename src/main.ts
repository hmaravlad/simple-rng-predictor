import { parse } from 'ts-command-line-args';
import { IArgs, argsConfig } from './types/command-line-args';


(async () => {
  const args = parse<IArgs>(argsConfig);
  console.dir({ args });
})();
