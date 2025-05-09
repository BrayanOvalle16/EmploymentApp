import { Client } from "./Client";
import { OfertaTrabajo } from "./OfertaTrabajo";

export interface Aplicacion {
    id: number;
    cliente: Client;
    oferta: OfertaTrabajo;
    fechaAplicacion: Date;
  }
  