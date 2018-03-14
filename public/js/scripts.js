$(document).ready(() => loadProjects())
$('button').on('click', () => loadPalette());

const generateColors = () => {
  let colorArray = []
  for (let i = 0; i <= 5; i++) {
    colorArray.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  }
  return colorArray;
}

const loadPalette = () => {
  event.preventDefault();
  const colorArray = generateColors();
  $('#color1').css({ "background-color": `${colorArray[0]}` });
  $('#color2').css({ "background-color": `${colorArray[1]}` });
  $('#color3').css({ "background-color": `${colorArray[2]}` });
  $('#color4').css({ "background-color": `${colorArray[3]}` });
  $('#color5').css({ "background-color": `${colorArray[4]}` });
}

const loadProjects = async () => {
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  projects.forEach(project => {
    makeMiniPalette(project.name, project.id, ['#444', '#CCC', '#BBB', '#555', '#EEE']);
    $('select').append(`<option value="${project.name}">${project.name}</option>`)
  })
  

}

const makeMiniPalette = (name, id, colors) => {
  $('#projects').append(`
    <article class="mini-palette" id=${id}>
      <p>${name}</p>
      <div style="background-color:${colors[1]};">${colors[1]}</div>
    </article>
  `)
}

const findProjectPalettes = async (id) => {
  const response = await fetch('/api/v1/palettes/project_id/:id');
  const palettes = response.json();
}
