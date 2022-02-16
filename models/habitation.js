export class Habitation {

  constructor(habitation) {
    this.idHabitation = habitation.idHabitation ?? null;
    this.description = habitation.description ?? null;
    this.longitude = habitation.longitude ?? null;
    this.latitude = habitation.latitude ?? null;
    this.pays = habitation.pays ?? null;
    this.numero = habitation.numero ?? null;
    this.code = habitation.code ?? null;
    this.rue = habitation.rue  ?? null;
    this.ville = habitation.ville ?? null;
    this.photo = habitation.photo ?? null;
    this.wifi = habitation.wifi ?? false;
    this.lave_linge = habitation.lave_linge ?? false;
    this.seche_linge = habitation.seche_linge ?? false;
    this.climatisation = habitation.climatisation ?? false;
    this.parking = habitation.parking ?? false;
    this.tv = habitation.tv ?? false;
    this.cuisine = habitation.cuisine ?? false;
  }
}
