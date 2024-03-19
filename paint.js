// Inicialización de variables
let penSize = 5;
let penSizeToggle = 'small'; // Tamaño de rotulador predeterminado
let isDrawing = false;
let isResizing = false;
let resizeStartX, resizeStartY, resizeStartWidth, resizeStartHeight;


function saveCanvas() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'mi_dibujo.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Función para dibujar
function draw(event) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const color = document.getElementById('colorPicker').value;

  if (isDrawing) {
    ctx.beginPath();
    ctx.arc(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, penSize, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  updateCursorPreview(event);
}

// Función para alternar el dibujo
function toggleDrawing(event) {
  if (event.buttons !== 1) return; // Solo si se presiona el botón izquierdo del ratón

  if (isResizing) return; // No dibujar si estamos redimensionando

  isDrawing = !isDrawing;
  draw(event); // Dibuja al principio del trazo
}

// Función para cambiar el tamaño del rotulador
function changePenSize(size) {
  // Cambia el tamaño del rotulador
  penSizeToggle = size;

  // Ajusta el tamaño del rotulador
  switch (size) {
    case 'small':
      penSize = 5;
      break;
    case 'medium':
      penSize = 10;
      break;
    case 'large':
      penSize = 15;
      break;
    case 'extra-large':
      penSize = 20;
      break;
    case 'giant':
      penSize = 25;
      break;
    default:
      penSize = 5; // Tamaño pequeño por defecto
  }
}

// Función para cambiar el color de fondo del lienzo
function changeBackgroundColor() {
  const canvas = document.getElementById('canvas');
  const color = document.getElementById('colorPicker').value;
  canvas.style.backgroundColor = color;
}

// Función para limpiar el lienzo
function clearCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para actualizar la vista previa del cursor
function updateCursorPreview(event) {
  const cursorPreview = document.getElementById('cursorPreview');
  cursorPreview.style.left = `${event.pageX}px`;
  cursorPreview.style.top = `${event.pageY}px`;
}

// Función para iniciar el redimensionamiento del lienzo
function resizeStart(event) {
  isResizing = true;
  const canvas = document.getElementById('canvas');
  resizeStartX = event.clientX;
  resizeStartY = event.clientY;
  resizeStartWidth = canvas.offsetWidth;
  resizeStartHeight = canvas.offsetHeight;
}

// Función para hacer más grande o más pequeño el lienzo
function resize(event) {
  if (!isResizing) return;

  const canvas = document.getElementById('canvas');
  const newWidth = resizeStartWidth + (event.clientX - resizeStartX);
  const newHeight = resizeStartHeight + (event.clientY - resizeStartY);

  canvas.style.width = `${Math.max(newWidth, 100)}px`;
  canvas.style.height = `${Math.max(newHeight, 100)}px`;
}

// Función para detener el redimensionamiento del lienzo
function resizeStop() {
  isResizing = false;
}


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('mousedown', toggleDrawing);
  canvas.addEventListener('mouseup', toggleDrawing);
  canvas.addEventListener('mousemove', draw);

  // Eventos de redimensionamiento del lienzo
  const canvasContainer = document.getElementById('canvasContainer');
  canvasContainer.addEventListener('mousedown', resizeStart);
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', resizeStop);
});


//No se por que cuando pinta no sale donde está el cursor, sino mas a la derecha.