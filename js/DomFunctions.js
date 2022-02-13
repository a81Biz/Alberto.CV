
const getSecciones = (section, name) => {

    let _name = name.split(/[.#]/)[1];

    let isId = _ => document.getElementById(_name);
    let isClass = _ => document.getElementsByClassName(_name);
    let isDefault = _ => document.getElementsByTagName(section);
    let isQuery = _ => document.querySelector(name);
    let secciones = {
            '#': isId,
            '.': isClass,
            query: isQuery,
            default: isDefault
        };

    return (secciones[section] || secciones.default)();
}

function DomFunction() {
    let _self = {};

    _self = {
        select: (dom) => _select(dom)
    };

    function _select(dom) {

        let d = dom.split(" ").length > 1 ? "query" : dom.charAt(0) == "#" || dom.charAt(0) == "." ? dom.charAt(0) : dom;

        return getSecciones(d, dom);
    }

    return _self;
};

export default DomFunction(); 