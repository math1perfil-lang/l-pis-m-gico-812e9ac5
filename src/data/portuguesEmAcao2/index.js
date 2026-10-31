"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portuguesEmAcaoGrupos2 = void 0;
const cap1_1 = require("./cap1");
const cap2_1 = require("./cap2");
const cap3_1 = require("./cap3");
const unidade2_1 = require("./unidade2");
// Parte 2 do 9º ano: capítulo 1 (fim), capítulos 2 e 3 da unidade 1 e unidade 2.
// Os grupos continuam a numeração da Parte 1 (que tem 4 grupos): p9-g5, p9-g6…
const FIRST_NUMBER = 5;
const todos = [...cap1_1.cap1Grupos, ...cap2_1.cap2Grupos, ...cap3_1.cap3Grupos, ...unidade2_1.unidade2Grupos];
exports.portuguesEmAcaoGrupos2 = todos.map((g, i) => ({
    ...g,
    id: `p9-g${FIRST_NUMBER + i}`,
    index: FIRST_NUMBER - 1 + i,
}));
