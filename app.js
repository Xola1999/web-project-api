const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

let webProjects = [
  {
    id: 1,
    title: 'React Game!',
    description: 'Tic tac toe game created using Create React app.',
    URL: 'http://heroku/myapp/game/',
  },
  {
    id: 2,
    title: 'Online store',
    description: 'Online store created with HTML, CSS, and JavaScript.',
    URL: 'https://git.com/myrepos/shop/index',
  },
];

// Get all web projects
app.get('/api', (req, res) => {
  res.json(webProjects);
});

// Add a new web project
app.post('/api', (req, res) => {
  const newProject = req.body;
  newProject.id = webProjects.length + 1;
  webProjects.push(newProject);
  res.status(201).json(newProject);
});

// Delete a web project by ID
app.delete('/api/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  webProjects = webProjects.filter((project) => project.id !== projectId);
  res.sendStatus(204);
});

// Update title or description of a web project by ID
app.put('/api/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const updatedProject = req.body;

  webProjects = webProjects.map((project) =>
    project.id === projectId ? { ...project, ...updatedProject } : project
  );

  res.json(webProjects.find((project) => project.id === projectId));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
