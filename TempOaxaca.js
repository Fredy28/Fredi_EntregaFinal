const datos = [];
const ctx = document.getElementById("grafico").getContext("2d");
let grafico;

function calcularTemp() {
    const diaSemana = document.getElementById("dia").value;
    const temperatura = parseFloat(document.getElementById("temperatura").value);

    const tablaCont = document.getElementById("tabla-body");
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${diaSemana}</td><td>${temperatura} °C</td>`;
    tablaCont.appendChild(fila);

    datos.push({ dia: diaSemana, temperatura });

    document.getElementById("dia").value = "Lunes";
    document.getElementById("temperatura").value = "";

    //Calcular estadísticas
    const gradosCelcius = datos.map(dato => dato.temperatura);

    const tempProm = (gradosCelcius.reduce((a, b) => a + b, 0) / gradosCelcius.length).toFixed(2);
    const tempMax = Math.max(...gradosCelcius).toFixed(2);
    const tempMin = Math.min(...gradosCelcius).toFixed(2);

    document.getElementById("promedio").textContent = `Temperatura promedio: ${tempProm} °C`;
    document.getElementById("maxima").textContent = `Temperatura máxima: ${tempMax} °C`;
    document.getElementById("minima").textContent = `Temperatura mínima: ${tempMin} °C`;

    //Gráfico
    const dias = datos.map(dato => dato.dia);

    if (grafico) {
        grafico.destroy(); //Destruir el gráfico anterior si existe
    }

    grafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: dias,
            datasets: [{
                label: "Temperatura (°C)",
                data: gradosCelcius,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};