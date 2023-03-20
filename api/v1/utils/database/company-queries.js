//Holds all the SQL queries for everything involving companies in the api

const viewAllCompanies = "SELECT * FROM companies LIMIT 20";
const viewSingleCompany = "SELECT * FROM companies WHERE slug = $1"
const createCompany = "INSERT INTO companies(name, description, location, website, created_by) VALUES ($1, $2, $3, $4, $5)";


module.exports = {
    viewAllCompanies,
    viewSingleCompany,
    createCompany
}
