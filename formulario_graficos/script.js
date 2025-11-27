// Arrays donde guardamos los datos ingresados
let meses = [];
let ventas = [];

document.getElementById("agregarBtn").addEventListener("click", function () {
    let mes = document.getElementById("mes").value;
    let venta = document.getElementById("ventas").value;

    if (mes === "" || venta === "") {
        alert("Debe llenar ambos campos");
        return;
    }

    meses.push(mes);
    ventas.push(Number(venta));

    alert("Dato agregado!");

    document.getElementById("mes").value = "";
    document.getElementById("ventas").value = "";
});

let grafico = null;

document.getElementById("generarBtn").addEventListener("click", function () {

    if (grafico !== null) {
        grafico.destroy();  // Elimina gráfico anterior
    }

    let ctx = document.getElementById("grafico").getContext("2d");

    grafico = new Chart(ctx, {
        type: "bar",  // Puedes cambiar a "line", "pie", etc.
        data: {
            labels: meses,
            datasets: [{
                label: "Ventas por mes",
                data: ventas,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2
            }]
        }
    });
});
