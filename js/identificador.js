function identificador(){

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

export default identificador(); 