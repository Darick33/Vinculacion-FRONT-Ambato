export interface Preguntas {
    id?: string,
    pregunta: string,
    respuesta: string,
    prioridad: number,
    estaactivo: boolean

}
export interface PreguntasResponce{
    items: Preguntas[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;

}