export interface Predictor {
  init(): Promise<void>;
  predict(): number;
}