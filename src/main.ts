import { parse } from 'ts-command-line-args';
import { Casino } from './casino.js';
import { PredictorFactory } from './predictors/factory.js';
import { argsConfig, IArgs } from './types/command-line-args.js';
import { Winner } from './winner.js';

(async () => {
  const args = parse<IArgs>(argsConfig);
  const casino = new Casino(args.mode);
  await casino.createAccount();
  const predictorFactory = new PredictorFactory(casino);
  const predictor = predictorFactory.getPredictor(args.mode);
  await predictor.init();
  const winner = new Winner(casino);
  const message = await winner.win(predictor);
  console.log(message);
})();

