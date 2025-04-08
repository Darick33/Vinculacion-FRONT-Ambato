export interface Adopcion {
  id?: number;
  idmascota: string;
  idtramite: string;
  estaActivo?: boolean;
}

export interface AdopcionesResponse {
    items: Adopcion[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }
