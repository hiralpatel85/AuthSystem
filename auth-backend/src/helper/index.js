 const responseFormat = (status, success, data, message) => ({
  status,
  success,
  data,
  message,
});

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
    responseFormat,validatePassword
}