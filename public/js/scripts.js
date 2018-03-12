$('button').on('click', loadPalette);

function loadPalette() {
  event.preventDefault();
  $('#color1').addAttr('style="background-color:blue;"')
}