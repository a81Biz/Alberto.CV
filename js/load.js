import identificador from "./identificador.js";
import DomFunction from "./DomFunctions.js";

export default function load(url, element, data = []) {
    var laUrl = './vistas/nav/li.html';
    var req = new XMLHttpRequest();
    req.open("GET", laUrl, false);
    req.send(null);
    let id = identificador.Get(data[0]);
    let liNav = [];
    liNav[0] = req.responseText.replace('{{sectionId}}', id).replace('{{index}}', data.indexOf(data[0])).replace('{{titulo}}', data[0]).replace('{{sectionId}}', id);
    let i = 0;
    for (const property in data[1]) {
        i++

        let _id = identificador.Get(property);

        liNav.push(req.responseText.replace('{{sectionId}}', _id).replace('{{index}}', i).replace('{{titulo}}', property).replace('{{sectionId}}', _id));

    };

   

    if (liNav) {
        var olUrl = './vistas/nav/ul.html';
        var reqOl = new XMLHttpRequest();
        reqOl.open("GET", olUrl, false);
        reqOl.send(null);

        var ul = reqOl.responseText.replace('{{listaLi}}', liNav.join(' '));

        let nav = DomFunction.select("nav");

        nav[0].innerHTML = ul;

        console.log(ul)
    }

   let top = DomFunction.select('#'+id);
   top.classList.add("active");
}