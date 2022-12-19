//Holds all the SQL queries for everything in the api

const viewAllCompanies = "SELECT * FROM companies LIMIT 20";
const viewSingleCompany = "SELECT * FROM companies WHERE uuid = $1"
const createCompany = "INSERT INTO companies(name, description, location, website) VALUES ($1, $2, $3, $4)";


module.exports = {
    viewAllCompanies,
    viewSingleCompany,
    createCompany
}
