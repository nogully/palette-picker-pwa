$('button').on('click', loadPalette);

function generateColors() {
  let colorArray = []
  for (let i = 0; i <= 5; i++) {
    colorArray.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))  
  }
  return colorArray;
}

function loadPalette() {
  event.preventDefault();
  const colorArray = generateColors();
  console.log(colorArray)
  $('#color1').css({ "background-color": `${colorArray[0]}` });
  $('#color2').css({ "background-color": `${colorArray[1]}` });
  $('#color3').css({ "background-color": `${colorArray[2]}` });
  $('#color4').css({ "background-color": `${colorArray[3]}` });
  $('#color5').css({ "background-color": `${colorArray[4]}` });
}