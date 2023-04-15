CREATE DATABASE IF NOT EXISTS `poli` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `poli`;

CREATE TABLE IF NOT EXISTS `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `price` float NOT NULL CHECK (price > 0),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS  `inventory` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `quantity` int(11) NOT NULL CHECK (quantity >= 0),
    `product_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `Inventories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP PROCEDURE IF EXISTS `insert_test_rows`;
-- Create stored procedure
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS `insert_test_rows`()
BEGIN
    -- Insert test products (if table is empty)
    IF (SELECT COUNT(*) FROM `products`) = 0 THEN
        INSERT INTO `products` (`name`, `description`, `price`)
        VALUES
            ('Adidas Ultraboost 21', 'The ultimate running shoe with Boost cushioning.', 180.00),
            ('Nike Air Zoom Pegasus 38', 'A classic running shoe with responsive foam.', 120.00),
            ('Asics Gel-Kayano 28', 'A stability shoe with excellent cushioning and support.', 160.00),
            ('New Balance Fresh Foam 1080v11', 'A comfortable and responsive shoe for long runs.', 150.00),
            ('Brooks Ghost 14', 'A versatile shoe that offers a smooth and comfortable ride.', 130.00),
            ('Saucony Endorphin Speed 2', 'A lightweight and fast shoe for speedwork and races.', 160.00),
            ('Hoka One One Bondi 7', 'A maximalist shoe with plenty of cushioning for long distances.', 150.00),
            ('Mizuno Wave Rider 25', 'A durable and responsive shoe with excellent traction.', 130.00),
            ('On Cloudswift', 'A stylish and comfortable shoe with CloudTec cushioning.', 150.00),
            ('Under Armour HOVR Phantom Connected', 'A high-tech shoe with built-in sensors that track your runs.', 150.00),
            ('Reebok Nano X1', 'A versatile and durable shoe for CrossFit and other training.', 130.00),
            ('Puma Clyde All-Pro', 'A classic basketball shoe with modern technology and style.', 120.00),
            ('Converse Chuck Taylor All Star', 'The iconic sneaker that never goes out of style.', 60.00),
            ('Vans Old Skool', 'A timeless skate shoe that looks great with any outfit.', 70.00),
            ('Dr. Martens 1460', 'The classic combat boot with durable construction and timeless style.', 150.00),
            ('Nike Air Max 270', 'A stylish sneaker with a visible Air Max cushioning unit.', 150.00),
            ('Adidas NMD R1', 'A comfortable and trendy sneaker with Boost cushioning.', 130.00),
            ('New Balance FuelCell Propel v3', 'A lightweight and responsive shoe for speed and distance.', 110.00),
            ('Brooks Glycerin 19', 'A plush and supportive shoe with DNA LOFT cushioning.', 160.00),
            ('Saucony Guide 14', 'A stability shoe with responsive cushioning for overpronation.', 130.00),
            ('Hoka One One Clifton 8', 'A popular and comfortable shoe with a smooth ride.', 140.00),
            ('Mizuno Wave Sky 5', 'A cushioned and durable shoe with XPOP foam technology.', 170.00),
            ('On Cloud X', 'A versatile and lightweight shoe with CloudTec cushioning.', 140.00),
            ('Under Armour Charged Bandit 6', 'A breathable and supportive shoe with Charged Cushioning.', 110.00),
            ('Reebok Legacy Lifter II', 'A sturdy weightlifting shoe with a raised heel for stability.', 200.00),
            ('Puma RS-X Cubed', 'A retro-inspired sneaker with a chunky and futuristic design.', 120.00),
            ('Converse Jack Purcell Signature', 'A classic and stylish sneaker with a modern update.', 80.00),
            ('Vans Sk8-Hi', 'A high-top skate shoe with a durable canvas and suede upper.', 75.00),
            ('Dr. Martens 2976 Chelsea Boot', 'A versatile and durable boot with a slip-on design.', 180.00),
            ('Salomon Speedcross 5', 'A rugged and responsive shoe with aggressive traction for trail running.', 130.00),
            ('ASICS Gel-Nimbus 23', 'A comfortable and cushioned shoe with GEL technology.', 150.00),
            ('Nike Metcon 6', 'A versatile and durable shoe for CrossFit and other training.', 130.00),
            ('Adidas UltraBOOST DNA', 'A comfortable and stylish running shoe with a sock-like fit.', 180.00),
            ('New Balance 990v5', 'A classic and comfortable shoe with superior cushioning and support.', 175.00),
            ('Brooks Levitate 5', 'A responsive and energy-returning shoe with DNA AMP technology.', 160.00),
            ('Saucony Kinvara 12', 'A lightweight and breathable shoe with responsive cushioning.', 110.00),
            ('Hoka One One Mach 4', 'A fast and comfortable shoe with a lightweight and breathable upper.', 140.00),
            ('Mizuno Wave Inspire 17', 'A stability shoe with a smooth and responsive ride.', 130.00),
            ('On Cloudflow', 'A lightweight and responsive shoe with CloudTec cushioning.', 140.00),
            ('Under Armour HOVR Sonic 4', 'A comfortable and supportive shoe with UA HOVR technology.', 110.00),
            ('Reebok Club C 85', 'A classic and versatile sneaker with a leather upper.', 80.00);
    END IF;

    -- Insert test inventories (if table is empty)
    IF (SELECT COUNT(*) FROM `inventory`) = 0 THEN
        INSERT INTO `inventory` (`product_id`, `quantity`)
        VALUES
            (1, 50),
            (2, 75),
            (3, 30),
            (4, 60),
            (5, 40),
            (6, 25),
            (7, 20),
            (8, 35),
            (9, 45),
            (10, 50),
            (11, 30),
            (12, 25),
            (13, 100),
            (14, 80),
            (15, 50),
            (16, 55),
            (17, 65),
            (18, 40),
            (19, 70),
            (20, 30),
            (21, 20),
            (22, 15),
            (23, 45),
            (24, 50),
            (25, 35),
            (26, 60),
            (27, 80),
            (28, 90),
            (29, 75),
            (30, 55),
            (31, 25),
            (32, 50),
            (33, 70),
            (34, 45),
            (35, 40),
            (36, 30),
            (37, 20),
            (38, 55),
            (39, 65),
            (40, 35),
            (41, 70);

    END IF;
END //
DELIMITER ;

CALL `insert_test_rows`();