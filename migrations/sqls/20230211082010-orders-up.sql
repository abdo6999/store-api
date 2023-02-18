/* Replace with your SQL commands */
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  cart json[] NOT NULL,
  stutas BOOLEAN NOT NULL,
  orderDate DATE NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);
