"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.User = exports.Product = void 0;
class Product {
    constructor(id, title, price, rating, stock, brand, description, category, thumbnail, images) {
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
exports.Product = Product;
class User {
    constructor(id, firstName, lastName, password, email, gender, username) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.username = username;
    }
}
exports.User = User;
class Order {
    constructor(id, products_id, user_id, stutas, orderDate) {
        this.id = id;
        this.products_id = products_id;
        this.user_id = user_id;
        this.stutas = stutas;
        this.orderDate = orderDate;
    }
}
exports.Order = Order;
