export class Disponibilites {

  constructor(dispo) {
    this.idDisponibilite = dispo.idDisponibilite ?? null;
    this.debut = dispo.debut ?? null;
    this.fin = dispo.fin ?? null;
  }
}
