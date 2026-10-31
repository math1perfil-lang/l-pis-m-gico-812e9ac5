"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlfabetizacaoGroups = exports.alfabetizacaoGrupos = void 0;
const portuguesDivertidoGrupos_1 = require("./portuguesDivertidoGrupos");
const portuguesDivertidoGrupos2_1 = require("./portuguesDivertidoGrupos2");
const portuguesDivertidoGrupos3_1 = require("./portuguesDivertidoGrupos3");
const portuguesDivertidoGrupos4_1 = require("./portuguesDivertidoGrupos4");
// Curso "Português Divertido" (id interno: alfabetizacao-divertida).
// Contém apenas os grupos baseados no livro (Parte 1: 1-11; Parte 2: 12-31; Parte 3: 32-47).
// Ver portuguesDivertidoGrupos.ts, ...2.ts e ...3.ts.
exports.alfabetizacaoGrupos = [
    ...portuguesDivertidoGrupos_1.portuguesDivertidoGrupos,
    ...portuguesDivertidoGrupos2_1.portuguesDivertidoGrupos2,
    ...portuguesDivertidoGrupos3_1.portuguesDivertidoGrupos3,
    ...portuguesDivertidoGrupos4_1.portuguesDivertidoGrupos4,
];
const getAlfabetizacaoGroups = () => exports.alfabetizacaoGrupos;
exports.getAlfabetizacaoGroups = getAlfabetizacaoGroups;
