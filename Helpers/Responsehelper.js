const responseCode = require('./Responsecode'); //Resonse code
const responseMessage = require('./ResponseMessage'); //Resonse code

class Responsehelper {

    /**
     * @DESC : Return Response JSON
     * @prams:  String / Int / array
     * @return array/json 
     */

    out(req, res, statusCode, resultData = false, collectionFlag = false) {

        switch (statusCode) {

            case responseCode.HTTP_UNAUTHORIZED:

                res.status(statusCode).json({
                    message: responseMessage.UNAUTHORIZED_USER
                });
                break;

            case responseCode.HTTP_INTERNAL_SERVER_ERROR:

                const exceptionLogs = { "statuscode": responseCode.HTTP_INTERNAL_SERVER_ERROR, "requestPayload": req.query,"ERROR_MESSAGE": resultData.message, "requestTimeIST": new Date().toString() };
                req.log.warn(exceptionLogs);
                res.status(statusCode).send({ error_code: responseCode.HTTP_INTERNAL_SERVER_ERROR, error_msg: responseMessage.INTERNAL_SERVER_ERROR });
                
                break;

            case responseCode.HTTP_NOT_FOUND:

            
                res.status(responseCode.HTTP_OK).send({});
                break;

            case responseCode.ERR_CONNECTION_RESET:
                const codeLogs = { "statuscode": responseCode.ERR_CONNECTION_RESET, "requestPayload": req.query, "SOLRDETAILS": req.solrinfo ? req.solrinfo : "", "REDISDETAILS": req.redisinfo ? req.redisinfo : "", "ERROR_MESSAGE": resultData.message, "ERROR": resultData.stack, "retriesLeft": resultData.retriesLeft !== undefined ? resultData.retriesLeft : "No retries attempted", "attemptNumber": resultData.attemptNumber !== undefined ? resultData.attemptNumber : "No retries attempted", "requestTimeIST": new Date().toString() };
                req.log.warn(codeLogs);
                res.status(statusCode).send({ error_code: responseCode.ERR_CONNECTION_RESET, error_msg: responseMessage.DATA_NOT_FOUND });
                break;

            case responseCode.HTTP_BAD_REQUEST:

                res.status(statusCode).send({
                    message: responseMessage.REQUIRED_FIELDS_MISSING,
                    fields: resultData
                });
                break;

            case responseCode.HTTP_MULTIPLE_CHOICES:

                res.status(statusCode).json({
                    message: resultData
                });
                break;

            case responseCode.HTTP_NOT_MODIFIED:

                res.status(statusCode).send();
                break;


            case responseCode.HTTP_OK:
                if (req.method == 'OPTIONS')
                    res.status(statusCode).send()
                else {
                    const responseData = collectionFlag ? { ...resultData[0] } : resultData;
                    res.header('Edge-Cache-Tag', req.edgeCacheTag);
                    // res.header('ETag', "W/\"" + responseData.etag + "\"");
                    res.header('ETag', `"${responseData.etag}"`);
                    delete responseData.etag; //Remove Actual etag from resposne body[Etag=solrversion]                    
                    res.status(statusCode).send(responseData);
                }
                break;

            case responseCode.HTTP_NO_CONTENT:
                
                res.status(statusCode).send();
                break;

            default:

                if (typeof resultData === 'object' && resultData && (resultData.message || resultData.data)) { /*with data or messgae */
                    res.status(statusCode).send(resultData);

                } else if (typeof resultData === 'object' && resultData) { /*only object without data prop*/
                    res.status(statusCode).send({
                        data: resultData
                    });

                } else { /*only string */
                    res.status(statusCode).send({
                        message: resultData != null ? resultData : 'success'
                    });

                }
        }


    }

    /**
     * @DESC : Authendication - Exception handler
     * @params : String / Int /Array
     * @return : array/json
     */
    authendication(req, res, statusCode) {
        switch (statusCode) {
            case responseCode.HTTP_UNAUTHORIZED:
                res.status(statusCode).send({ error_code: responseCode.HTTP_UNAUTHORIZED, error_msg: responseMessage.AUTH_TOKEN_MISSING });
                break;

            case responseCode.HTTP_BAD_REQUEST:
                res.status(statusCode).send({ error_code: responseCode.HTTP_UNAUTHORIZED, error_msg: responseMessage.AUTH_TOKEN_MISSING });
                break;

            case responseCode.HTTP_UNPROCESSABLE_ENTITY:
                res.status(statusCode).send({ error_code: responseCode.HTTP_UNAUTHORIZED, error_msg: responseMessage.AUTH_TOKEN_MISSING });
                break;

            default:
                res.status(statusCode).send({ error_code: responseCode.HTTP_UNAUTHORIZED, error_msg: responseMessage.AUTH_TOKEN_MISSING });
                break;
        }
    }

}




Responsehelper = new Responsehelper();
module.exports = Responsehelper;