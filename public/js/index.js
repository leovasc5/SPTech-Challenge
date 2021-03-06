function getHistory(){
    fetch("/usuarios/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ra: sessionStorage.ra
        })
    }).then(function (resposta) {        
        if (resposta.ok) {
            resposta.json().then(json => {
                if (!(JSON.stringify(json)=='[]')){
                    fieldNames = Object.keys(json[0]);
                
                    for(let i = 0; i <= Object.keys(json[0]).length-1; i++){
                        sessionStorage[fieldNames[i]] = json[0][fieldNames[i]];
                        pass = true;
                    }
                }else{
                    return renderizarWindowNovo();
                }
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

    fetch("/usuarios/rankingPosition", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ra: sessionStorage.ra
        })
    }).then(function (resposta) {        
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.posicao = json;
                renderizarWindowTentativa();
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

if(sessionStorage.semestre == 1){
    getHistory();
}else{
    renderizarWait();
}

function renderizarWait(){
    aviso = document.createElement('div');
    aviso.setAttribute('class', 'aviso');

    avisoSpan = document.createElement('span');
    avisoSpan.innerHTML = 'Infelizmente o SPTech Challenge ainda não está disponível para a sua turma :('

    avisoBtn = document.createElement('button');
    avisoBtn.setAttribute("onclick", "window.location = '../'");
    avisoBtn.setAttribute('class', 'startButton');
    avisoBtn.textContent = 'Sair';

    aviso.appendChild(avisoSpan);
    aviso.appendChild(avisoBtn);
    janela.setAttribute('class', 'janelaNova');
    janela.appendChild(aviso);

}

function renderizarWindowTentativa(){
    newJanelaA = document.createElement('div');
    newJanelaA.setAttribute('class', 'newJanelaA');
                
    newJanelaAContainer = document.createElement('div');
    newJanelaAContainer.setAttribute('class', 'newJanelaAContainer');
        
    newJanelaB = document.createElement('div');
    newJanelaB.setAttribute('class', 'newJanelaB');
                
    newJanelaBContainer = document.createElement('div');
    newJanelaBContainer.setAttribute('class', 'newJanelaBContainer');
        
    newJanelaAh2 = document.createElement('div');
    newJanelaAh2.setAttribute('class', 'janelaAh2');
    newJanelaAh2.innerHTML = "Melhor Tentativa";
        
    newJanelaACanvas = document.createElement('canvas');
    newJanelaACanvas.setAttribute('id', 'graficoTentativa');
        
    newJanelaBNovaTentativa = document.createElement('button');
    newJanelaBNovaTentativa.setAttribute('onclick', 'start()');
    newJanelaBNovaTentativa.setAttribute('class', 'startButton');
    newJanelaBNovaTentativa.textContent = 'Iniciar Nova Tentativa';
        
    newKpis = document.createElement('div');
    newKpis.setAttribute('class', 'newKpis');
        
    newKpi1 = document.createElement('div');
    newKpi1.setAttribute('class', 'kpi');
    newKpi1.innerHTML = `<span id='kpiTitle'>Quantidade de Tentativas</span>
    <span id='kpiData'>${sessionStorage.qtdTentativas}</span>`;
        
    newKpi2 = document.createElement('div');
    newKpi2.setAttribute('class', 'kpi');
    newKpi2.innerHTML = `<span id='kpiTitle'>Maior Pontuação</span>
    <span id='kpiData'>${String(sessionStorage.pontosTentativa).replace(/\d(?=(?:\d{3})+$)/g, '$&.')}</span>`;
        
    newKpi3 = document.createElement('div');
    newKpi3.setAttribute('class', 'kpi');
    newKpi3.innerHTML = `<span id='kpiTitle'>Posição Global</span>
    <span id='kpiData'>${sessionStorage.posicao}º</span>`;

    newJanelaBContainerSaida = document.createElement('div');
    newJanelaBContainerSaida.setAttribute('class', 'newJanelaBContainer');

    newJanelaBSaida = document.createElement('button');
    newJanelaBSaida.setAttribute("onclick", "window.location.href = '../'");
    newJanelaBSaida.setAttribute('class', 'exitButton');
    newJanelaBSaida.textContent = 'Sair';
                
    janela.appendChild(newJanelaA);
    janela.appendChild(newJanelaB);
    
    newJanelaA.appendChild(newJanelaAh2);
    newJanelaA.appendChild(newJanelaAContainer);
    newJanelaB.appendChild(newJanelaBContainer);
    newJanelaBContainer.appendChild(newJanelaBNovaTentativa);
    newJanelaB.appendChild(newKpis);
    newJanelaB.appendChild(newJanelaBContainerSaida);
    newJanelaBContainerSaida.appendChild(newJanelaBSaida);

    newJanelaAContainer.appendChild(newJanelaACanvas);
    newKpis.appendChild(newKpi1);
    newKpis.appendChild(newKpi2);
    newKpis.appendChild(newKpi3);
        
    const data = {
        labels: ['Muito Fáceis', 'Fáceis', 'Médianas', 'Díficeis', 'Muito Díficeis'],
        datasets: [
            {
              label: "",
              fill: true,
              color: '#fff',
              backgroundColor: "rgba(142, 196, 206, 0.8)",
              borderColor: "rgba(31, 43, 69,1)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "transparent",
              data: [sessionStorage.lvl1, sessionStorage.lvl2, sessionStorage.lvl3, sessionStorage.lvl4, sessionStorage.lvl5]
            }
        ]
    };
        
    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false
        }
    }
    
    setTimeout(()=>{
        const grafico = new Chart(
            document.getElementById('graficoTentativa'),
            config
        );
    }, 100)
    
}
            
function renderizarWindowNovo(){
    novaTentativa = document.createElement('button');
    novaTentativa.setAttribute('onclick', 'start()');
    novaTentativa.setAttribute('class', 'startButton');
    novaTentativa.textContent = 'Iniciar Nova Tentativa';

    janela.setAttribute('class', 'janelaNova')
    janela.appendChild(novaTentativa);
}