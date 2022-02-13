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
            _contact = _nav ? _pageData.contenedorContact(cv.personales) : false,
            _rrss = _contact ? _pageData.contenedorRedes(cv.redesSociales) : false,
            _experiencia = _index ? _pageData.contenedorExperiencia(cv.contenido.Alberto) : false;

        _main;
        _index;
        _rrss;
        _experiencia;

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
        contenedorIndex: (content) => {
            return index(content);
        },
        contenedorContact: (content) => {
            return contact(content);
        },
        contenedorRedes: (content) => {
            return redes(content);
        },
        contenedorExperiencia: (content)=>{
            return laboral(content);
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
                li.classList.add(_id);
                ul[0].appendChild(li);
                listaMenulineal(_id, element[1]);
            }
        });

        return true;
    }

    let contact = (data) => {
        let ul = document.getElementsByClassName("menuLineal"),
        nav = document.getElementsByTagName("nav");
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

            if (element[0] == "Ciudad") {
                let div = document.createElement("div"),
                p = document.createElement("p");

                div.classList.add("ciudad");
                p.innerHTML = element[1];
                nav[0].appendChild(div).appendChild(p);
            }
        });

        return true;
    }

    let listaMenulineal = (id, object) => {
        let createUl = document.createElement("ul"),
            ul = document.getElementsByClassName(id)[0].appendChild(createUl);

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
            li.classList.add(_id);
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
        div.id = Id.Get(element[0]);

        Object.entries(element[1]).forEach(e => {
            div = document.createElement("div");
            container[0].appendChild(div);
            div.classList.add("content");
            div.id = Id.Get(e[0]);
        })
        return true;
    }
    let redes = (data) => {

        let rrss = document.getElementsByClassName("redes"),
            ul = document.createElement("ul");

        rrss[0].appendChild(ul);
        Object.entries(data).forEach(element => {
            let li = document.createElement("li"),
                a = document.createElement('a'),
                p = document.createElement("p");

            p.innerHTML = element[0];
            p.classList.add(element[0]);
            a.appendChild(p);
            a.href = element[1];
            li.appendChild(a);
            rrss[0].getElementsByTagName('ul')[0].appendChild(li);
        });

        return true;
    }

    let index = (content) => {
        let div = document.getElementsByClassName("textoDerecha"),
        pMe = document.createElement("p"),
        pName = document.createElement("h1");
        div[0].appendChild(pName);
        div[0].appendChild(pMe);
        pName.innerHTML = content.personales.NombreCompleto;
        pMe.innerHTML = content.personales['Acerca de mi'];

        return true;
    }

    let laboral = (content) =>{
        let _id = Id.Get("Experiencia laboral"),
        divLaboral = document.getElementById(_id);
        

        Object.entries(content["Experiencia laboral"]).forEach(element => {
            divEmpresa = document.createElement("div");
            let div = divLaboral.appendChild(divEmpresa);
            div.appendChild(nombreEmpresa(element[1]));
            div.appendChild(referEmpresa(element[1]));
        })
        return true;
    }
    let nombreEmpresa = (content) =>{
            let pEmpresa = document.createElement("p"),
            spanEmpresa = document.createElement("span");

            pEmpresa.classList.add("pEmpresa");
            spanEmpresa.classList.add("spanEmpresa");

            spanEmpresa.textContent = content.F_Inicio + " - " + content.F_Fin;

            pEmpresa.appendChild(spanEmpresa);
            spanEmpresa.after(content.Empresa);

            return pEmpresa;
    }
    let referEmpresa = (content) =>{
        let pRefer = document.createElement("p"),
            spanCiudad = document.createElement("span"),
            spanGiro = document.createElement("span"),
            spanCargo = document.createElement("span");

            pRefer.classList.add("pRefer");
            spanCiudad.classList.add("spanCiudad");
            spanGiro.classList.add("spanGiro");
            spanCargo.classList.add("spanCargo");

            spanCiudad.textContent = content.Ciudad;
            spanGiro.textContent = content.Giro;
            spanCargo.textContent = content.Cargo;

            pRefer.appendChild(spanCiudad);
            pRefer.appendChild(spanGiro);
            pRefer.appendChild(spanCargo);

            return pRefer;

    }

    return _self;
};

const pageSection = (section) => {

    const getSecciones = (section) => {
        let isNav = _ => {

            let nav = document.getElementsByTagName("nav"),
                ul = document.createElement("ul");
            ul.classList.add("menuLineal");
            nav[0].appendChild(ul);

            return true;
        },
            isMain = _ => {

                let main = document.getElementsByTagName("main");
                main[0].classList.add("container");

                return true;
            },
            isIndex = _ => {

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
                default: _ => {
                    return false
                }
            };

        return (secciones[section] || secciones.default)();
    }

    return getSecciones(section);
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

