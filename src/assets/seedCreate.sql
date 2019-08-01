CREATE TABLE IF NOT EXISTS
	player
	(
      name text,
      diamonds integer NOT NULL
	)
;

CREATE TABLE IF NOT EXISTS
	categories
	(
      id integer primary key AUTOINCREMENT,
      name text,
      image text,
      score integer DEFAULT 0,
      color string DEFAULT '#f08080'
	)
;

CREATE TABLE IF NOT EXISTS
	difficulties
	(
	  id integer primary key AUTOINCREMENT,
	  name text NOT NULL,
	  points integer NOT NULL
	)
;

CREATE TABLE IF NOT EXISTS
	types
	(
      id integer primary key AUTOINCREMENT,
      name text NOT NULL
    )
;

CREATE TABLE IF NOT EXISTS
	status
	(
      id integer primary key AUTOINCREMENT,
      name text NOT NULL
    )
;

CREATE TABLE IF NOT EXISTS
	quizz
	(
      id integer primary key AUTOINCREMENT,
      theme integer DEFAULT 0 NOT NULL,
      type integer NOT NULL,
      difficulty integer DEFAULT 0 NOT NULL,
      image text NOT NULL,
      question text NOT NULL,
      answer text NOT NULL,
      option_1 text,
      option_2 text,
      option_3 text,
      option_4 text,
      status integer DEFAULT 0 NOT NULL,
      FOREIGN KEY(theme) REFERENCES categories(id),
      FOREIGN KEY(type) REFERENCES types(id),
      FOREIGN KEY(difficulty) REFERENCES difficulties(id),
      FOREIGN KEY(status) REFERENCES status(id)
    )
;