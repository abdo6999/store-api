/* Replace with your SQL commands */
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  products_id INT[] NOT NULL,
  user_id INT REFERENCES userData (id) NOT NULL,
  stutas BOOLEAN NOT NULL,
  orderDate DATE
);
