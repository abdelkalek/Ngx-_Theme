export class User {
  constructor(
    public id: string,
    public cin: string,
    public matricule :string,
    public email: string,
    public nom: string,
    public prenom: string,
    public  codePostal: string,
    public adress: string,
    public ville: string,
    public  poste: string,
    public genre: string,
    public phoneNumber: string,
    public userName: string,
    public datedeNaissance: string,
    private _token: string,
    private _tokenExpirationDate: Date) {
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
