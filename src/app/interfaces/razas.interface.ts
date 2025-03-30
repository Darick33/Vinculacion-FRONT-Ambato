export interface Razas {
    id?: string,
    nombre: string
    estaactivo: boolean

}
export interface RazasResponse {
    items: Razas[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}