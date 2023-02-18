class Product {
  id?: number;
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

class User {
  id?: number;
  firstName!: string;
  lastName!: string;
  password!: string;
  email!: string;
  gender!: string;
  username!: string;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    gender: string,
    username: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.username = username;
  }
}

class Order {
  id?: number;
  cart!: Cart[] | string;
  user_id!: number;
  stutas!: boolean;
  orderDate!: string;
  constructor(
    id: number,
    cart: Cart[] | string,
    user_id: number,
    stutas: boolean,
    orderDate: string
  ) {
    this.id = id;
    this.cart = cart;
    this.user_id = user_id;
    this.stutas = stutas;
    this.orderDate = orderDate;
  }
}
class Cart {
  product_id!: number;
  quantity!: number;
  constructor(product_id: number, quantity: number) {
    this.product_id = product_id;
    this.quantity = quantity;
  }
}
export { Product, User, Order };