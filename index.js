const express = require('express')
const bodyParser = require('body-parser');

const cases = require('./cases')
const attr = require('./attributes')

const app = express();
const port = process.env.PORT || 8888

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/', (req, res) => {

    console.log(req.body)
    let casetest = {
        "EstiloDeJogo": req.body.EstiloDeJogo,
        "ObjetivoDeJogo": req.body.ObjetivoDeJogo,
        "Dificuldade": req.body.Dificuldade,
        "TipodeDano": req.body.TipodeDano,
        "Prioridade": req.body.Prioridade
    }

    cases.forEach(caso => {
        let somatorio = 0
        for (const att in attr) {
            if (attr.hasOwnProperty(att)) {
                const at = attr[att];
                let res = sim(at.valores[caso[att]], at.valores[casetest[att]], at.peso)
                somatorio += res;
            }
        }
        let percent = (somatorio / getPesoTotal()) * 100
        caso.similaridade = parseInt(percent)
    });

    sort_by_key(cases, 'similaridade')

    res.send(cases)

})

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});

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
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
