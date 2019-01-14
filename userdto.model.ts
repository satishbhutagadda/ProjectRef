import { ArrayList } from 'ts-collections/index';
import { GAuthority } from './gauthority.model';
export class userDetails
{
    userName: string;
    partyCode: string;
    userType: string;
    email: string;
    authorites: ArrayList<GAuthority>;
    roles: string[];
    branches: string[];
}