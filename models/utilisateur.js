export class Utilisateur {

  constructor(utilisateur) {
    this.id = utilisateur.id ?? null
    this.identifiant = utilisateur.identifiant ?? null
    this.password = utilisateur.password ?? null
    this.nom = utilisateur.nom ?? null
    this.prenom = utilisateur.prenom ?? null
    this.tel = utilisateur.tel ?? null
    this.email = utilisateur.email ?? null
    this.locataire = utilisateur.locataire ?? null
    this.avis = utilisateur.avis ?? null
    this.aviswritten = utilisateur.aviswritten ?? null
    this.habitations = utilisateur.habitations ?? null
    this.factures = utilisateur.factures ?? null
    this.reservations = utilisateur.reservations ?? null
    this.photo = utilisateur.photo ?? null
  }
}
