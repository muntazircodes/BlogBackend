"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.badRequest = exports.notFound = exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, data, message = "Request was successful") => {
    return res.status(200).json({
        status: "success",
        message,
        data,
    });
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, error, message = "Something went wrong") => {
    return res.status(500).json({
        status: "error",
        message,
        error,
    });
};
exports.sendErrorResponse = sendErrorResponse;
const notFound = (res, message = "Resource not found") => {
    return res.status(404).json({
        status: "error",
        message,
    });
};
exports.notFound = notFound;
const badRequest = (res, message = "Bad request") => {
    return res.status(400).json({
        status: "error",
        message,
    });
};
exports.badRequest = badRequest;
const unauthorized = (res, message = "Unauthorized") => {
    return res.status(401).json({
        status: "error",
        message,
    });
};
exports.unauthorized = unauthorized;
