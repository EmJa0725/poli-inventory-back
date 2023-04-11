CREATE DATABASE IF NOT EXISTS `poli` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `poli`;

CREATE TABLE IF NOT EXISTS `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `price` float NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS  `inventory` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `quantity` int(11) NOT NULL,
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
            ('Wilson Pro Staff RF97 Autograph', 'A powerful and precise racquet for advanced players.', 229.99),
            ('Babolat Pure Aero', 'A spin-friendly racquet that delivers power and control.', 219.99),
            ('Head Graphene 360+ Speed Pro', 'A versatile racquet for aggressive players who like to attack.', 239.99),
            ('Yonex EZONE 98', 'A comfortable and maneuverable racquet that provides excellent feel.', 219.99),
            ('Prince Textreme Tour 100P', 'A stable and spin-friendly racquet for intermediate and advanced players.', 199.99);
    END IF;

    -- Insert test inventories (if table is empty)
    IF (SELECT COUNT(*) FROM `inventory`) = 0 THEN
        INSERT INTO `inventory` (`product_id`, `quantity`)
        VALUES
            (1, 10),
            (2, 15),
            (3, 5),
            (4, 20),
            (5, 12);
    END IF;
END //
DELIMITER ;

CALL `insert_test_rows`();