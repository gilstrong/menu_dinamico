let paginaActual = 0;
const paginas = document.querySelectorAll(".page");
paginas[paginaActual].classList.add("active");

// Datos (JSON)
let registro = {
    persona: {},
    familiares: [],
    condiciones: [],
    internamientos: []
};

// Navegación
document.querySelectorAll(".next").forEach(btn =>
    btn.addEventListener("click", () => cambiarPagina(1))
);
document.querySelectorAll(".back").forEach(btn =>
    btn.addEventListener("click", () => cambiarPagina(-1))
);

function cambiarPagina(dir) {
    paginas[paginaActual].classList.remove("active");
    paginaActual += dir;
    paginas[paginaActual].classList.add("active");

    if (paginaActual === 4) mostrarResumen();
}

// Página 1 — Datos Personales
function guardarDatosPersonales() {
    registro.persona = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value
    };
}
document.querySelector("#page1 .next").onclick = () => {
    guardarDatosPersonales();
    cambiarPagina(1);
};

// Página 2 — Agregar familiares
document.getElementById("add-familiar").onclick = () => {
    let fam = {
        nombre: document.getElementById("fam-nombre").value,
        parentesco: document.getElementById("fam-parentesco").value,
        edad: document.getElementById("fam-edad").value
    };
    registro.familiares.push(fam);
    mostrarFamiliares();
};

function mostrarFamiliares() {
    let cont = document.getElementById("familiares-list");
    cont.innerHTML = "";
    registro.familiares.forEach(f => {
        cont.innerHTML += `<div>${f.nombre} - ${f.parentesco} - ${f.edad}</div>`;
    });
}

// Página 3 — Condiciones
document.getElementById("add-condicion").onclick = () => {
    let con = {
        enfermedad: document.getElementById("cond-enfermedad").value,
        tiempo: document.getElementById("cond-tiempo").value
    };
    registro.condiciones.push(con);
    mostrarCondiciones();
};

function mostrarCondiciones() {
    let cont = document.getElementById("condiciones-list");
    cont.innerHTML = "";
    registro.condiciones.forEach(c => {
        cont.innerHTML += `<div>${c.enfermedad} - ${c.tiempo}</div>`;
    });
}

// Página 4 — Internamientos
document.getElementById("add-intern").onclick = () => {
    let intern = {
        fecha: document.getElementById("int-fecha").value,
        centro: document.getElementById("int-centro").value,
        diagnostico: document.getElementById("int-diagnostico").value
    };
    registro.internamientos.push(intern);
    mostrarInternamientos();
};

function mostrarInternamientos() {
    let cont = document.getElementById("intern-list");
    cont.innerHTML = "";
    registro.internamientos.forEach(i => {
        cont.innerHTML += `<div>${i.fecha} - ${i.centro} - ${i.diagnostico}</div>`;
    });
}

// Página 5 — Resumen
function mostrarResumen() {
    document.getElementById("resultado").textContent =
        JSON.stringify(registro, null, 2);
}

// Guardar (simulación AJAX)
document.getElementById("btn-grabar").onclick = () => {
    console.log("ENVIANDO VIA AJAX...");
    console.log(JSON.stringify(registro));

    alert("Registro guardado correctamente");
};

