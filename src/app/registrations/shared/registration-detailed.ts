import {Registration} from './registration';

export class RegistrationDetailed extends Registration {
  $key: number;
  activationDate: string;
  category: string;
  nameSeller: string;
  headMSISDN: number;
  rechargeDate: string;
  refill: number;
  registeredMSISDN: number;
  registrationDate: string;
  rejectReason: string;
  tariffId: string;
  codeMSISDN: number;
  checkDud: string;
}
