CREATE DATABASE IF NOT EXISTS gaming_app;

USE gaming_app;
CREATE TABLE company (
	company_id INT AUTO_INCREMENT,
    company_name varchar(20),
    CONSTRAINT company_id_pk PRIMARY KEY (company_id)
);

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
    name varchar(25),
    publish_date date,
    genre_id INT,
    company_id INT,
    CONSTRAINT game_id_pk PRIMARY KEY (game_id),
    CONSTRAINT genre_id_fk FOREIGN KEY (genre_id) REFERENCES genre (genre_id),
    CONSTRAINT company_id_fk FOREIGN KEY (company_id) REFERENCES company (company_id)
);

CREATE TABLE reviews(
	review_id INT AUTO_INCREMENT,
    game_id INT,
    comment TEXT,
    rating VARCHAR(5),
    date_posted DATETIME,
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