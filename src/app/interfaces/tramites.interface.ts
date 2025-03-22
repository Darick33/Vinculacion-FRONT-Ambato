export interface Tramite {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    contacto: string;
    datos: string;
    fecha: string;
    numerotramite: number;
    direccion: string;
    idtipotramite: string;
    idestadotramite: string;
    estaactivo: boolean;
    tipotramite: {
        id: string;
        nombre: string;
        estaactivo: boolean;
    },
    estadostramite: {
        id: string;
        nombre: string;
        orden: number;
        estaactivo: boolean;
    },
    archivostramites: Array<any>;

}
export interface TramiteResponse {
    items: Tramite[];
    pageNumber: number;
    pageSize: number;

    totalCount: number;
    totalPages: number;

}



// {
//     "id": "5d4bd72e-74c2-464e-9237-8f88f8db76d2",
//     "nombre": "Denuncia habandono de perritos",
//     "apellido": "string",
//     "email": "string",
//     "contacto": "string",
//     "datos": "string",
//     "fecha": "2025-03-14T16:58:51.786489",
//     "numerotramite": 0,
//     "direccion": "string",
//     "idtipotramite": "d1f7e8c9-3b2d-42f1-81a3-f5d2c6a7e9b0",
//     "idestadotramite": "5a6d9b4e-7c2a-44f0-92f1-7e8b5d3c1a2d",
//     "estaactivo": true,
//     "tipotramite": {
//       "id": "d1f7e8c9-3b2d-42f1-81a3-f5d2c6a7e9b0",
//       "nombre": "",
//       "estaactivo": false
//     },
//     "estadostramite": {
//       "id": "5a6d9b4e-7c2a-44f0-92f1-7e8b5d3c1a2d",
//       "nombre": "",
//       "orden": 0,
//       "estaactivo": false
//     },
//     "archivostramites": []
//   }