export interface Generos {
    id?: string,
    nombre: string
    estaactivo: boolean

}
export interface GenerosResponse {
    items: Generos[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}