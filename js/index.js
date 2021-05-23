document.addEventListener("DOMContentLoaded", () => {
    const conf = config();
    const _pageData = pageData();
    const _pageSection = pageSection;

    const requestURL = conf.URL().data;

    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.onload = () => {
        page(request.response.cv);


    }
    request.send();

    const page = (cv) => {

        let _nav = _pageSection("nav") ? _pageData.contenidoMenu(cv.contenido) : false,
        _main = _pageSection("main") ? _pageData.contenedoresMain(cv.contenido) : false,
        _index = _pageSection("index") ? _pageData.contenedorIndex(cv) : false,
        _contact = _nav ? _pageData.contenedorContact(cv.personales) : false;

        _main;
        _index;
        _contact;

    };

});

const pageData = (secction) => {
    const Id = identificador()
    let _self = {};

    _self = {
        contenidoMenu: (content) => {
            return menuLineal(content);
        },
        contenedoresMain: (content) => {
            return contenedores(content);
        },
        contenedorIndex : (content) =>{
            return index(content);
        },
        contenedorContact : (content)=>{
            return contact(content);
        }
    };

    let menuLineal = (data) => {

        let ul = document.getElementsByClassName("menuLineal");

        Object.entries(data).forEach(element => {
            let li = document.createElement("li"),
                a = document.createElement('a'),
                p = document.createElement("p"),
                _id = Id.Get(element[0]);

            p.innerHTML = element[1];
            a.appendChild(p);
            a.href = "index.html#" + _id;
            li.appendChild(a);
            ul[0].appendChild(li);

            if (typeof element[1] === "object") {

                p.innerHTML = element[0];
                a.appendChild(p);
                a.href = "index.html#" + _id;
                li.appendChild(a);
                li.id = _id;
                ul[0].appendChild(li);
                listaMenulineal(_id, element[1]);
            }
        });

        return true;
    }

    let contact = (data) => {
        let ul = document.getElementsByClassName("menuLineal");
        Object.entries(data).forEach(element => {
            if (element[0] == "telefono" || element[0] == "Correo") {
    
            let li = document.createElement("li"),
            a = document.createElement('a'),
            p = document.createElement("p");

        p.innerHTML = element[1];
        a.appendChild(p);
        a.href = element[0] !== "Correo"
            ? element[0] !== "telefono"
                ? ""
                : "https://wa.me/" + element[1].replace(/ /g, "")
            : "mailto:" + element[1];
        li.appendChild(a);
        element[0] !== "Correo"
            ? element[0] !== "telefono"
                ? ""
                : li.classList.add("cardContact")
            : li.classList.add("cardContact");
        ul[0].appendChild(li);
            }
        });

        return true;
    }

    let listaMenulineal = (id, object) => {
        let createUl = document.createElement("ul"),
            ul = document.getElementById(id).appendChild(createUl);

        Object.entries(object).forEach(element => {
            let li = document.createElement("li"),
                a = document.createElement('a'),
                p = document.createElement("p"),
                _id = Id.Get(element[0]);

            ul.appendChild(li);
            p.innerHTML = element[0]
            a.appendChild(p);
            a.href = "index.html#" + _id;
            li.appendChild(a);
            li.id = _id;
            ul.appendChild(li);
        });
        return true;
    }
    let contenedores = (object) => {
        let container = document.getElementsByClassName("container"),
            div = document.createElement("div"),
            element = Object.entries(object).shift();

        div.classList.add("content");
        div.classList.add("index");
        container[0].appendChild(div);
        div.id = "#" + Id.Get(element[0]);

        Object.entries(element[1]).forEach(e => {
            div = document.createElement("div");
            container[0].appendChild(div);
            div.classList.add("content");
            div.id = "#" + Id.Get(e[0]);
        })
        return true;
    }

    let index = (content)=>{
        console.log(content);
    }
    return _self;
};

const pageSection = (section) =>{

    const getSecciones =  (section)=> {
        let isNav =  _=>{
            
            let nav = document.getElementsByTagName("nav"),
            ul = document.createElement("ul");
            ul.classList.add("menuLineal");
            nav[0].appendChild(ul);

            return true;
        },
        isMain = _=>{

            let main = document.getElementsByTagName("main");
            main[0].classList.add("container");

            return true;
        },
        isIndex = _=>{

            let index = document.getElementsByClassName("index"),
                redes = document.createElement("div"),
                textoDerecha = document.createElement("div"),
                textoIzquierda = document.createElement("div"),
                logo = document.createElement("div");

            redes.classList.add("redes");
            textoDerecha.classList.add("textoDerecha");
            textoIzquierda.classList.add("textoIzquierda");
            logo.classList.add("logo");

            index[0].appendChild(redes);
            index[0].appendChild(textoDerecha);
            index[0].appendChild(textoIzquierda);
            index[0].appendChild(logo);

            return true
        },
        secciones = {
            nav: isNav,
            main: isMain,
            index: isIndex,
            default : _ =>{
                return false
            }
        };
        
        return   (secciones[section] || secciones.default)();
    }

   return  getSecciones(section);
}



const identificador = () => {

    let _self = {};

    _self = {
        Get: (identificador) => {
            return getId(identificador);
        }
    };

    let getId = (i) => {
        let caracteres = i.split(''),
            num = caracteres.reduce((h, c) => (h = c.charCodeAt(0) + (h << 1) + (h >> 3) - h), 0),
            abs = Math.sign(num),
            id = abs < 0 ? "N" + Math.abs(num) : "P" + num;

        return id;
    }

    return _self;

};

