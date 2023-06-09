-- DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  roomname VARCHAR(20) DEFAULT 'Lobby'
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  roomname VARCHAR(20) DEFAULT 'Lobby',
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

