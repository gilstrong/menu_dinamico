// script.js
// Estructura del menú con varios niveles (ejemplo completo)
const menuData = [
  { texto: "Inicio" },
  {
    texto: "Productos",
    submenu: [
      {
        texto: "Laptops",
        submenu: [
          {
            texto: "Gaming",
            submenu: [
              { texto: "NVIDIA RTX" },
              { texto: "AMD RX" }
            ]
          },
          {
            texto: "Oficina",
            submenu: [
              { texto: "Ultrabooks" },
              { texto: "Convertibles" }
            ]
          },
          { texto: "Gama media" }
        ]
      },
      {
        texto: "Celulares",
        submenu: [
          { texto: "Android" },
          { texto: "iOS" }
        ]
      },
      {
        texto: "Accesorios",
        submenu: [
          {
            texto: "Audio",
            submenu: [
              { texto: "Auriculares" },
              { texto: "Bocinas" }
            ]
          },
          {
            texto: "Cables",
            submenu: [
              { texto: "USB-C" },
              { texto: "Lightning" },
              { texto: "HDMI" }
            ]
          },
          { texto: "Fundas" }
        ]
      }
    ]
  },
  {
    texto: "Servicios",
    submenu: [
      { texto: "Reparaciones" },
      { texto: "Instalaciones" }
    ]
  },
  { texto: "Contacto" }
];


// Función recursiva que crea el menú en cualquier nivel
function crearMenu(data) {
  const ul = document.createElement("ul");

  data.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("menu-item");

    // Contenedor para texto (para evitar que la flecha y texto se mezclen)
    const textoSpan = document.createElement("span");
    textoSpan.className = "menu-text";
    textoSpan.textContent = item.texto;
    li.appendChild(textoSpan);

    // Si tiene submenú, creamos flecha y el sub-ul recursivamente
    if (item.submenu && Array.isArray(item.submenu)) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "▶"; // símbolo de flecha
      li.appendChild(arrow);

      const subUl = crearMenu(item.submenu); // recursividad
      subUl.classList.add("submenu"); // clase para estilos y control
      // por defecto subUl está oculto por CSS (max-height:0)

      // Evento para abrir/cerrar este submenú solamente
      // Usamos stopPropagation para que el click no active los padres
      li.addEventListener("click", (evt) => {
        evt.stopPropagation();
        const isVisible = subUl.classList.toggle("visible");
        arrow.classList.toggle("open", isVisible);
      });

      ul.appendChild(li);
      ul.appendChild(subUl);
    } else {
      // Item sin submenú: puedes añadir comportamiento (ej. navegación) aquí
      li.addEventListener("click", (evt) => {
        evt.stopPropagation();
        // Por ejemplo, mostrar en consola qué item se hizo clic
        console.log("Has seleccionado:", item.texto);
        // Si quieres redirigir: window.location.href = '...';
      });

      ul.appendChild(li);
    }
  });

  return ul;
}


// Insertar el menú dentro de <div id="menu"> (tu HTML)
const menuContenedor = document.getElementById("menu");
menuContenedor.innerHTML = ""; // limpiar si hay algo
menuContenedor.appendChild(crearMenu(menuData));
