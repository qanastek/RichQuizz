import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public currentSpell: string[] = []; // Saisie actuelle
  public quizz: any;  // Quizz actuelle
  public nextQuizz: any;  // Prochain quizz
  public spellArray: string[];  // Lettres disponibles au clique
  public deletedLetters: string[] = []; // Array de lettre qui ont était supprimer par le joueur
  public paidLetters: number[] = []; // Lettres payé

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

}
