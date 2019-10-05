import {RegistrationMsisdn} from './registration-msisdn';

export class RegistrationPlan extends RegistrationMsisdn {
  prize: string;

  constructor() {
    super();
    this.plan = 0;
  }
}
