$(document).ready(() => loadProjects())
$('button').on('click', () => loadPalette());
$('.swatch').on('click', '.fas', function () {
  $(this).parent().toggleClass('locked');
  $(this).toggleClass('fa-lock-open').toggleClass('fa-lock');
})
$('#save-project').on('click', () => saveProject());
$('#save-palette').on('click', () => addPalette());
$('#projects').on('click', '.mini-swatch-wrapper', function () {
  const palette = $(this).attr('array');
  loadSwatches(palette.split(','));
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
      $(swatch).find('p').text(`${colorArray[index + 1]}`)
    }
  })
  $('#new-palette').val('');
}

const loadProjects = async () => {
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  projects.forEach( project => {
    makeMiniPalette(project.id);
    $('select').append(`<option value="${project.id}" id=>${project.name}</option>`)
    $('#projects').append(`
      <article class="mini-palette" id=${project.id}>
        <h3>${project.name}</h3>
      </article>
    `)
  })
}

const makeMiniPalette = async (projectId) => {
  try {
    const fetched = await fetch(`/api/v1/projects/${projectId}/palettes`);
    if (fetched.status === 200) {
      const palettes = await fetched.json();
      const colorArrays = palettes.reduce( (array, palette) => {
        array.push(Object.values(Object.keys(palette).filter(key => key.includes('color'))).map(key => palette[key]))
        return array;
      }, []);
      colorArrays.forEach((array, index) => {
        $(`#${projectId}.mini-palette`).append(`
          <div class="mini-swatch-wrapper" id="${palettes[index].id}" array="${array}">
            <div class="mini-swatch" style="background-color:${array[0]};"></div>
            <div class="mini-swatch" style="background-color:${array[1]};"></div>
            <div class="mini-swatch" style="background-color:${array[2]};"></div>
            <div class="mini-swatch" style="background-color:${array[3]};"></div>
            <div class="mini-swatch" style="background-color:${array[4]};"></div>
            <p>${palettes[index].name}</p>
          </div>
        `)
      })
    } else {
      throw new Error('could not find palettes for that project')
    }
  } catch (error) {
    console.log(error);
  }
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

const saveProject = async () => {
  event.preventDefault();
  const name = $('.project-name').val();
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name }), 
    headers: { 'Content-Type': 'application/json' }
  })
  const projectId = await response.json();
  console.log(projectId)
  reloadProjects();
  $('.project-name').val('');
}

const addPalette = () => {
  event.preventDefault();
  const swatches = $('.swatch').toArray();
  const colors = swatches.map( swatch => {
    const rgbColor = $(swatch).css("background-color");
    return hexMe(rgbColor);
  })
  sendPaletteToDb(colors);
  reloadProjects();
  $('#new-palette').val('');
}

const sendPaletteToDb = async (colors) => {
  const paletteName = $('#new-palette').val();
  const projectId = $('select').val();
  if (paletteName) {
    try {
      const response = await fetch('/api/v1/palettes', {
        method: 'POST', 
        body: JSON.stringify({
          name: paletteName, 
          colors: colors, 
          project_id: projectId
        }), 
        headers: { 'Content-Type': 'application/json'}
      })
      const id = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

const loadSwatches = (array) => { 
  const swatches = $('.swatch').toArray();
  swatches.forEach( (swatch, index) => {
    $(swatch).css({ "background-color": `${array[index]}` });
    $(swatch).find('p').text(`${array[index]}`)
  })
}

const reloadProjects = () => {
 $('select').empty();
 $('#projects').find('article').remove();
 loadProjects();
}

const hexMe = (colorval) => {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
}
