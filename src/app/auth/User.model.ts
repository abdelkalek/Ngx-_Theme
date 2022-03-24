export class User {
  constructor(
    private Id: string,
    public email: string,
    private role: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
  get roleuser() {
    return this.role
  }
}
