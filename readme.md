# RichQuizz

## Commandes:

```bash
ionic cordova run android --livereload --device --consolelogs
```

## TODO:

- [ ] SQL ajout des logo de chaque thème dans le *JOIN* et les tables
- [ ] ~~Ajouter la table player dans laquelle il y a : *PlayerName*, *PlayerTotalScore* ~~
- [x] Ajouter à la table catégories la collone suivante *score*
- [x] Quand le joueur clique sur le résultat on regarde si le prochain quizz !== NULL est ci c'est le cas alors on le renvoie vers un écran winer puis vers le thème
- [x] Ajouter une variable global pour le nombre de coeurs. Quand celle-ci tombe à 0 le player est redirigez vers la route *themes* et la variable est remise a 3 coeurs
- [ ] Image picker
- [x] Centré le texte de la question 
- [x] Si pas d'image ne pas afficher ion-img
- [ ] UI:
  - [ ] Joker
  - [ ] Button
    - [x] True or False
    - [ ] QCM
      - [ ] Changé la forme des btn pour des coins arrondis ou juste faire un padding
  - [ ] PUB
  - [ ] Heaths
  - [ ] Centré le logo du current theme
  - [ ] Changé la font-size de la question
  - [ ] Changé la typo (font-familly) de toute l'APP
  - [x] Enlevé les shader des buttons
  - [ ] Icon à côté des buttons sur l'écran d'accueil
  - [ ] Faire la page *levels*
- [ ] Changé les requêtes SQL du fonctionnement de *play* et *themes* après avoir créer la page de sélection du level
- [ ] Voir si je unlock:
  - [ ] A un certain nombre de crédits / XP *(Selon moi la meilleur façon de faire)*
    - [ ] J'ai simplement à ajouter une *column* dans *difficulties* qui ce dénoméra *unlockAt* et qui aura le score auquelle celle-ci s'auto unlock.
    - [ ] Mais pour faire sa, il faut créer une variable globale ScoreTotal (obtient a l'aide du query sql sur quizz avec status = 2 et un join pour obtenir le score que chaque question)
    - [ ] Pour le côté UI, le unlockage ce fera à l'aide du *totalScore* genre if this.totalScore > ${difficulties.UnlockAt}
  - [ ] Après avoir fini le level d'avant *(Pas térible)*
  - [ ] Je lock aucun level