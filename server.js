const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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
  database('palettes').select()
    .then(palettes => {
      res.status(200).json(palettes);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
})

app.get('/api/v1/palettes/:id', (req, res) => {
  database('palettes').where('id', req.params.id).select()
    .then(palette => {
      if (palette) {
        res.status(200).json(palette)
      } else
      res.status(404).json({
        error: `Could not find palette with id ${req.params.id}`
      })
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

app.get('/api/v1/palettes/:id/colors', (req, res) => {
  database('palettes').where('id', req.params.id).select()
    .then(palette => {
      if (palette) {
        const colors = [ palette[0].color1, 
                         palette[0].color2, 
                         palette[0].color3, 
                         palette[0].color4, 
                         palette[0].color5
                       ]
        res.status(200).json(colors)
      } else
      res.status(404).json({
        error: `Could not find palette with id ${req.params.id}`
      })
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

app.post('/api/v1/palettes', (req, res) => {
  const { name, colors, project_id } = req.body;
  const palette = Object.assign({}, {id, 
                            name, 
                            color1: colors[0],
                            color2: colors[1], 
                            color3: colors[2], 
                            color4: colors[3], 
                            color5: colors[4],
                            project_id })
  app.locals.palettes.push(palette)
  response.status(201).json({id, name, project_id})
})

app.get('/api/v1/projects', (req, res) => {
  const projects = app.locals.projects;
  res.send(projects)
})

app.get('/api/v1/projects/:id', (req, res) => {
  database('projects').where('id', req.params.id).select()
    .then(projects => {
      if (projects.length) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ 
          error: `Could not find project with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

app.get('/api/v1/projects/:id/palettes', (req, res) => {
  
})



app.post('/api/v1/projects', (req, res) => {

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} server running on port ${app.get('port')}`)
});