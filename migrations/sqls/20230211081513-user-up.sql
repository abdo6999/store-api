/* Replace with your SQL commands */
CREATE TABLE userData(
  id SERIAL PRIMARY KEY,
  fristname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(255),
  gender VARCHAR(8)
);