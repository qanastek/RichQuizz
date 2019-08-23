# RichQuizz

## Commandes:

### Lancer le projet

```bash
ionic cordova run android --livereload --device --consolelogs
```

### Erreur config.xml disapear:

```bash
ionic integrations enable cordova --add
```

### Problème avec les components de Ionic dans les components Angular:

```javascript
@NgModule({
 imports: [
  CommonModule, <<<< add the angular common module
  IonicModule <<<< add the ionic module
 ],
 ...
})
```

## TODO:

- [ ] Forcer les icons iphone
- [ ] Switcher de SQLite Native to ionic-storage
  - [ ] https://forum.ionicframework.com/t/how-to-use-sqlite-in-browser-chrome-with-ionic-serve/101084/4
  - [ ] https://www.thepolyglotdeveloper.com/2016/08/using-sqlstorage-instead-sqlite-ionic-2-app/
- [ ] Ajouter un systeme de loading entre les pages
- [ ] Ajouter des animations pourles diamand ect...
- [ ] Revoir UI des popup
  - [x] Retry with popup
  - [x] Fail
  - [x] Win
  - [ ] Voir si garder dead
  - [x] Pub
    - [x] Hidden
    - [ ] Delete
- [ ] Voir pour i18n
  - [ ] Exemple:
    - [ ] Pour la "question" faire des collones question_fr-FR, question_es-ES 
- [ ] Ajouter un sytème de défis
  - [ ] example:
    - [ ] 1 quizz of each themes = won 1 DM
    - [ ] 10 quizz of each themes = won 2/3 DM
  - [x] Structure:
    - [x] Les defis seront une table de la base de donnée dans laquelle nous aurions:
      - [x] Identifiant du défi
      - [x] Nom du défi
      - [x] Description courte
      - [x] Requête SQL
      - [x] Résultat minimum espéré
      - [x] Statut: 0 / 1
        - [x] 0: not done
        - [x] 1: done
  - [ ] TODO:
    - [x] Créer la page "quests"
    - [ ] Faire l'UI de la page quests
    - [x] Créer la table "quests" comme ci-dessus
    - [ ] Faire les requetes dans la page d'affichage des quetes réussites
    - [ ] Faire un quest checker qui s'execute à la fin de chaque quizz
    - [ ] Elever le champs categories de partout
    - [ ] Modifier la table difficulties
    - [ ] Remplacer les nom des levels par les noms des themes
      - [ ] De même ajouter la column:
        - [ ] score
        - [ ] image
        - [ ] color
- [x] Mettre diamond dans la DB
  - [x] Et donc modifier les appelles aux diamonds
  - [x] Créer aussi un getter en observable
- [ ] Commencer à écrire les test unitaires
- [x] SQL ajout des logo de chaque thème dans le *JOIN* et les tables
- [ ] ~~Ajouter la table player dans laquelle il y a : *PlayerName*, *PlayerTotalScore* ~~
- [x] Ajouter à la table catégories la collone suivante *score*
- [x] Quand le joueur clique sur le résultat on regarde si le prochain quizz !== NULL est ci c'est le cas alors on le renvoie vers un écran winer puis vers le thème
- [x] Ajouter une variable global pour le nombre de coeurs. Quand celle-ci tombe à 0 le player est redirigez vers la route *themes* et la variable est remise a 3 coeurs
- [x] Image picker
  - [x] inutile pour le moment au final
- [x] Centré le texte de la question 
- [x] Si pas d'image ne pas afficher ion-img
- [ ] UI:
  - [x] Joker
    - [x] n'existe plus
  - [ ] Button
    - [x] True or False
    - [x] QCM
      - [x] Quand y a pas d'image
      - [x] Quand y a des images
  - [ ] PUB
    - [x] fake
    - [x] AdMob test
    - [ ] real
  - [x] Heaths
    - [x] Remplacer par des diamands
  - [x] Image
    - [x] mettre un shadow
    - [x] format tjr le meme
  - [x] Centré le logo du current theme
  - [x] Changé la font-size de la question
  - [ ] Changé la typo (font-familly) de toute l'aplication
  - [x] Enlevé les shader des buttons
  - [ ] Icon à côté des buttons sur l'écran d'accueil
  - [x] Faire la page *levels*
- [x] Changé les requêtes SQL du fonctionnement de *play* et *themes* après avoir créer la page de sélection du level
  - [x] Il faut changer celles de:
    - [x] *play*
  - [x] Ajouter celle de *levels*
- [x] Voir si je unlock:
  - [ ] A un certain nombre de crédits / XP *(Selon moi la meilleur façon de faire)*
    - [ ] J'ai simplement à ajouter une *column* dans *difficulties* qui ce dénoméra *unlockAt* et qui aura le score auquelle celle-ci s'auto unlock.
    - [x] Mais pour faire sa, il faut créer une variable globale ScoreTotal (obtient a l'aide du query sql sur quizz avec status = 2 et un join pour obtenir le score que chaque question)
    - [ ] Pour le côté UI, le unlockage ce fera à l'aide du *totalScore* genre if this.totalScore > ${difficulties.UnlockAt}
  - [ ] ~~Après avoir fini le level d'avant *(Pas térible)*~~
  - [ ] ~~Je lock aucun level~~
  - [x] Il finir un certain nombre de quizz pour unlock le level
    - [x] le nombre de quizz nécessaire est trouvable dans difficulties / column 3
    - [ ] mais il faut renommé la collones et donc refaire les requetes SQl la comportant pour *unlockAt* par exemple
- [x] Enlever la page theme et en appuyant sur "jouer" directement aller à la page "levels"
- [ ] Faire un theme par "levels" et mettre les image en background de chaque "levels"
- [x] Modifier "Add" pour qu'il sortent à l'écran les nouveaux quizz en JSON

## TO FIX:

- [ ] Problème avec la progression bar de quests
- [x] La ad ne s'affiche pas
  - [x] Bug ~001
  - [x] setTimeout ne sutilise pas avec function mais () => {}
- [x] displayAd de advertisement popup service ne fonctionne pas
  - [x] A cause de AdvertisementComponent
  - [x] Le probleme été dû au faite que je déclaré AdvertisementComponent dans le constructeur
- [x] La valeur de chaque level nest pas un observable
  - [x] J'ai fixer le probleme sans utilisé d'observable
  - [x] J'ai seulement transféré les fonctions et variables nécessaire à l'actualisation et à l'affichage de ce nombre dans le service database de sorte à ce que les pages "play" puissent actualisé leurs propres page level entre guillemets.
- [x] BehaviorSubject send me back old data
  - [x] Pour résoudre sa il faut:
    - [x] pas sendAsObservable
    - [x] et utilisé this.diamonds.getValue()
- [x] compteur de quizz done actualise pas auto après réussit
  - [x] maybe import refreshCounter from levels
- [x] les coeurs de la game ne restes pas apres avoir quitter et revenue
  - [x] donc réflechir si je laisse les coeurs ou non au final
- [x] Fix le probleme de non reload
  - [x] pour ce faire: favorisé les subscribe pour les endroits qui marches pas
- [x] Quand je vais de la page play à levels j'ai l'observable countDone qui ne s'actualise pas
- [x] La variable countDone donne la valeur précédente
  - [x] C'était dû au faite que nous affichions la valeur avoir que le refresh est eu le temps de finir