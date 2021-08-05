--CREATE DATABASE e_commerce_db;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR (255),
    price INT,
    type VARCHAR(255),
    img_url VARCHAR(500),
    in_cart BOOLEAN
);

INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPhone 12 Pro',
    'The ultimate iPhone',
    999,
    'iphone',
    'https://ss71.vzw.com/is/image/VerizonWireless/iphone-12-pro-pacific-blue?fmt=pjpg&hei=520&wid=350',
    'false'
    );

INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPhone 12 Pro Max',
    'A total powerhouse',
    1099,
    'iphone',
    'https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-12-pro-max-silver-10132020?fmt=pjpg&hei=520&wid=350',
    'false'
    );
INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPhone 12',
    'A classic, reinvented',
    899,
    'iphone',
    'https://ss71.vzw.com/is/image/VerizonWireless/apple-iphone-12-64gb-purple-53017-mjn13ll-a?fmt=pjpg&hei=520&wid=350',
    'false'
    );
INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPhone 12 Mini',
    'Tiny, but powerful',
    699,
    'iphone',
    'https://ss71.vzw.com/is/image/VerizonWireless/apple-iphone-12-mini-purple-2021?fmt=pjpg&hei=520&wid=350',
    'false'
    );



INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPad Pro',
    '12.9-inch display',
    1099,
    'ipad',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-202104?wid=485&amp;hei=510&amp;fmt=png-alpha&amp;.v=1617067382000',
    'false'
    );

INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPad Pro',
    '11-inch display',
    799,
    'ipad',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-202104?wid=485&amp;hei=510&amp;fmt=png-alpha&amp;.v=1617067379000',
    'false'
    );

INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'iPad Mini',
    '7.9-inch display',
    399,
    'ipad',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-201911?wid=465&hei=530&fmt=jpeg&qlt=95&.v=1584056010058',
    'false'
    );


INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'MacBook Air',
    '13.3-inch retina display',
    999,
    'mac',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1603332211000',
    'false'
    );

    INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'MacBook Pro',
    '13-inch retina display',
    1299,
    'mac',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1613672894000',
    'false'
    );
INSERT INTO products(name, description, price, type, img_url, in_cart) VALUES (
    'MacBook Pro',
    '16-inch retina display',
    2399,
    'mac',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1572825197207',
    'false'
    );

--CREATE USERS TABLE
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name varchar (255) NOT NULL,
    user_email varchar (255) NOT NULL,
    user_password varchar (255) NOT NULL
);
------TESTS-------
CREATE TABLE users_products_cart (
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, product_id)
);

INSERT INTO users_products_cart VALUES ( 'f91b3e18-9d5b-4380-acc5-528802addd90', '4');
INSERT INTO users_products_cart VALUES ( 'd16dee11-5548-4dfe-8d6c-034907e789e1', '4');
INSERT INTO users_products_cart VALUES ( '7360be7b-35ae-4f88-954b-ae43204e0658', '4');
INSERT INTO users_products_cart VALUES ( 'f91b3e18-9d5b-4380-acc5-528802addd90', '6');
INSERT INTO users_products_cart VALUES ( 'f91b3e18-9d5b-4380-acc5-528802addd90', '7');

SELECT users.user_email AS user_email, products.name AS product_name, products.price AS price
FROM users, products, users_products_cart
WHERE users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90'
AND users.user_id = users_products_cart.user_id 
AND products.product_id = users_products_cart.product_id;

SELECT COUNT(*)
FROM users, products, users_products_cart
WHERE users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90'
AND users.user_id = users_products_cart.user_id 
AND products.product_id = users_products_cart.product_id;

SELECT products.product_id AS product_id, products.name AS name, products.description AS description, products.price AS price, products.img_url AS img_url
FROM users, products, users_products_cart
WHERE users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90'
AND users.user_id = users_products_cart.user_id 
AND products.product_id = users_products_cart.product_id;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR (255),
    price INT,
    type VARCHAR(255),
    img_url VARCHAR(500),
    in_cart BOOLEAN
);

DELETE FROM users_products_cart USING products, users
WHERE products.product_id = '4'
AND users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90'
AND products.product_id = users_products_cart.product_id;

SELECT SUM(products.price)
FROM users, products, users_products_cart
WHERE users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90'
AND users.user_id = users_products_cart.user_id 
AND products.product_id = users_products_cart.product_id;

SELECT SUM(products.price) FROM users, products, users_products_cart WHERE users_products_cart.user_id = 'f91b3e18-9d5b-4380-acc5-528802addd90' AND users.user_id = users_products_cart.user_id AND products.product_id = users_products_cart.product_id;"