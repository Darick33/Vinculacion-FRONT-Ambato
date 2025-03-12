export interface Configuracion {
    id?: string;
    nombre: string;
    colorPagina: string;
    urlLogo?: string;
    ubicacion: string;
    quienesSomos: string;
    mision: string;
    vision: string;
    colorPrincipal: string;
    colorSecundario: string;
    idArchivoLogo?: string;
    estaActivo?: boolean;
  }
  export interface ConfiguracionApiResponse {
    items: Configuracion[];
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
  }

//   {
//     "id": "123",
//     "nombre": "Rescate Animal Asociation",
//     "urlLogo": "https://www.bing.com/images/search?view=detailV2&ccid=4NYwk09a&id=988563F1F6B92B77E156F4DAFBD22B85F8FC9E62&thid=OIP.4NYwk09aSGO_UoL_-khzhQHaDJ&mediaurl=https%3a%2f%2fgcdn.emol.cl%2fproteccion-animal%2ffiles%2f2018%2f05%2f1503695580_perro-1336.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e0d630934f5a4863bf5282fffa487385%3frik%3dYp78%252bIUr0vva9A%26pid%3dImgRaw%26r%3d0&exph=567&expw=1336&q=recate+animal&simid=608010908778505183&FORM=IRPRST&ck=386B31F10168C9EDD5E1748E2EFE424D&selectedIndex=0&itb=0&ajaxhist=0&ajaxserp=0",
//     "ubicacion": "Ambato",
//     "quienesSomos": "Somos una fundación dedicada al rescate, rehabilitación y adopción de animales en situación de calle o maltrato.",
//     "mision": "Brindar atención médica, refugio y encontrar hogares amorosos para animales rescatados.",
//     "vision": "Crear un mundo donde ningún animal sufra abandono o maltrato, promoviendo la tenencia responsable.",
//     "colorPrincipal": "#ff0000",
//     "colorPagina": "#ffffff",
//     "colorSecundario": "#000000",
//     "estaActivo": true
// }

