-- Create table seller category
CREATE TABLE seller_categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table product category
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    img TEXT,
    location geography(Point, 4326),
    address text,
	role TEXT NOT NULL DEFAULT 'buyer',
	iban TEXT,
	store_name TEXT,
	delivery_radius INT,
	seller_category_id INT REFERENCES seller_categories(id) ON DELETE CASCADE
);

-- Create table product
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    price float NOT NULL,
	product_stock int not null,
	img text,
    product_category_id INT REFERENCES product_categories(id) ON DELETE CASCADE,
    user_seller_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Create table review
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating INT NOT NULL,
	comment text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    user_seller_id INT REFERENCES users(id) ON DELETE CASCADE
);

--create table cart
Create table cart(
	id SERIAL PRIMARY KEY,
	quantity int,
	users_id INT REFERENCES users(id) ON DELETE CASCADE,
	product_id int REFERENCES products(id) ON DELETE CASCADE
);

-- Create table order
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    delivery_time TIME NOT NULL,
    delivery_date DATE NOT NULL,
    note text,
    state text DEFAULT 'não entregue',
    delivery_type text,
	quantity int,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id int REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

--Values seller category
INSERT INTO seller_categories (name)
VALUES ('Agricultor');
INSERT INTO seller_categories (name)
VALUES ('Mercearia');
INSERT INTO seller_categories (name)
VALUES ('Talho');
INSERT INTO seller_categories (name)
VALUES ('Peixaria');

--Values product category
INSERT INTO product_categories (name)
VALUES ('Futa');
INSERT INTO product_categories (name)
VALUES ('Legumes');
INSERT INTO product_categories (name)
VALUES ('Carne');
INSERT INTO product_categories (name)
VALUES ('Bio');
INSERT INTO product_categories (name)
VALUES ('Conservas');
INSERT INTO product_categories (name)
VALUES ('Cabaz');
INSERT INTO product_categories (name)
VALUES ('Carne');
INSERT INTO product_categories (name)
VALUES ('Peixe');
INSERT INTO product_categories (name)
VALUES ('Vegan');
INSERT INTO product_categories (name)
VALUES ('Charcutaria');
INSERT INTO product_categories (name)
VALUES ('Laticínios');
INSERT INTO product_categories (name)
VALUES ('Congelados');
INSERT INTO product_categories (name)
VALUES ('Bebidas Alcoólicas');
INSERT INTO product_categories (name)
VALUES ('Água');
INSERT INTO product_categories (name)
VALUES ('Sumos e Refrigerantes');