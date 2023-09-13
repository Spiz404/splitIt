const requestLogger = (req, res, next) => {
    //console.log(req);
    const host = req.headers.host;
    const url = req.url;
    const method = req.method;
    const params = req.params;
    const query = req.query;
    const body = req.body;
    
    let str = `[${method}] FROM ${host}, URL ${url}, PARAMS ${JSON.stringify(params)}, QUERY ${JSON.stringify(query)}, BODY ${JSON.stringify(body)}`;
    console.log(str);
    next();
}

module.exports = {requestLogger};