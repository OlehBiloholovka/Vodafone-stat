import {RDMS} from './RDMS';

export class Partner extends RDMS {
  codeMSISDN: number;
  nameSeller: string;
  category: string;
  status: string;
  headMSISDN: number;
  codePPD: string;
}
