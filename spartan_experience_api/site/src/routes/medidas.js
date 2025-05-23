var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarPercentual/:idUsuario", function (req, res) {
    medidaController.buscarPercentual(req, res);
})

router.get("/verificarQuiz/:idUsuario", function (req, res) {
    medidaController.verificarQuiz(req, res);
})


module.exports = router;