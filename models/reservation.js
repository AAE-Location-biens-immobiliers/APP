export class Reservation {

  constructor(reservation) {
    this.idReservation = reservation.idReservation ?? null;
    this.dateReservationDebut = reservation.dateReservationDebut ?? null;
    this.dateReservationFin = reservation.dateReservationFin ?? null;
    this.factures = reservation.factures ?? [];
    this.idLocataire = reservation.idLocataire ?? null;
    this.idAnnonce = reservation.idAnnonce ?? null;
  }
}
