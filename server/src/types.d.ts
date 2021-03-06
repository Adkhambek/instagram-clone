export interface JwtPayload {
    id: string;
}

export type Object = {
    [key: string]: any;
};

type Context = {
    status: number;
    token?: string | null;
    error?: string | null;
    _id?: any;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
    [key: string]: Resolver;
};

export interface User {
    email: string;
    fullName?: string | "";
    username?: string;
    password: string;
}

export interface Confirmation {
    email: string;
    code: number;
}

export type Mail = {
    host: string;
    port: number;
    user: string;
    pass: string;
};

export type MailSend = {
    [key: string]: string;
};
