export type UserModel = {
    id: string,
    email: string,
    password: string,
    role: Roles,
    createdAt: Date,
    updateAt: Date,
}

export class UserDTO {
    id: string;
    email: string;
    role: Roles;

    constructor(user: UserModel) {
        this.id = user.id;
        this.email = user.email;
        this.role = user.role;
    }
}

export enum Roles {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
