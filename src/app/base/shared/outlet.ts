import {RDMS} from '../../registrations/shared/RDMS';
import {TypePPR} from '../../registrations/shared/type-ppr.enum';

export class Outlet extends RDMS {
  id: number;
  region: string;
  oblast: string;
  raion: string;
  misto: string;
  population: number;
  categoryMisto: string;
  coverage: string;
  descriptionRDMS: string;
  squareRDMS: string;
  faceRDMS: string;
  categoryRDMS: string;
  salesChannel: string;
  counterpart: string;
  nameCompany: string;
  addressCompany: string;
  codePPD: number;
  expert: string;
  latitude: string;
  longitude: string;
  outlet: string;
  cashRegistersCount: string;
  PPR: string;
  typePPR: TypePPR;
}
