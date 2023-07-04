import { Account } from "../constants";

export type CurrentUser = {
  id: number;
  accountType: Account;
};

export type setCurrentUserProp = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export type UserPayload = CurrentUser & {
  displayName: string;
  iat: number;
  exp: number;
};

export type DecodedToken = {
  id: number;
  approved: boolean;
  displayName: string;
  accountType: number;
};

export type SigningUpUser = {
  accountType?: Account;
  displayName?: string;
  openId: string;
};

export type BasicUser = {
  accountType: Account;
  displayName: string;
};

export type NewUser = BasicUser & {
  openId?: string;
};

export type User = NewUser & {
  id: number;
  approved: boolean;
};
