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
  makeMiniPalette(name);
  

}

const makeMiniPalette = (name, colors) => {
  $('#projects').append(`
    <article>
      <h4>${name}</h4>
      <svg>
        <rect x="10" y="10" width="20" height="20" rx="15" ry="15" fill="#6495ED"/>
        <rect x="10" y="10" width="20" height="20" rx="15" ry="15" fill="#FFFFFF"/>
        <rect x="10" y="10" width="20" height="20" rx="15" ry="15" fill="#CCCCCC"/>
        <rect x="10" y="10" width="20" height="20" rx="15" ry="15" fill="#444444"/>
        <rect x="10" y="10" width="20" height="20" rx="15" ry="15" fill="#111111"/>
      </svg>
    </article>
  `)
}

const findProjectPalettes = (id) => {
  const response = await fetch('/api/v1/palettes/project_id/:id');
  const palettes = response.json();
}
