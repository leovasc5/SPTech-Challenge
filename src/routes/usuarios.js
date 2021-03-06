var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.post("/ranking", function (req, res) {
    usuarioController.ranking(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/history", function (req, res) {
    usuarioController.historyUser(req, res);
});

router.post("/rankingPosition", function (req, res) {
    usuarioController.rankingPosition(req, res);
});

router.post("/getMaterias", function (req, res) {
    usuarioController.getMaterias(req, res);
});

router.post("/saveTentativa", function (req, res) {
    usuarioController.saveTentativa(req, res);
});





module.exports = router;