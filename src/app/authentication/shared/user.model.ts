export interface User {
  uid: string;
  phoneNumber: string;
  phone?: number;
  email?: string;
  photoUrl?: string;
  displayName?: string;
  role?: Role;
}

export enum Role {
  admin = 'admin',
  ppd = 'ppd',
  supervisor = 'supervisor',
  epd = 'epd',
  chief = 'chief'
}
