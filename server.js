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
    project: 'awesome'}
];

app.get('/palettes', (req, res) => {
  const palettes = app.locals.palettes;
  res.send(palettes)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} server running on port 3000`)
});