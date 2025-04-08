export interface Rol {
  id?: string;
  nombre: string;
  descripcion: string;
  esadministrador?: boolean;
  estaactivo?: boolean;
}

export interface RolResponse {
    items: Rol[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

// {
//     "id": "93748cca-ae69-4f54-8b12-a23966634296",
//     "nombre": "Admin",
//     "descripcion": "string",
//     "esadministrador": true,
//     "estaactivo": true
//   }