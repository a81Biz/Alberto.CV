export default function Request({
    url = "",
    method = "GET",
    async = true,
    doneCallback = () => { },
    errorCallback = () => { },
    progressCallback = () => { },
    responseType = "text",
    data = null
}) {

    var req = new XMLHttpRequest();

    req.addEventListener('loadstart', progressCallback);
    req.addEventListener('load', progressCallback);
    req.addEventListener('loadend', progressCallback);
    req.addEventListener('progress', progressCallback);
    req.addEventListener('error', progressCallback);
    req.addEventListener('abort', progressCallback);
    req.responseType = responseType
    
    req.onload = (load) => doneCallback(load.currentTarget);
    req.onerror = () => errorCallback("Error en la petición, revise la URL");
    req.onprogress = (progress) => progressCallback(progress);
    req.open(method, url, async);
    req.send(data);
};