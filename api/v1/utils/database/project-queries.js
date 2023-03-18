addProject = "INSERT INTO projects (user_id, title, description, link, technologies) VALUES ($1, $2, $3, $4, $5)";

updateProject = "UPDATE projects SET title=$1, description=$2, link=$3, technologies=$4 WHERE id=$5 AND user_id=$6";

deleteProject = "DELETE FROM projects WHERE user_id = $1 and id = $2";

viewProjects = "SELECT * FROM PROJECTS WHERE user_id = $1"

module.exports = {
  addProject,
  updateProject,
  deleteProject,
  viewProjects,
};
