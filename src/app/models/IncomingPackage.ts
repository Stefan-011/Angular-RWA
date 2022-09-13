import { user } from './user';

export interface IncomingPackage {
  user_data: user;
  access_token: string;
}
