const jwt = require('jsonwebtoken');


class AuthController {
    /**
     * @DESC : Verify users
     * @param : string/int
     * @return : array/json
     */
    verifyuser(req, res, next) {
        try {
            const jwtSecret = process.env.NODE_ENV;
          
                let token = req.headers['authorization'];
                if (token) {

                    return jwt.verify(token, jwtSecret, function (err, payload) {
                        if (err)
                            return response.authendication(req, res, responseCode.HTTP_UNAUTHORIZED);   
                        console.log(payload);
                                            
                        req.userdata = payload;
                        next();
                    });
                }
                return responsehelper.authendication(req, res, responseCode.HTTP_UNAUTHORIZED);           

        } catch (error) {
            logger.error({error:error})
            return responsehelper.authendication(req, res, responseCode.HTTP_UNPROCESSABLE_ENTITY);        
        }
    };

}



const authController = new AuthController();
module.exports = authController;
