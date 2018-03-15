$(document).ready(() => loadProjects())
$('button').on('click', () => loadPalette());
$('.swatch').on('click', '.fas', function () {
  $(this).parent().toggleClass('locked');
  $(this).toggleClass('fa-lock-open').toggleClass('fa-lock');
})

const generateColors = () => {
  let colorArray = [];
  for (let i = 0; i <= 5; i++) {
    colorArray.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  }
  return colorArray;
};

const loadPalette = () => {
  event.preventDefault();
  const colorArray = generateColors();
  const frozenColors = $('.locked').toArray();
  const swatches = $('.swatch').toArray();
  swatches.forEach((swatch, index) => {
    if ( !$(swatch).is('.locked') ) {
      $(swatch).css({ "background-color": `${colorArray[index + 1]}` })
    }
  })
}

const loadProjects = async () => {
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  console.log(projects)
  projects.forEach( project => {
    makeMiniPalette(project.name, project.id);
    $('select').append(`<option value="${project.name}">${project.name}</option>`)
  })
}

const makeMiniPalette = async (name, id) => {
  const fetched = await fetch(`/api/v1/projects/${id}/palettes`);
  const palettes = await fetched.json();
  const arrays = palettes.map(async palette => {
    const colors = await getColors(palette.id);
  })
  $('#projects').append(`
    <article class="mini-palette" id=${id}>
      <p>${name}</p>
      <div style="background-color:#CCC;">#CCC</div>
    </article>
  `)
}

const getColors = async (id) => {
  const fetched = await fetch(`/api/v1/palettes/${id}/colors`);
  const colors = await fetched.json();
  return colors;
}

const findProjectPalettes = async (id) => {
  const response = await fetch('/api/v1/palettes/project_id/:id');
  const palettes = await response.json();
}
