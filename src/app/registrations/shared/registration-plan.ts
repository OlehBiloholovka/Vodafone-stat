import {RegistrationMsisdn} from './registration-msisdn';

export class RegistrationPlan extends RegistrationMsisdn {
  plan = 0;
  prize: string;
  isCompleted = false;
  mayBeCompleted = false;
}
