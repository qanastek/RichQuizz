/**
* Result: Est le résultat à obtenir
* Done: Est la valeur actuelle du défi
* Reward: Est la recompence à gagner
* Collected: 0/1 permet de savoir si cette récompence à déjà était collecter
*/
export interface Quests {
    id: number,
    name: string,
    requete_sql: string,
    result: number,
    status: number,
    done: number,
    reward: number,
    collected: number
}