"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordStrong = exports.nameValidator = exports.isEmailValid = void 0;
const isEmailValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
exports.isEmailValid = isEmailValid;
const nameValidator = (name) => {
    return /^[a-zA-Z]{2,}$/.test(name);
};
exports.nameValidator = nameValidator;
const isPasswordStrong = (password) => {
    return /^(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(password);
};
exports.isPasswordStrong = isPasswordStrong;
