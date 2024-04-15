CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  price DECIMAL(10,2),
  stock_quantity INTEGER,
  category VARCHAR
);

CREATE TABLE customer (
  id SERIAL PRIMARY KEY ,
  name VARCHAR NOT NULL,
  surname VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0.00,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  transaction_date TIMESTAMP,
  customer_id INTEGER,
  cart_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customer (id),
  FOREIGN KEY (cart_id) REFERENCES cart (id)
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (product_id) REFERENCES product (id),
  FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE TABLE saved (
  customer_id INTEGER,
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES product (id),
  FOREIGN KEY (customer_id) REFERENCES customer (id)
);
