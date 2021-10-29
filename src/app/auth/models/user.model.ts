export enum UserRole {
  Admin = 'admin',
  Client = 'client'
}

export class User {
  constructor(
    public email: string,
    public id: string,
    public role: UserRole,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}