export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  tags: string;
  preferenceType: string;
  preferences: string;

  
  constructor(name, description , price = 0, imageSrc ,
  tags, preferenceType,preferences  )
   {
    this.name = name
    this.description = description
    this.price = price
    this.imageSrc = imageSrc,
    this.tags = tags,
    this.preferenceType = preferenceType,
    this.preferences  = preferences
  }
}
