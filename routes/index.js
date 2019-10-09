const express = require('express');
const router = express.Router();

const cases = require('../cases');
const attr = require('../attributes');

router.get('/', (req, res) => {
    res.render('index', {attributes: attr});
});

router.post('/', (req, res) => {
    let testCase = {
        "EstiloDeJogo": req.body.EstiloDeJogo,
        "ObjetivoDeJogo": req.body.ObjetivoDeJogo,
        "Dificuldade": req.body.Dificuldade,
        "TipodeDano": req.body.TipodeDano,
        "Prioridade": req.body.Prioridade
    };

    let weights = {
        "EstiloDeJogo": +req.body.EstiloDeJogo_peso,
        "ObjetivoDeJogo": +req.body.ObjetivoDeJogo_peso,
        "Dificuldade": +req.body.Dificuldade_peso,
        "TipodeDano": +req.body.TipodeDano_peso,
        "Prioridade": +req.body.Prioridade_peso
    };

    cases.forEach(caso => {
        let somatorio = 0.0;
        for (const att in attr) {
            if (attr.hasOwnProperty(att)) {
                const at = attr[att];
                let res = sim(at.valores[testCase[att]], at.valores[caso[att]], weights[att]);
                somatorio += res;
            }
        }

        let percent = (somatorio / getPesoTotal(weights)) * 100.0;

        caso.similaridade = parseFloat(percent).toFixed(2);
    });

    sortByKey(cases, 'similaridade');

    res.render('result', {resultCases: cases, attributes: attr});
});

const sim = (at1, at2, peso) => (1.0 - Math.abs(at2 - at1)) * peso;
const getPesoTotal = (pesos) => Object.values(pesos).reduce((a, b) => a + b, 0.0);
const sortByKey = (array, key) => array.sort((a, b) => b[key] - a[key]);

module.exports = router;