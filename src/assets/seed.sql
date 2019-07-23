INSERT or IGNORE INTO categories (id, name, image) VALUES(0,'voitures','assets/img/car.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(1,'nourriture','assets/img/grocery.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(2,'alcools','assets/img/liquor.png');

INSERT or IGNORE INTO categories (id, name, image) VALUES(3,'mobiliers','assets/img/living-room.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(4,'loisirs','assets/img/sport.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(5,'bijoux','assets/img/watch.png');

INSERT or IGNORE INTO categories (id, name, image) VALUES(6,'vêtements','assets/img/cloth.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(7,'high-tech','assets/img/computer.png');
INSERT or IGNORE INTO categories (id, name, image) VALUES(8,'immobilier','assets/img/house.png');

INSERT or IGNORE INTO difficulties VALUES(0, 'Level 1', 25);
INSERT or IGNORE INTO difficulties VALUES(1, 'Level 2', 50);
INSERT or IGNORE INTO difficulties VALUES(2, 'Level 3', 75);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 4', 100);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 5', 125);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 6', 150);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 7', 175);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 8', 200);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 9', 225);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 10', 250);

INSERT or IGNORE INTO types VALUES(0, 'true_false');
INSERT or IGNORE INTO types VALUES(1, 'multiple_choices');

INSERT or IGNORE INTO status VALUES(0, 'never done');
INSERT or IGNORE INTO status VALUES(1, 'failed');
INSERT or IGNORE INTO status VALUES(2, 'done');

-- Question 1
INSERT or IGNORE INTO quizz 
(
	id,
	theme,
	type,

	difficulty,
	image,
	question,

	answer,
	option_1,
	option_2,

	option_3,
	option_4,
	status
)
VALUES(
	0,
	3,
	0,

	0,
	"assets/img/test.jpg",
	"Voit-tu une image ?",

	"false",
	"",
	"",

	"",
	"",
	0
);

-- Question 2
INSERT or IGNORE INTO
	quizz (id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES
	(1,0,0,3,'','true ?','true','','','','',0);

-- Question 3
INSERT or IGNORE INTO
quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES(2,1,0,0,'assets/img/test.jpg','la Bugatti \"voiture noire est noir\" ?','true','','','','',0);

-- Question 4
INSERT or IGNORE INTO
quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES(4,1,1,3,'assets/img/test.jpg','Je m appel ?','yanis','jacque','pierre','mohammed','yanis',0);

-- Question 4.1
INSERT or IGNORE INTO
quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES(5,1,1,3,'assets/img/test.jpg','Qui ? Quoi ?','pierre','jacque','pierre','mohammed','yanis',0);

-- Question 4.2
INSERT or IGNORE INTO
quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES(3,5,1,3,'assets/img/test.jpg','Quelle est la couleur de la bugatti veyron de Maywheather','blanc','rouge','chrome','blanc','noir',0);