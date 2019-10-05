import {RegistrationRdms} from './registration-rdms';

export class RegistrationMsisdn extends RegistrationRdms {
  nameSeller: string;
  codeMSISDN: number;

  constructor() {
    super();
    this.plan = 3;
  }
}
