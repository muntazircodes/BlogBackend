const sendSuccessResponse = (res, data, message = 'Request was successful') => {
    return res.status(200).json({
      status: 'success',
      message,
      data,
    });
  };
  
const sendErrorResponse = (res, error, message = 'Something went wrong') => {
    return res.status(500).json({
        status: 'error',
        message,
        error,
    });
  };

const notFound = (res, message = 'Resource not found') => {
    return res.status(404).json({
        status: 'error',
        message,
    });
  };

const badRequest = (res, message = 'Bad request') => {
    return res.status(400).json({
        status: 'error',
        message,
    });
  };

const unauthorized = (res, message = 'Unauthorized') => {
    return res.status(401).json({
        status: 'error',
        message,
    });
  };

  module.exports = {
    notFound,
    badRequest,
    unauthorized,
    sendSuccessResponse,
    sendErrorResponse,
  };
  