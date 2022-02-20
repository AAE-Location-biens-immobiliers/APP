export class Annonce {

  constructor(annonce) {
    this.idAnnonce = annonce.idAnnonce ?? null;
    this.description = annonce.description ?? null;
    this.prix = annonce.prix ?? null;
    this.type = annonce.type ?? null;
    this.nombrePlace = annonce.nombrePlace ?? null;
    this.disponibilites = annonce.disponibilites ?? [];
    this.reservations = annonce.reservations ?? [];
    this.idHabitation = annonce.idHabitation ?? null;
  }
}
