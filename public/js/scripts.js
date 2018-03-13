$(document).ready(() => loadProjects())
$('button').on('click', () => loadPalette());

const generateColors = () => {
  let colorArray = []
  for (let i = 0; i <= 5; i++) {
    colorArray.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))  
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
  makeMiniPalette(projects[1].name);
  

}

const makeMiniPalette = (name, id, colors) => {
  $('#projects').append(`
    <article>
      <h4>${name}</h4>
      <svg id=${id} xmlns="http://www.w3.org/2000/svg">
        <rect x="00" width="20" height="20" rx="15" ry="15" fill="#6495ED"/>
        <rect x="20" width="20" height="20" rx="15" ry="15" fill="#FFFFFF"/>
        <rect x="40" width="20" height="20" rx="15" ry="15" fill="#CCCCCC"/>
        <rect x="60" width="20" height="20" rx="15" ry="15" fill="#444444"/>
        <rect x="80" width="20" height="20" rx="15" ry="15" fill="#111111"/>
      </svg>
    </article>
  `)
}

const findProjectPalettes = async (id) => {
  const response = await fetch('/api/v1/palettes/project_id/:id');
  const palettes = response.json();
}
