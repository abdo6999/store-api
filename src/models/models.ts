class Product {
  id!: number;
  title!: string;
  price!: number;
  rating!: number;
  stock!: number;
  brand!: string;
  description!: string;
  category!: string;
  thumbnail!: string;
  images!: string[];
  constructor(
    id: number,
    title: string,
    price: number,
    rating: number,
    stock: number,
    brand: string,
    description: string,
    category: string,
    thumbnail: string,
    images: string[]
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.description = description;
    this.category = category;
    this.thumbnail = thumbnail;
    this.images = images;
  }
}

class UserData {
  id!: number;
  fristname!: string;
  lastname!: string;
  password!: string;
  email!: string;
  gender!: string;
  constructor(
    id: number,
    fristname: string,
    lastname: string,
    password: string,
    email: string,
    gender: string
  ) {
    this.id = id;
    this.fristname = fristname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.gender = gender;
  }
}

class Orders {
  id!: number;
  products_id!: number[];
  user_id!: number;
  stutas!: Boolean;
  orderDate!: string;

  constructor(
    id: number,
    products_id: number[],
    user_id: number,
    stutas: Boolean,
    orderDate: string
  ) {
    this.id = id;
    this.products_id = products_id;
    this.user_id = user_id;
    this.stutas = stutas;
    this.orderDate = orderDate;
  }
}
export  {Product,UserData,Orders}