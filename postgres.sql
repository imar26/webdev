INSERT INTO webdev.actor(name) VALUES ('Arnold');
INSERT INTO webdev.actor(name) VALUES ('Harrison');
INSERT INTO webdev.actor(name) VALUES ('Liam');

select * from webdev.actor;

INSERT INTO webdev.movie(title) VALUES ('The Terminator');
INSERT INTO webdev.movie(title) VALUES ('Judgement Day');
INSERT INTO webdev.movie(title) VALUES ('Predator');
INSERT INTO webdev.movie(title) VALUES ('Blade Runner');
INSERT INTO webdev.movie(title) VALUES ('Indiana Jones');
INSERT INTO webdev.movie(title) VALUES ('Enders Game');
INSERT INTO webdev.movie(title) VALUES ('Taken 1');
INSERT INTO webdev.movie(title) VALUES ('Taken 2');
INSERT INTO webdev.movie(title) VALUES ('Taken 3');

select * from webdev.movie;

INSERT INTO webdev.casting(role, actor_id, movie_id) VALUES ('The Terminator', '1', '1');
INSERT INTO webdev.casting(role, actor_id, movie_id) VALUES ('The Terminator', '1', '2');
INSERT INTO webdev.casting(role, actor_id, movie_id) VALUES ('Dutch', '1', '3');

select * from webdev.casting;

select name, title, role from actor a inner join casting c on c.actor_id=a.id inner join movie m on m.id=c.movie_id;
