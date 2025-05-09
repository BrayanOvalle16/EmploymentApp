import { Empresa } from './Empresa';

export interface OfertaTrabajo {
  id?: number; // Opcional para creación
  titulo: string;
  descripcion: string;
  requisitos: string;
  salario: number;
  empresa: Empresa;
}
