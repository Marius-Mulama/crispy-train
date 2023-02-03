const createUserWithPass = "INSERT INTO users (email, password) VALUES ($1, crypt($2, gen_salt('md5')))";
const changePassword = "UPDATE users SET password = crypt('$2', gen_salt('md5')) where email = $1";
const createUserWithoutPass = "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)";
const login = "SELECT *, CONCAT(first_name,' ', last_name) AS full_name FROM users WHERE email = $1 AND password = crypt($2, password)";
const checkIfExists = "SELECT * FROM users WHERE email = $1";

module.exports = {
    createUserWithPass,
    createUserWithoutPass,
    login,
    checkIfExists
}