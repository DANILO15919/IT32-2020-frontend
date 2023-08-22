import { Filijala } from "./filijala";
import { Korisnik_usluge } from "./korisnik-usluge";

export class Usluga {
    id!: number;
    naziv!: string;
    opis_Usluge!: string;
    datum_Ugovora!: Date;
    provizija!: number;
    filijala!: Filijala;
    korisnikUsluge!: Korisnik_usluge;
}