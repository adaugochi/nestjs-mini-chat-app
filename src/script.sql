create database chat_app;

CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(100) NOT NULL,
    `name` varchar(255) NOT NULL,
    `password` varchar(100) NOT NULL,
    `active` tinyint(1) DEFAULT 1,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `iq_email` (`email`)
);

CREATE TABLE `messages` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `sender_user_id` int unsigned NOT NULL,
    `receiver_user_id` int unsigned NOT NULL,
    `message_body` text NOT NULL,
    `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);