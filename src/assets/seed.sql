INSERT or IGNORE INTO categories (id, name, image, color) VALUES(0, 'voitures', 'assets/img/voitures.png', '#fd625e');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(1, 'nourriture', 'assets/img/nourriture.png', '#87ba3b');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(2, 'alcools', 'assets/img/alcools.png', '#f9d406');

INSERT or IGNORE INTO categories (id, name, image, color) VALUES(3, 'mobiliers', 'assets/img/mobiliers.png', '#df7b23');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(4, 'loisirs', 'assets/img/loisirs.png', '#13a88a');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(5, 'bijoux', 'assets/img/bijoux.png', '#0071bd');

INSERT or IGNORE INTO categories (id, name, image, color) VALUES(6, 'vêtements', 'assets/img/vêtements.png', '#fbc02f');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(7, 'high-tech', 'assets/img/high-tech.png', '#278fc6');
INSERT or IGNORE INTO categories (id, name, image, color) VALUES(8, 'immobilier', 'assets/img/immobilier.png', '#6d4e89');

INSERT or IGNORE INTO difficulties VALUES(0, 'Level 1', 0, "#fd625e", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(1, 'Level 2', 10, "#87ba3b", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(2, 'Level 3', 20, "#f9d406", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(3, 'Level 4', 30, "#df7b23", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(4, 'Level 5', 40, "#13a88a", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(5, 'Level 6', 50, "#0071bd", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(6, 'Level 7', 60, "#fbc02f", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(7, 'Level 8', 70, "#278fc6", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(8, 'Level 9', 80, "#6d4e89", "assets/img/bijoux.png", 0);
INSERT or IGNORE INTO difficulties VALUES(9, 'Level 10', 90, "#fd625e", "assets/img/bijoux.png", 0);

INSERT or IGNORE INTO types VALUES(0, 'true_false');
INSERT or IGNORE INTO types VALUES(1, 'multiple_choices');
INSERT or IGNORE INTO types VALUES(2, 'spell_word');

INSERT or IGNORE INTO status VALUES(0, 'never done');
INSERT or IGNORE INTO status VALUES(1, 'failed');
INSERT or IGNORE INTO status VALUES(2, 'done');

INSERT or IGNORE INTO player VALUES("Romain", 5);

-- Quests
INSERT
or     IGNORE
into   quests
(
        id,
        NAME,
        requete_sql,
        result,
        reward
)
VALUES
(
        0,
        'Réussir 1 quizz',
        'SELECT Count(*)
        FROM   quizz
        WHERE  status = 2',
        1,
        1
);

INSERT
or     IGNORE
into   quests
(
        id,
        NAME,
        requete_sql,
        result,
        reward
)
VALUES
(
        1,
        'Réussir 10 quizz',
        'SELECT Count(*)
        FROM   quizz
        WHERE  status = 2',
        10,
        1
);

INSERT
or     IGNORE
into   quests
(
        id,
        NAME,
        requete_sql,
        result,
        reward
)
VALUES
(
        2,
        'Réussir 3 quizz sur le thème voiture',
        'SELECT Count(*)
        FROM   quizz
        WHERE  status = 2
        AND
        theme = 0',
        3,
        1
);