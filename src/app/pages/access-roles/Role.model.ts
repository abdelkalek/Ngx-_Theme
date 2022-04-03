export class Role {
  constructor(
    private Id: string,
    public name: string,
    private normalizedName: string,
    private concurrencyStamp: string
  ) {
  }
}
