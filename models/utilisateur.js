export class Utilisateur {

  constructor(utilisateur) {
    this.id = utilisateur.id
    this.password = utilisateur.password
    this.nom = utilisateur.nom
    this.prenom = utilisateur.prenom
    this.tel = utilisateur.tel
    this.email = utilisateur.email
    this.locataire = utilisateur.locataire
    this.photo = utilisateur.photo
  }
}
