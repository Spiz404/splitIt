

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
    // console.log("req.user", req.user);
//     console.log("req.session", req.sessionID);
//    console.log("cookies", req.cookies); 
   next();
    
}

module.exports = {requestLogger};