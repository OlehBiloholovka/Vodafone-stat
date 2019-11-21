import {RegistrationMSISDN} from './registration-msisdn';

export class RegistrationPlan extends RegistrationMSISDN {
  prize: string;

  constructor() {
    super();
    this.plan = 0;
  }
}
