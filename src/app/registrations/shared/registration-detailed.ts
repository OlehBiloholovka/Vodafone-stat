import {RDMS} from './RDMS';

export class RegistrationDetailed extends RDMS {
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
