export interface Especies {
    id?: string,
    nombre: string,
    estaactivo?: boolean
}

export interface EspeciesResponse {
    items: Especies[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
