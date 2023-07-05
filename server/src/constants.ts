export enum Account {
  Admin = 1,
  User = 2,
}

export const ALL = [Account.Admin, Account.User];

export const ADMINS = [Account.Admin];

export const JWT_EXPIRIES: {
  [key in Account]: string;
} = {
  [Account.Admin]: "1h",
  [Account.User]: "1h",
};
