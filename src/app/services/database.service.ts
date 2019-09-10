import { LevelsDone } from './../interfaces/levels-done';
import { Quests } from './../interfaces/quests';
import { Levels } from './../interfaces/levels';
import { DoneQuizz } from './../interfaces/done-quizz';
import { Quizz } from './../interfaces/quizz';
import { Injectable } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private DB_NAME = 'RichQuizz.db';

  private db: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public quizz = new BehaviorSubject([]);
  public countDone: BehaviorSubject<number> = new BehaviorSubject(0);
  public diamonds: BehaviorSubject<number> = new BehaviorSubject(0);
  
  public AllUnlockAt: Array<Levels>;       // Palliers d'unlock de chaque level
  public DonePerLevels: Array<LevelsDone>; // Nombre de quizz réussit par levels

  public quests: Array<Quests>; // Toutes les challenges
  
  public scores = [];

  public ads = {
    android: {
      AD_DELAY: 5, // Tout les combiens de quizz avont nous une pub
      publisherId: "ca-app-pub-7311596904113357~1856758026",
      interstitial: "ca-app-pub-7311596904113357/3034587257",
      banner: "ca-app-pub-7311596904113357/2316579562"
    }
  };

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient,
    private router: Router,
    public modalController: ModalController
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
  
      })
      .catch(e => console.log(e));

    } )

  }

  private InitDatabase(): void {

    this.http.get('assets/seedCreate.sql', { responseType: 'text' })
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.db, sql)
      .then(_ => {
        // Remplit la base de donnée avec les informations principales
        this.FillDatabase();
      })
      .catch(e => console.error(e));
    });

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

  public GetCategories(): any {
    return this.db.executeSql(`
    SELECT
      name,
      image,
      color
    FROM
      categories
    ;
    `, [])
    .then(data => {
      
      var datas = [];

      for (let i = 0; i < data.rows.length; i++) {
        datas.push(data.rows.item(i));
      }

      return JSON.stringify(datas);
    });
  }

  public FillBasicsInfos() {

    this.http.get('assets/seed.sql', { responseType: 'text' })
    .subscribe(sqlFile => {

      this.sqlitePorter.importSqlToDb(this.db, sqlFile)
      .then(_ => {
        this.loadQuizz();
        this.dbReady.next(true);

        // Récupére l'ensemble des quêtes
        this.getQuests();
      })
      .catch(e => console.error(e));

    });
  }

  public FillQuizzs() {

    this.http.get('assets/quizzs.json', { responseType: 'text' })
    .subscribe(jsonFile => {

      var jsonParsed = JSON.parse(jsonFile);
      
      var sqlQuery: string;

      jsonParsed.forEach(quizz => {

        sqlQuery = `
        INSERT OR IGNORE INTO
          quizz(
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
            ${quizz.id},
            ${quizz.theme},
            ${quizz.type},
            ${quizz.difficulty},
            "${quizz.image}",
            "${quizz.question}",
            "${quizz.answer}",
            "${quizz.option_1}",
            "${quizz.option_2}",
            "${quizz.option_3}",
            "${quizz.option_4}",
            ${quizz.status}
          ); 
        `;

        this.executeSqlQuery(sqlQuery,[]);
      });

    });

  }

  private FillDatabase(): void {

    // Load all basics informations of the database
    this.FillBasicsInfos();

    // Load every singke quizz from a JSON file
    this.FillQuizzs();

    // Load all quizzs in the array
    this.loadQuizz();
    
    // Say the database is ready to be used
    this.dbReady.next(true);

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
      this.router.navigate(['home']);
    })
    .catch(e => console.error(e));

  }

  public executeSqlQuery(sqlQuery: string, args: any): any {
    this.db.executeSql(sqlQuery, args)
    .then(response => {
      return response;
    })
    .catch(e => console.error(e));
  }

  public loadScoresLevels(): any {
    
    var sqlQuery: string = `
      SELECT
        color,
        name,
        score
      FROM
        difficulties
      ORDER BY
        score DESC
    ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(response => {

      if (response.rows.length > 0) {

        var scores = [];

        for (let i = 0; i < response.rows.length; i++) {          
          scores.push(response.rows.item(i));          
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
      console.error(e);
    });

  }

  public getQuizzFromLevels(difficulty: string): any {

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
        difficulty_name = '${difficulty}'
        AND
        status_id BETWEEN 0 AND 1
      ORDER BY
        status_id ASC
      ;
    `;

    return this.db.executeSql(SqlQuery, [])
    .then(data => {

      if (data.rows.length > 0) {
        // On return directement le quizz car le nom des attributs est le même
        data.rows.item(0).question = data.rows.item(0).question.replace(/\\/g,"");
        return data.rows.item(0);
      }
      else {
        return null;
      }

    });
  }

  public getWonCounter(): any {

    var sqlQuery = `      
      SELECT
        COUNT(*) AS counter
      FROM
        quizz
        JOIN categories
          ON quizz.theme = categories.id
      WHERE
        status = 2
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {
      this.countDone.next(data.rows.item(0).counter);
    })
    .catch(e => console.error(e));

  }

  public getDiamonds(): any {

    var sqlQuery = `      
      SELECT
        diamonds
      FROM
        player
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {
      return data.rows.item(0).diamonds;
    })
    .catch(e => console.error(e));

  }

  public addDiamonds(diamonds: number): any {

    var sqlQuery = `      
    UPDATE
      player
    SET
      diamonds = diamonds + ${diamonds}
    ;
    `;

    this.db.executeSql(sqlQuery, [])
    .then(() => {
      this.refreshDiamonds();
    })
    .catch(e => console.error(e));

  }

  public subDiamonds(diamonds: number): any {

    var sqlQuery = `      
    UPDATE
      player
    SET
      diamonds = diamonds - ${diamonds}
    ;
    `;

    this.db.executeSql(sqlQuery, [])
    .then(() => {
      this.refreshDiamonds();
    })
    .catch(e => console.error(e));

  }

  private table1(): any {

    var sqlQuery = `
      SELECT
        id,
        name,
        0 AS quantity
      FROM
        difficulties
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {

      var rslt: Array<DoneQuizz> = [];

      for (let i = 0; i < data.rows.length; i++) {

        rslt.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          quantity: data.rows.item(i).quantity
        });

      }
      
      return JSON.stringify(rslt);

    })
    .catch(e => console.error(e));
  }

  private table2(): any {
    
    var sqlQuery = `
      SELECT
        difficulties.id,
        difficulties.name AS name,
        COUNT(*) AS quantity
      FROM
        quizz
        JOIN difficulties
          ON quizz.difficulty = difficulties.id
        JOIN categories
          ON quizz.theme = categories.id 
      WHERE
        status = 2
      GROUP BY
        difficulties.name
      ORDER BY
        difficulties.id ASC
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {
  
      var rslt: Array<DoneQuizz> = [];

      for (let i = 0; i < data.rows.length; i++) {

        rslt.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          quantity: data.rows.item(i).quantity
        });

      }
      
      return JSON.stringify(rslt);

    })
    .catch(e => console.error(e));

  }

  public getDonePerLevels(): any {

    var rslt1: Array<DoneQuizz>;
    var rslt2: Array<DoneQuizz>;

    return this.table1()
    .then(data => {
      rslt1 = JSON.parse(data);

      return this.table2()
      .then(data => {
        rslt2 = JSON.parse(data);

        for (let j = 0; j < rslt2.length; j++) {
          var index = rslt1.findIndex(i => i.id === rslt2[j].id);
          rslt1[index].quantity = rslt2[j].quantity;
        }
    
        return JSON.stringify(rslt1);

      })
      .catch(e => console.error(e));

    })
    .catch(e => console.error(e));

  }

  public refreshDiamonds(): any {

    this.getDiamonds()
    .then(data => {
      this.diamonds.next(data);
    });
    
  }

  public getDiamonObservable(): any {
    return this.diamonds.asObservable();
  }

  public getValueDiamonds(): any {
    return this.getDiamonObservable().subscribe(data => {
      return data;
    });
  }

  public getUnlockAt(): any {

    var sqlQuery = `      
      SELECT
        name,
        points,
        0 AS done
      FROM
        difficulties
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {

      var datas = [];

      for (let i = 0; i < data.rows.length; i++) {
        datas.push({
          name: data.rows.item(i).name,
          points: data.rows.item(i).points,
          done: data.rows.item(i).done
        });
      }

      return JSON.stringify(datas);

    })
    .catch(e => console.error(e));

  }

  public DoneCountLevels(): any {

    this.getDonePerLevels()
    .then(data => {
      this.DonePerLevels = JSON.parse(data);

      this.AllUnlockAt.forEach(item => {
        item.done = this.getDoneLevel(item.name);
      });

    })
    .catch(e => console.error(e));

  }

  public reloadQuests() {
    this.changeDoneQuest();
  }

  public getQuests(): any {

    var sqlQuery = `      
      SELECT
        *
      FROM
        quests
      ;
    `;

    return this.db.executeSql(sqlQuery, [])
    .then(data => {
      var arrayTemp = [];

      for (let i = 0; i < data.rows.length; i++) {
        arrayTemp.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          requete_sql: data.rows.item(i).requete_sql,
          result: data.rows.item(i).result,
          status: data.rows.item(i).status,
          done: 0,
          reward: data.rows.item(i).reward,
          collected: data.rows.item(i).collected
        });
      }

      this.quests = arrayTemp;

      // Change status of the quests
      this.changeDoneQuest();
      
    })
    .catch(e => console.error(e));

  }

  async changeDoneQuest() {

    this.quests.forEach(item => {

      this.calculDoneQuests(item.requete_sql)
      .then(value => {

        item.done = value;        

        if (item.done >= item.result) {
          item.status = 1;
        }
      })
      .catch(e => console.error(e));
      
    });

  }

  public calculDoneQuests(sqlRequest: string): Promise<number> {

    return this.db.executeSql(sqlRequest, [])
    .then(data => {

      let res = data.rows.item(0);
      return Object.values(res)[0] as number;

    })
    .catch(e => {
      console.error(e);
      return 0;
    });
    
  }
  
  public UnlockAtLoad(): any {
   
   this.getUnlockAt()
    .then(data => {

      this.AllUnlockAt = JSON.parse(data);

    })
    .catch(e => console.error(e));

  }

  public loadScores() {
    this.loadScoresLevels()
    .then(response => {
      this.scores = JSON.parse(response);
    })
    .catch(e => console.error(e));
  }

  public updateWon(name: number) {
    
    this.db.executeSql(`
    UPDATE
      difficulties
    SET
      score = score + 1
    WHERE
      name = '${name}'
    ;
    `, [])
    .then(() => {
      this.loadScores();
    })
    .catch(e => {   
      console.error(e);
    });
  }

  // Renvoie le nombre de quizz réussit dans ce level
  public getDoneLevel(level: string): any {

    var index = this.DonePerLevels.findIndex(x => x.name === level);
    return this.DonePerLevels[index].quantity;
  }

  public updateQuestStatus(id: number) {
    this.db.executeSql(`
    UPDATE
      quests
    SET
      status = 1
    WHERE
      id = ${id}
    ;
    `, [])
    .catch(e => console.error(e));
  }

  public checkQuests() {

    this.quests.forEach(item => {
      
      this.db.executeSql(item.requete_sql, [])
      .then(data => {

        if (data >= item.result) {
          this.updateQuestStatus(item.id);
        }

      })
      .catch(e => console.error(e));

    });

  }

  private updateCollected(id: number) {
    return this.db.executeSql(`
      UPDATE
        quests
      SET
        collected = 1
      WHERE
        id = ${id}
      ;
    `, [])
    .then(data => {      
      return true;  
    })
    .catch(e => console.error(e));
  }

  public collect(id: number, reward: number) {

    this.updateCollected(id)
    .then(() => {
      this.getQuests();
      this.addDiamonds(reward);
    });

  }

}
