//throw send the Error in html format, but we want it to show in json format:

/* here i will create custom middleware which will accept req, res and transform it into json format */
const { constants } = require("../constant");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed",
             message: err.message,
             stackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found!",
             message: err.message,
             stackTrace: err.stack
            });

        case constants.UNAUTHORISED:
            res.json({ title: "unAuthorised users are not allowed" ,
                message: err.message,
                stackTrace: err.stack
            });

        case constants.FORBIDDEN:
            res.json({ title: "log in again...",
                message: err.message,
                stackTrace: err.stack
            });

        case constants.SERVER_ERROR:
            res.json({ title: "check your server again",
                message: err.message,
                stackTrace: err.stack
            });

        default:
            console.log("No Error! All good");
            break;
    }        
};

module.exports = errorHandler;