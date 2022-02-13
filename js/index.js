import DomFunction from "./DomFunctions.js";
import Request from "./peticion.js";
import identificador from "./identificador.js";
import config from "./config.js";
import { navLi } from "../vistas/nav/li.js";
import load from "./load.js";


const objPeticion = {
    url: config.URL().cvJson,
    doneCallback: hecho,
    errorCallback: fallo,
    responseType: "json"
};



Request(objPeticion);

function hecho(e) {
    Object.entries(e.response.cv.contenido).forEach(element => {
        
        load('nav', 'nav', element );
    })
}


function fallo(e) {
    console.log(e);
}

var d = DomFunction.select("#sections-nav");

let uno = identificador.Get("NOMBRE");
let dos = identificador.Get("NOMBRE");

console.log(uno + "||" + dos);
