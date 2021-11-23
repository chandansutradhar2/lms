export interface User {
  uid?: string;
  firstName: string;
  lastName: string;
  dob: number;
  role: USER_ROLE;
  mobileNo: string;
  email: string;
}

export enum USER_ROLE {
  'admin' = 'admin',
  'student' = 'student',
}
