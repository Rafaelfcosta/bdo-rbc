const cases = require('./cases')
const attr = require('./attributes')

let casetest = {
    "EstiloDeJogo": "Distancia",
    "ObjetivoDeJogo": "Grind",
    "Dificuldade": "Alto",
    "TipodeDano": "Multiplos alvos",
    "Prioridade": "Velocidade de Ataque",
  }

let sim = function (at1, at2, peso) {
    console.log(at1, at2);
    return (1 - Math.abs(at1 - at2)) * peso
}

let getPesoTotal = function () {
    let sum = 0
    for (const att in attr) {
        if (attr.hasOwnProperty(att)) {
            const at = attr[att];
            sum += at.peso
        }
    }
    return sum
}

cases.forEach(caso => {
    let somatorio = 0
    for (const att in attr) {
        if (attr.hasOwnProperty(att)) {
            const at = attr[att];
            let res = sim(at.valores[caso[att]], at.valores[casetest[att]], at.peso)
            console.log(caso[att], casetest[att], res)
            somatorio += res;
        }
    }
    let percent = (somatorio / getPesoTotal()) * 100
    console.log(percent.toFixed(2))
    console.log('-----------------')
});