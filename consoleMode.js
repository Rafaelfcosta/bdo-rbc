const cases = require('./cases')
const attr = require('./attributes')


let casetest = {
    "EstiloDeJogo": "Corpo-a-corpo",
    "ObjetivoDeJogo": "PVP",
    "Dificuldade": "Baixo",
    "TipodeDano": "Alvo unico",
    "Prioridade": "Dano"
  }

let sim = function (at1, at2, peso) {
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

function sort_by_key(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
cases.forEach(caso => {
    let somatorio = 0
    for (const att in attr) {
        if (attr.hasOwnProperty(att)) {
            const at = attr[att];
            let res = sim(at.valores[caso[att]], at.valores[casetest[att]], at.peso)
            // console.log(caso[att], casetest[att], res)
            somatorio += res;
        }
    }
    let percent = (somatorio / getPesoTotal()) * 100
    caso.similaridade = parseFloat(percent.toFixed(2))
});

sort_by_key(cases, 'similaridade')

console.log(cases)
console.log(casetest)
console.log('\nClasse recomendada:', cases[0].Classe)