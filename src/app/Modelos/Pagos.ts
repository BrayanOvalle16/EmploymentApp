import { Credit } from "./Credit";

export class Pagos {
  id : number | undefined;
  cantidad : string | undefined;
  fechaPago: Date | undefined;
  credito: Credit | undefined;
}
