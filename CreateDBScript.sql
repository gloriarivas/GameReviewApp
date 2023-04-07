CREATE DATABASE IF NOT EXISTS gaming_app;

USE gaming_app;

CREATE TABLE genre (
	genre_id INT AUTO_INCREMENT,
    genre_name varchar(20),
    CONSTRAINT genre_id_pk PRIMARY KEY (genre_id)
);

CREATE TABLE users (
	user_id INT AUTO_INCREMENT,
    user_first_name varchar(25),
    user_last_name varchar(25),
	user_email varchar(40),
    CONSTRAINT user_id_pk PRIMARY KEY (user_id)
);

CREATE TABLE games (
	game_id INT AUTO_INCREMENT,
    game_name varchar(100),
    publish_date date,
    genre_id INT,
    company_name varchar(50),
    CONSTRAINT game_id_pk PRIMARY KEY (game_id),
    CONSTRAINT genre_id_fk FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
);

CREATE TABLE reviews(
	review_id INT AUTO_INCREMENT,
    game_id INT,
    title VARCHAR(30),
    comment TEXT,
    rating VARCHAR(5),
    date_posted text,
    CONSTRAINT review_id_pk PRIMARY KEY (review_id),
    CONSTRAINT game_id_fk FOREIGN KEY (game_id) REFERENCES games (game_id)
);

#populate genre
INSERT INTO genre (genre_name)
VALUES('RPG'),
	('Sandbox'),
    ('Action'),
    ('Adventure'),
    ('FPS'),
    ('Open World'),
    ('Platformer'),
    ('Fighting'),
    ('Survival Horror'),
    ('Racing');
    
INSERT INTO users (user_first_name, user_last_name, user_email)
VALUES
	('Gloria', 'Rivas-Bonilla', 'grivas8325@conestogac.on.ca'),
	('John', 'Doe', 'jdoe@email.com'),
	('Bill', 'Chair', 'bchair@gmail.com'),
	('Zuko', 'Lee', 'zlee@hotmail.com');
    
INSERT INTO games (game_name, publish_date, genre_id, company_name)
VALUES
('Minecraft', '2011-11-18', 3, 'Mojang'),
('The Legend Of Zelda: Breath of the Wild', '2017-03-03', 5, 'Nintendo'),
('Rimworld', '2013-11-04', 1, 'Ludeon Studios'),
('Mario Kart 8', '2014-05-28', 9, 'Nintendo'),
('The Forest', '2014-05-30', 8, 'Endnight Games');

INSERT INTO reviews (game_id, title, comment, rating, date_posted)
VALUES
	(1, 'Best game ever!', 'This game is so good, best game ever', 10, '2016-01-01 10:20:05.123'),
	(4, 'Too Fast', 'The cars go way too fast for me, I cannot keep up worst game ever', 2, '2018-01-05 06:12:54.144'),
	(1, 'Good game', 'Not my favourite, but still really good', 8, '2023-02-04 12:45:15:222');