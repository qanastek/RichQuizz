import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public currentSpell: string = "";
  public quizz: any;
  public nextQuizz: any;
  public spellArray: string[];
  public deletedLetters: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

}
