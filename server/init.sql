CREATE DATABASE e_commerce_db;

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

/*UPDATE iphones SET img_url = 'https://ss71.vzw.com/is/image/VerizonWireless/iphone-12-pro-pacific-blue?fmt=pjpg&hei=520&wid=350'
WHERE name = 'iPhone 12 Pro';*/

///IPAD INSERTS////
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

///MAC INSERTS////
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

//CART INSERT TESTS
INSERT INTO cart(name, description, price, type, img_url) VALUES (
    'MacBook Pro',
    '16-inch retina display',
    2399,
    'mac',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1572825197207',
    'false'
    );