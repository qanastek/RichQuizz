# RichQuizz

## Commandes:

### Date de début de projet

27/06/2019

### Lancer le projet

```bash
ionic cordova run android --livereload --device --consolelogs
```

### Généré tous les icons et splash-screens

```bash
ionic cordova resources
```

### Use animate.css

```javascript
this.animateCSS(id, 'zoomOut', '');
```

### Ajouter un nouveau service

Il faut l'ajouter aux providers de app.module.ts est pas components.ts comme je le penser.

### Erreur config.xml disapear:

```bash
ionic integrations enable cordova --add
```

### Problème AdMob n'affiche pas les PUB:

**Activé simplement internet, les pub ne viendront pas par le saint esprit.**

### Angular nice commands

Give a list of all the types of files can be generated. 

```bash
npx ng g --help
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
- [x] Ajouter des animations pour les diamand ect...
  - [x] Popup fail and askAd
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
  - [x] example:
    - [x] 1 quizz of each themes = won 1 DM
    - [x] 10 quizz of each themes = won 2/3 DM
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
      - [x] Récompence en diamand
      - [x] Etat de collecte
    - [x] Créer la page "quests"
    - [ ] Faire l'UI de la page quests
      - [ ] Revoir le boutton de collecte des diamands
      - [ ] Revoir peut être les couleurs
    - [x] Créer la table "quests" comme ci-dessus
    - [x] Faire les requetes dans la page d'affichage des quetes réussites
    - [x] Faire un quest checker qui s'execute à la fin de chaque quizz
      - [x] Créer le code principale
      - [x] Faire le give des diamand
        - [x] Pour ce faire je propose:
          - [ ] ~~A chaque check ont vérifie si il y a eu du changement en fesant une temp de l'ancienne array et comparé avec la nouvelle tout le delta ce verra give le montant présent dans sa collonne "reward"~~
          - [x] Sinon ajouter une collonne "collected" à 0 ou 1 qui dit si on la collecter ou non
    - [ ] Challenges pubs
    - [ ] Peut etre mettre des arrays à parsé pour les requetes et reponses
    - [ ] Mettre un daily reward de 1 diamand
    - [ ] Elever le champs categories de partout
    - [x] Modifier la table difficulties
      - [x] Ajouter la column:
        - [x] score
        - [x] image
        - [x] color
    - [ ] Remplacer les nom des levels par les noms des themes
- [x] Mettre diamond dans la DB
  - [x] Et donc modifier les appelles aux diamonds
  - [x] Créer aussi un getter en observable
- [ ] Commencer à écrire les test unitaires
  - [ ] before each
    - [ ] run/create the database
- [x] SQL ajout des logo de chaque thème dans le *JOIN* et les tables
- [x] ~~Ajouter la table player dans laquelle il y a : *PlayerName*, *PlayerTotalScore* ~~
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
  - [x] Button
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
- [x] Faire un theme par "levels"
- [ ] Mettre les image en background de chaque "levels"
- [x] Modifier "Add" pour qu'il sortent à l'écran les nouveaux quizz en JSON
- [x] Modifier la page "scores" pour quelle affiche en fonction de la nouvelle architecture (no theme only levels)
- [x] Déplacer les interface présentes dans databaseService dans des interface angular spécifiques
- [x] Modifier le component progression bar:
  - [x] Angle des corners
  - [x] Couleurs reçu à partir des vues
- [ ] Ajouter un systeme de niveau
  - [ ] Ajouter column xp dans la table player
  - [ ] Il y aura des niveaux et des prestiges
  - [ ] Peut être faire sauté la partie score pour la remplacer par la partie "stats" qui contiendra:
    - [ ] diamonds
    - [ ] lien vers boutique
    - [ ] Informations sur le palier suivant
    - [ ] maybe language
      - [ ] Je peux mettre dans question le résultat de la colomn question_(region)
- [x] Faire le mode de jeu "spell"
  - [x] Ajouter 2 lettres créer avec random
    - [ ] WAY 1:
      - [ ] try random(a,z)
    - [ ] WAY 2:
      - [ ] try toString(random(x,x))
    - [x] WAY 3:
      - [x] chars = "abcdefghijklmnopqrstuvwxyz"
      - [x] word += chars.charAt(Math.floor(Math.random() * chars.length))
  - [x] Melanger les lettres avant afficher
  - [x] Faire un boutton supprimer la dernière lettre
  - [x] Faire un boutton envoyé
  - [x] Amélioré l'UI de spell
    - [ ] Ajouter la possibilité de supprimer la lettre que l'ont touche
    - [ ] Hide la lettre ajouter par l'indice
      - [ ] Find dans l'array est composer l'id à partir de l'indice de l'occurence d'au moins une fois cette lettre
    - [x] Ajout d'animations:
      - [x] Quand on ajoute des lettres (haut)
        - [x] Enlevé sa
      - [ ] Quand on appuie sur une lettre elle disparait
      - [ ] Quand erreur faire vibré l'image
  - [x] Faire en sorte que appuyé sur la lettre "hide" le btn de la lettre
    - [x] JQuery like
      - [x] Quand j'appuie sur la touche je récupère l'id de celle-ci
        - [x] 'letter-' + letter + i
      - [x] Je passe le style display de l'item correspondant à cette id à none/block
    - [x] ~~Ou technique soso, on delete de l'array la lettre~~
  - [x] Ajouter l'UI des cases a remplir
  - [x] Replace X by a _
  - [ ] Revoir peut etre le faite de perdre une vie à chaque erreur
    - [ ] Peut-être s'inspiré de icône games
  - [x] Ajouter un joker/indice
    - [x] La liste des jockers s'affiche dans une popup
    - [x] Mettre le boutton dans la toolbar que pour le mode de jeu spell
    - [x] Ajoute une lettre random
    - [x] Ajouter la première lettre
    - [ ] Passer (plus chères)
    - [ ] Regarder une pub pour 1/2 diamands
      - [ ] Si oui: Mettre la fonction d'affichage dans le then car si il glitch ou il à pas internet il pourra infinite give
- [ ] Update quests:
  - [x] Font weight fat pour le nombre à faire
    - [x] ajouter <b></b> dans la DB 
    - [x] ~~ou scrapper~~
  - [x] ~~Mettre diamand à côter de la bar de progression~~
  - [ ] Animé un peu
    - [ ] Animé les diamands quand:
      - [ ] ont en ajoute
      - [ ] ont en enleve
  - [x] Collect award/reward color
- [x] Faire l'écran de chargement
- [x] Faire barre du haut avec diamands et back arrow
- [x] Ajouter la popup de fin de niveau après que la publicité est fini en annoncant +2 diamands
- [ ] Ajouter la popup quand tu récupère les diamands de défis, genre +2 diamands (peut être pas)
- [x] Passer le current spell en array avec push / pop

## TO FIX:

- [x] Problème avec la progression bar de quests
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
- [x] Don't delete letter paid by the player
- [x] Vérifier que l'ont ne puissent pas spam enter à la fin d'un niveau et ouvrir plusieurs inter
  - [x] Si oui alors créer une variable interOpen = false
  - [x] Qui passe à true quand l'inter est ouverte (du moins que le boutton est préssé)
  - [x] Et qui passe à false quand celle-ci ce fini
- [x] Fix la barre de progression qui reste à la même longeur
- [x] Fix le faite que si le client n'a pas de connection à la fin de niveau l'inter ne ce lance pas est donc qu'il n'obtient pas sa récompence
- [x] Empecher l'user d'acheter si il à pas l'argent
  - [x] Afficher une popup au passage qui averti les joueur qu'il ne possède pas assez de diamands
- [ ] Cela ne supprime que les lettre non présentes dans le mot au lieu de celle en trop (A voir si fix ou non)

## CHALLENGES IDEAS:

- [ ] Finir 2 levels won 2/3 diamonds