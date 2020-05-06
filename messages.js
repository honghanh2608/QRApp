const handleErr = function (res, code, message) {
    res.status(code).json({message: message})
};

const handleSuccess = function(res, code, data) {
   res.status(code).json(data)
};

const generalErr = function(res) {
   handleErr(res, 500, "Something wen't wrong.")
};

const handleGet = function(res, data) {
    res.status(200).json(data)
};

module.exports = {
    handleErr,
    handleSuccess,
    generalErr,
    handleGet
};
