import {CurrencyPair} from '../../shared/enum/currency-pair.enum';

export class Pair {
  public static getpairSpec(pair) {
    switch (pair) {
      case CurrencyPair.EUR_USD:
        return 0;
    }
  }
}
