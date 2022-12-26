const createUserWithPass = "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, crypt($4, gen_salt('md5')))";
const createUserWithoutPass = "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3)";
const login = "SELECT *, CONCAT(first_name,' ', last_name) AS full_name FROM users WHERE email = $1 AND password = crypt($2, password)";

module.exports = {
    createUserWithPass,
    createUserWithoutPass,
    login
}