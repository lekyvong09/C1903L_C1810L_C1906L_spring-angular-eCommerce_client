import {Role} from './role';
import {Authority} from './authority';

export class User {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    profileImageUrl: string;
    lastLoginDate: Date;
    lastLoginDateDisplay: Date;
    joinDate: Date;
    active: boolean;
    notLocked: boolean;
    roles: Role[];
    rolesToDisplay: string;
    authorities: Authority[];


    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.active = false;
        this.notLocked = false;
        this.roles = [];
    }
}
