const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000); //environmental var of port in production

app.use(express.static('public'));

app.locals.title = 'Palette Picker';

app.locals.palettes = [
  { id: 12345, 
    name: 'favorite', 
    color1: '#7FB7BE', 
    color2: '#D3F3EE', 
    color3: '#DACC3E', 
    color4: '#BC2C1A', 
    color5: '#7D1538', 
    project_id: 1 }
];

app.locals.projects = [
  { id: 1, name: 'my sweet project'}, 
  { id: 2, name: 'another amazing project'}, 
]

app.get('/api/v1/palettes', (req, res) => {
  const palettes = app.locals.palettes;
  res.send(palettes)
})

app.get('/api/v1/projects', (req, res) => {
  const projects = app.locals.projects;
  res.send(projects)
})

app.get('/api/v1/projects/:id', (req, res) => {

})

app.get('/api/v1/projects/:id/palettes', (req, res) => {
  
})

app.post('/api/v1/palettes', (req, res) => {
  const id = Date.now();
  const { name, colors, project_id } = req.body;
  const palette = Object.assign({}, {id, 
                            name, 
                            color1: palette[0],
                            color2: palette[1], 
                            color3: palette[2], 
                            color4: palette[3], 
                            color5: palette[4],
                            project_id })

  app.locals.palettes.push(palette)
  response.status(201).json({id, name, project_id})
})

app.post('/api/v1/projects', (req, res) => {

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} server running on port 3000`)
});