import { Casino } from 'src/casino';
import { Predictor } from 'src/types/predictor';
import { LcgPredictor } from './lcg/index.js';

export class PredictorFactory {
  private predictors: { [key: string]: Predictor };

  constructor(private casino: Casino) {
    this.predictors = {
      'Lcg': new LcgPredictor(casino),
    };
  }


  getPredictor(type: string): Predictor {
    if (!this.predictors[type]) {
      throw new Error(`no predictor of type ${type}`);
    }
    return this.predictors[type];
  }
}