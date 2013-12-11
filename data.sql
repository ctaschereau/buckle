SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;


SELECT pg_catalog.setval('buckle_id_seq', 1, true);
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Pink Floyd', 'Brisée :(', '2008-08-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('The Beatles', 'De collection', '2007-12-24');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Jack Daniel''s horses', NULL, '2013-02-02');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Art par Sabrina', NULL, '2013-02-02');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('The Legend', NULL, '2013-02-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Bullet Bill', NULL, '2013-02-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Punisher', NULL, '2013-02-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Massey Ferguson', NULL, '2013-02-02');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Family Guy : Stewie', NULL, '2012-12-25');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Family Guy : Peter', NULL, '2013-01-04');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Loup ultra viril', NULL, '2009-02-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Stewie as Alex DeLarge', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Robot', NULL, '2010-09-09');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Led Zeppelin', NULL, '2012-09-09');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Beaver crossing', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Design ''celtique''', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Transformers Autobots', NULL, '2012-09-09');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Peace and Love', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Jack Daniel''s White Rabbit Saloon', NULL, '2007-12-24');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('AC/DC', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Mr. Kebap', NULL, '2010-09-15');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Québec', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Fantôme de Pac-Man', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Taureau ''longhorn''', NULL, '2010-09-09');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Cthulhu Waits', NULL, '2012-03-18');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('1-up / champignon rouge', NULL, '2012-02-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Superman', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('John Deere', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Manette de NES', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Cube Rubik', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Débouche bière ''Got Beer ?''', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Ours Jack Daniel''s', NULL, '2012-09-09');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Flasque d''alcool', NULL, '2008-01-01');
INSERT INTO buckle(buckle_name, notes, date_acquired) VALUES ('Batman', NULL, '2008-01-01');


INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230083.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230101.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230097.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230098.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230100.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230081.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230094.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230088.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230099.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230091.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230096.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230087.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230105.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230089.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230082.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230090.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230086.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230093.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230103.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230092.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230106.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230084.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230104.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230102.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230079.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230095.jpg', 1);
INSERT INTO buckle_image(filename, buckle_id) VALUES ('PC230078.jpg', 1);


