INSERT or IGNORE INTO categories (id, name, image, color) VALUES(0, 'voitures', 'assets/img/voitures.png', '#fd625e');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(1, 'nourriture', 'assets/img/nourriture.png', '#87ba3b');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(2, 'alcools', 'assets/img/alcools.png', '#f9d406');

INSERT or IGNORE INTO categories (id, name, image, color) VALUES(3, 'mobiliers', 'assets/img/mobiliers.png', '#df7b23');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(4, 'loisirs', 'assets/img/loisirs.png', '#13a88a');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(5, 'bijoux', 'assets/img/bijoux.png', '#0071bd');

INSERT or IGNORE INTO categories (id, name, image, color) VALUES(6, 'vêtements', 'assets/img/vêtements.png', '#fbc02f');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(7, 'high-tech', 'assets/img/high-tech.png', '#278fc6');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(8, 'immobilier', 'assets/img/immobilier.png', '#6d4e89');

INSERT or IGNORE INTO difficulties VALUES(0, 'Level 1', 0);
INSERT or IGNORE INTO difficulties VALUES(1, 'Level 2', 10);
INSERT or IGNORE INTO difficulties VALUES(2, 'Level 3', 20);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 4', 30);
INSERT or IGNORE INTO difficulties VALUES(4, 'Level 5', 40);
INSERT or IGNORE INTO difficulties VALUES(5, 'Level 6', 50);
INSERT or IGNORE INTO difficulties VALUES(6, 'Level 7', 60);
INSERT or IGNORE INTO difficulties VALUES(7, 'Level 8', 70);
INSERT or IGNORE INTO difficulties VALUES(8, 'Level 9', 80);
INSERT or IGNORE INTO difficulties VALUES(9, 'Level 10', 90);

INSERT or IGNORE INTO types VALUES(0, 'true_false');
INSERT or IGNORE INTO types VALUES(1, 'multiple_choices');
INSERT or IGNORE INTO types VALUES(2, 'spell_word');

INSERT or IGNORE INTO status VALUES(0, 'never done');
INSERT or IGNORE INTO status VALUES(1, 'failed');
INSERT or IGNORE INTO status VALUES(2, 'done');

INSERT or IGNORE INTO player VALUES("Romain", 5);

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
	(1,0,0,0,'','true ?','true','','','','',0);

-- Theme 1 / nourriture

	-- Levels 1
		-- Question 3
		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(2,1,0,0,'assets/img/test.jpg','la Bugatti \"voiture noire est noir\" ?','true','','','','',0);

		-- Question 4
		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(4,1,1,0,'assets/img/test.jpg','Je m appel ?','yanis','jacque','pierre','mohammed','yanis',0);

		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(6,1,1,0,'assets/img/test.jpg','test 3','4 000','14 000','26 000','18 000','4 000',0);

		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(7,1,1,0,'assets/img/test.jpg','test 4','4 000','14 000','26 000','18 000','4 000',0);

		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(8,1,1,0,'assets/img/test.jpg','test 5','4 000','14 000','26 000','18 000','4 000',0);

		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(9,1,1,0,'assets/img/test.jpg','test 6','4 000','14 000','26 000','18 000','4 000',0);

	-- Levels 2
		-- Question 4.1
		INSERT or IGNORE INTO
		quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
		VALUES(5,1,1,1,'','Qui ? Quoi ?','pierre','jacque','pierre','mohammed','yanis',0);

-- Theme alcools

	-- Question 1
	INSERT or IGNORE INTO
		quizz (id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
	VALUES
		(10,2,1,0,'','Red ?','red','yellow','red','blue','purple',0);

-- Question 4.2
INSERT or IGNORE INTO
quizz(id,theme,type,difficulty,image,question,answer,option_1,option_2,option_3,option_4,status)
VALUES(3,5,1,0,'assets/img/test.jpg','Quelle est la couleur de la bugatti veyron de Maywheather','blanc','rouge','chrome','blanc','noir',0);