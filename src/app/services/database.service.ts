import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

// Classe pour les quizz
  // ou du moins le patron d'une speudo class
export interface Quizz {
  quizz_id: number;
  category_name: string;
  category_id: number;
  type_name: string;
  type_id: number;
  difficulty_name: string;
  difficulty_id: number;
  difficulty_points: number;
  image_url: string;
  question: string;
  answer: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  status_name: string;
  status_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private DB_NAME = 'RichQuizz.db';

  private db: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public quizz = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient,
    private router: Router
  ) {

    this.plt.ready().then( () => {

      this.sqlite.create({
        name: this.DB_NAME,
        location: 'default'      
      })
      .then((database: SQLiteObject) => {
  
        this.db = database;

        // Initialise la base de donnée en créant les tables
        this.InitDatabase();

        // Remplit la base de donnée avec les informations principales
        this.FillDatabase();
  
      })
      .catch(e => console.log(e));

    } )

  }

  private InitDatabase(): void {

    // Categories
    this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS categories(
      id integer primary key AUTOINCREMENT,
      name text,
      image text,
      score integer DEFAULT 0
    )`, []);

    // Difficulties
    this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS difficulties(
      id integer primary key AUTOINCREMENT,
      name text NOT NULL,
      points integer NOT NULL
    )`, []);

    // Types
    this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS types(
      id integer primary key AUTOINCREMENT,
      name text NOT NULL
    )`, []);
    
    // Status
    this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS status(
      id integer primary key AUTOINCREMENT,
      name text NOT NULL
    )`, []);
    
    // Quizz
    this.db.executeSql(`
    CREATE TABLE IF NOT EXISTS quizz(
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
    )`, []);

  }

  private loadQuizz(): any {

    let SqlQueryQuizz = `
      SELECT
        quizz.id 				    AS "quizz_id",
        categories.name 		AS "category_name",
        categories.id 			AS "category_id",
        categories.image 		AS "category_image",
        types.name 				  AS "type_name",
        types.id 				    AS "type_id",
        difficulties.name 	AS "difficulty_name",
        difficulties.id 		AS "difficulty_id",
        difficulties.points AS "difficulty_points",
        quizz.image 			  AS "image_url",
        quizz.question 			AS "question",
        quizz.answer 			  AS "answer",
        quizz.option_1 			AS "option_1",
        quizz.option_2 			AS "option_2",
        quizz.option_3 			AS "option_3",
        quizz.option_4 			AS "option_4",
        status.name 			  AS "status_name",
        status.id 				  AS "status_id"
      FROM
        quizz
        JOIN categories
          ON quizz.theme = categories.id
        JOIN types
          ON quizz.type = types.id
        JOIN difficulties
          ON quizz.difficulty = difficulties.id
        JOIN status
          ON quizz.status = status.id
      ;
    `;

    return this.db.executeSql(SqlQueryQuizz, [])
    .then(data => {

      var quizzs: Quizz[] = [];

      // If the query result isn't empty
      if (data.rows.length > 0) {

        // For each elements of the query result
        for (let i = 0; i < data.rows.length; i++) {

          // Inject a quizz object in the array of quizz's
          quizzs.push({
            quizz_id: data.rows.item(i).quizz_id,
            category_name: data.rows.item(i).category_name,
            category_id: data.rows.item(i).category_id,
            type_name: data.rows.item(i).type_name,
            type_id: data.rows.item(i).type_id,
            difficulty_name: data.rows.item(i).difficulty_name,
            difficulty_id: data.rows.item(i).difficulty_id,
            difficulty_points: data.rows.item(i).difficulty_points,
            image_url: data.rows.item(i).image_url,
            question: data.rows.item(i).question,
            answer: data.rows.item(i).answer,
            option_1: data.rows.item(i).option_1,
            option_2: data.rows.item(i).option_2,
            option_3: data.rows.item(i).option_3,
            option_4: data.rows.item(i).option_4,
            status_name: data.rows.item(i).status_name,
            status_id: data.rows.item(i).status_id
          });
          
        }
        
      }

      // On actualise le state avec les nouvelles valeurs à jours
      this.quizz.next(quizzs);

    });

  }

  private FillDatabase(): void {

    this.http.get('assets/seed.sql', { responseType: 'text' })
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.db, sql)
        .then(_ => {
          this.loadQuizz();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });

  }

  public getQuizz(): Observable<Quizz[]> {
    return this.quizz.asObservable();
  }

  public getDatabaseState(): any {
    return this.dbReady.asObservable();
  }

  public deleteDatabase(): any {
    console.log("Database destroyed")
    this.sqlite.deleteDatabase({ name: this.DB_NAME, location: 'default'});
  }

  private reloadDB(): void {
    this.loadQuizz();
    this.dbReady.next(true);
  }

  public addQuizzDB(
    theme:      number,
    type:       number,
    difficulty: number,
    image:      string,
    question:   string,
    answer:     string,
    option_1:   string,
    option_2:   string,
    option_3:   string,
    option_4:   string,
    status:     number
  ): any {

    let SqlQuery = `
      INSERT or IGNORE INTO
        quizz
      (
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
        ${theme},
        ${type},

        ${difficulty},
        "${image}",
        "${question}",

        "${answer}",
        "${option_1}",
        "${option_2}",

        "${option_3}",
        "${option_4}",
        0
      )
      ;
    `;

    console.log(SqlQuery);

    this.db.executeSql(SqlQuery, [])
    .then(() => {
      // this.reloadDB();
      this.router.navigate(['themes']);
    })
    .catch(e => console.error(e));

  }

  public executeSqlUpdate(sqlQuery: string, args: any): any {
    this.db.executeSql(sqlQuery, args)
    .then(response => {
      return response;
    })
    .catch(e => console.error(e));
  }

  public loadScoresThemes(): any {
    
    var sqlQuery: string = `
      SELECT
        name,
        score
      FROM
        categories
      ORDER BY
        score DESC
    ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(response => {
      
      var scores = [];

      if (response.rows.length > 0) {

        for (let i = 0; i < response.rows.length; i++) {
          
          scores.push({
            color: "#fd625e",
            name: response.rows.item(i).name,
            score: response.rows.item(i).score
          });
          
        }

        return JSON.stringify(scores);
  
      }
      else {
        // Retour a la page theme avec un petit toast
        return null;
      }

    })
    .catch(e => console.error(e));

  }

  public changeStatusQuizz(quizzId: number, newStatus: number): void {

    var sqlQuery: string = `
      UPDATE
        quizz
      SET
        status = ${newStatus}
      WHERE
        id = ${quizzId};
    ;
    `;

    this.db.executeSql(sqlQuery, [])
    .catch(e => {
      console.error("Erreur ici: " + quizzId);
      console.error(e);
    });

  }

  public loadAsQuizzObject(quizz: any ) {

    var quizzObject: Quizz;

    return quizzObject;
    
  }

  public getQuizzTheme(theme: string): any {

    let SqlQuery = `
      SELECT
        quizz.id 				    AS "quizz_id",
        categories.name 		AS "category_name",
        categories.id 			AS "category_id",
        categories.image 		AS "category_image",
        types.name 				  AS "type_name",
        types.id 				    AS "type_id",
        difficulties.name 	AS "difficulty_name",
        difficulties.id 		AS "difficulty_id",
        difficulties.points AS "difficulty_points",
        quizz.image 			  AS "image_url",
        quizz.question 			AS "question",
        quizz.answer 			  AS "answer",
        quizz.option_1 			AS "option_1",
        quizz.option_2 			AS "option_2",
        quizz.option_3 			AS "option_3",
        quizz.option_4 			AS "option_4",
        status.name 			  AS "status_name",
        status.id 				  AS "status_id"
      FROM
        quizz
        JOIN categories
          ON quizz.theme = categories.id
        JOIN types
          ON quizz.type = types.id
        JOIN difficulties
          ON quizz.difficulty = difficulties.id
        JOIN status
          ON quizz.status = status.id
      WHERE
        category_name = '${theme}' AND
        status_id BETWEEN 0 AND 1
      ;
    `;

    return this.db.executeSql(SqlQuery, [])
    .then(data => {

      if (data.rows.length > 0) {

        let item = {
          quizz_id: data.rows.item(0).quizz_id,
          category_name: data.rows.item(0).category_name,
          category_id: data.rows.item(0).category_id,
          category_image: data.rows.item(0).category_image,
          type_name: data.rows.item(0).type_name,
          type_id: data.rows.item(0).type_id,
          difficulty_name: data.rows.item(0).difficulty_name,
          difficulty_id: data.rows.item(0).difficulty_id,
          difficulty_points: data.rows.item(0).difficulty_points,
          image_url: data.rows.item(0).image_url,
          question: data.rows.item(0).question.replace(/\\"/g, ''),
          answer: data.rows.item(0).answer,
          option_1: data.rows.item(0).option_1,
          option_2: data.rows.item(0).option_2,
          option_3: data.rows.item(0).option_3,
          option_4: data.rows.item(0).option_4,
          status_name: data.rows.item(0).status_name,
          status_id: data.rows.item(0).status_id
        };

        return item;

      }
      else {
        return null;
      }

    });
  }

  public getQuizzFromLevels(theme: string, difficulty: string): any {

    let SqlQuery = `
      SELECT
        quizz.id 				    AS "quizz_id",
        categories.name 		AS "category_name",
        categories.id 			AS "category_id",
        categories.image 		AS "category_image",
        types.name 				  AS "type_name",
        types.id 				    AS "type_id",
        difficulties.name 	AS "difficulty_name",
        difficulties.id 		AS "difficulty_id",
        difficulties.points AS "difficulty_points",
        quizz.image 			  AS "image_url",
        quizz.question 			AS "question",
        quizz.answer 			  AS "answer",
        quizz.option_1 			AS "option_1",
        quizz.option_2 			AS "option_2",
        quizz.option_3 			AS "option_3",
        quizz.option_4 			AS "option_4",
        status.name 			  AS "status_name",
        status.id 				  AS "status_id"
      FROM
        quizz
        JOIN categories
          ON quizz.theme = categories.id
        JOIN types
          ON quizz.type = types.id
        JOIN difficulties
          ON quizz.difficulty = difficulties.id
        JOIN status
          ON quizz.status = status.id
      WHERE
        category_name = '${theme}'
        AND
        difficulty_name = '${difficulty}'
        AND
        status_id BETWEEN 0 AND 1
      ;
    `;

    return this.db.executeSql(SqlQuery, [])
    .then(data => {

      if (data.rows.length > 0) {

        let item = {
          quizz_id: data.rows.item(0).quizz_id,
          category_name: data.rows.item(0).category_name,
          category_id: data.rows.item(0).category_id,
          category_image: data.rows.item(0).category_image,
          type_name: data.rows.item(0).type_name,
          type_id: data.rows.item(0).type_id,
          difficulty_name: data.rows.item(0).difficulty_name,
          difficulty_id: data.rows.item(0).difficulty_id,
          difficulty_points: data.rows.item(0).difficulty_points,
          image_url: data.rows.item(0).image_url,
          question: data.rows.item(0).question.replace(/\\"/g, ''),
          answer: data.rows.item(0).answer,
          option_1: data.rows.item(0).option_1,
          option_2: data.rows.item(0).option_2,
          option_3: data.rows.item(0).option_3,
          option_4: data.rows.item(0).option_4,
          status_name: data.rows.item(0).status_name,
          status_id: data.rows.item(0).status_id
        };

        return item;

      }
      else {
        return null;
      }

    });
  }

  public getThemeInfos(theme: string): any {

    var sqlQuery = `
      SELECT
        id, name, image
      FROM
        categories
      WHERE
        name = "${theme}"
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {

      return JSON.stringify({
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        image: data.rows.item(0).image
      });
      
    })
    .catch(e => console.error(e));

  }

  public getWonCounter(theme: string): any {

    var sqlQuery = `      
      SELECT
        COUNT(*) AS counter
      FROM
        quizz
        JOIN categories
          ON quizz.theme = categories.id
      WHERE
        status = 2
        AND
        categories.name = "${theme}"
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {
      return data.rows.item(0).counter;
    })
    .catch(e => console.error(e));

  }

}
