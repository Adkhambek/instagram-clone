type Context = {
    status: number;
    token?: string | null;
    error?: string | null;
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
