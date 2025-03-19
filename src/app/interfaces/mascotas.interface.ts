export interface Mascotas{
    id?: string,
    nombre: string,
    edad: number,
    caracter: string,
    detalles: string,
    idgenero: string,
    idespecie: string,
    idraza: string,
    estaactivo?: boolean

}
export interface MascotasResponse {
    items: Mascotas[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }


export interface generos{
    id: string,
    nombre: string
    estaactivo: boolean

}
export interface generosResponse {
    items: generos[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }

export interface especies{
    id: string,
    nombre: string
    estaactivo: boolean

}
export interface especiesResponse {
    items: especies[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }
export interface raza{
    id: string,
    nombre: string
    estaactivo: boolean

}
export interface razaResponse {
    items: raza[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  }

//  "id": "a3ed671e-e02c-461f-a447-f67ed761cc99",
//       "nombre": "macho",
//       "estaactivo": true