import { UserRole } from "./user.model";

export class DbUser {
  constructor(
    public id: string,
    public role: UserRole,
  ) {}
}