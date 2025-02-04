const isEmailValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


const nameValidator = (name) => {
    return /^[a-zA-Z]{2,}$/.test(name);
  
};

const isPasswordStrong = (password) => {
    return /^(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(password);
  };
 
  
module.exports = {
    isEmailValid,
    isPasswordStrong,
    nameValidator,
  };
  