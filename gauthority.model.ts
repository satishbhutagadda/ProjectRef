import { ArrayList } from 'ts-collections/index';
import { Role } from './role.model';
export interface GAuthority {
    role:  ArrayList<Role> ;
}