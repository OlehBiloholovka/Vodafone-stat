import {RegistrationRDMS} from './registration-rdms';

export class RegistrationMSISDN extends RegistrationRDMS {
  nameSeller: string;
  codeMSISDN: number;

  constructor() {
    super();
    this.plan = 3;
  }
}
