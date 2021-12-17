--
-- File generated with SQLiteStudio v3.3.3 on Fri Dec 17 09:50:03 2021
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: recipes
CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, description STRING, imageURL STRING UNIQUE, fileURL STRING UNIQUE);
INSERT INTO recipes (id, name, description, imageURL, fileURL) VALUES (1, 'Korv Stroganoff', 'Korv Stroganoff is easy to do and its delicious', '/img/korvstrog.jpg', NULL);
INSERT INTO recipes (id, name, description, imageURL, fileURL) VALUES (2, 'Meatballs', 'Meatballs is a swedish tradition', '/img/meatballs.jpg', NULL);
INSERT INTO recipes (id, name, description, imageURL, fileURL) VALUES (3, 'Pasta', 'Pasta is an Italian dish', '/img/pasta.jpg', NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
