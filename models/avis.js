export class Avis {

  constructor(avis) {
    this.idAvis = avis.idAvis ?? null
    this.commentaire = avis.commentaire ?? null
    this.etoile = avis.etoile ?? null;
    this.idWriter = avis.idWriter ?? null
  }
}
