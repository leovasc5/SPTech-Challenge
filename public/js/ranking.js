function getRanking(){
    fetch("/usuarios/ranking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {        
        if (resposta.ok) {
            resposta.json().then(json => {
                if (!(JSON.stringify(json)=='[]')){
                    fieldNames = Object.keys(json[0]);
                    fieldNames.pop();
                    for(let k = 0; k < fieldNames.length; k++){
                        if(k != fieldNames.length-1){
                            thRank = document.createElement('th');
                            thRank.textContent = fieldNames[k];
                            trInsert.appendChild(thRank);
                        }
                    }

                    for(let j = 0; j < json.length; j++){
                        newTr = document.createElement('tr');
                        newTd = [];

                        for(var i = 0; i < Object.keys(json[j]).length; i++){
                            newTd[i] = document.createElement('td');

                            if(i == 0){
                                newTd[i].textContent =  (j+1) + 'º';
                            }else if(i == 1){
                                newTd[i].textContent = json[j][fieldNames[i]];
                            }else if(i == 2){
                                newTd[i].textContent = String(json[j][fieldNames[i]]).replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                            }else if(i == 3){
                                newTd[i].textContent = `${json[j][fieldNames[i]]}/${json[j][fieldNames[i+1]]}`;
                            }else if(i == 4){
                                continue;
                            }
                            
                            if(i != (Object.keys(json[j]).length)-1){
                                newTr.appendChild(newTd[i]);
                            }
                        }

                        rankingTable.appendChild(newTr);
                    }
               }
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

getRanking();