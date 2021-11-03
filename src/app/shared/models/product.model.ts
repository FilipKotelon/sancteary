export class Product{
  constructor(
    public name: string,
    public description: string,
    public imgUrl: string,
    public categoryId: string,
    public price: number,
    public specifics: string,
    public stock: number
  ) {}
}

export class DbProduct{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imgUrl: string,
    public categoryId: string,
    public price: number,
    public specifics: string,
    public stock: number
  ) {}

  get formattedPrice(){
    return `$${this.price.toFixed(2)}`
  }
}