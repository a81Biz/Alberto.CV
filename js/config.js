function config(){
    let _self = {};
    
    _self = {
        URL: () => {
            return urls()
        }
    };

    let urls = () =>{
        return {
            "cvJson" : "https://raw.githubusercontent.com/a81Biz/Alberto.CV/master/cv.json"
        }
    }

    return _self;
};

export default config(); 