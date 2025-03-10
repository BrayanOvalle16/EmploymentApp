import { Client } from "./Client";

export class Credit {
  id : number | undefined;
  tipo : string | undefined;
  cantidadSolicitada: string | undefined;
  numeroDeCuotas: string | undefined;
  paymentDate: string | undefined;
  cliente : Client | undefined;
  diaDePago : string | undefined;
}
