export class ProductCategory {
  constructor(
    public name: string,
    public imgUrl: string
  ) {}
}

export class DbProductCategory extends ProductCategory {
  constructor(
    public id: string,
    public name: string,
    public imgUrl: string
  ) {
    super(name, imgUrl);
  }
}