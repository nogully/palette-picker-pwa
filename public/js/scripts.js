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
  const colorArrays = palettes.reduce( (array, palette) => {
    array = Object.values(Object.keys(palette).filter(key => key.includes('color'))).map(key => palette[key])
    return array;
  }, []);
  console.log(colorArrays)
  $('#projects').append(`
    <article class="mini-palette" id=${id}>
      <p>${name}</p>
    </article>
  `)
  colorArrays.forEach((array) => {
    $('article').append(`
      <div style="background-color:${array[0]};">${array[0]}</div>
      <div style="background-color:${array[1]};">${array[1]}</div>
      <div style="background-color:${array[2]};">${array[2]}</div>
      <div style="background-color:${array[3]};">${array[3]}</div>
      <div style="background-color:${array[4]};">${array[4]}</div>
    `)
  })
  
}

// const innerPalette = (colors) => {
//   return `
//     <div style="background-color:${colors[0]};">${colors[0]}</div>
//     <div style="background-color:${colors[1]};">${colors[1]}</div>
//     <div style="background-color:${colors[2]};">${colors[2]}</div>
//     <div style="background-color:${colors[3]};">${colors[3]}</div>
//     <div style="background-color:${colors[4]};">${colors[4]}</div>
//   `
// }

const getColors = async (id) => {
  const fetched = await fetch(`/api/v1/palettes/${id}/colors`);
  const colors = await fetched.json();
  return colors;
}

const findProjectPalettes = async (id) => {
  const response = await fetch('/api/v1/palettes/project_id/:id');
  const palettes = await response.json();
}
