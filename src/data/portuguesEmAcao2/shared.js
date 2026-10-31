"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grupo = exports.withImage = exports.txt = exports.IMG = exports.IMG_LIVRO = exports.IMG_LETRAS = exports.IMG_FLORESTA = exports.IMG_CRIANCAS = exports.read = exports.order = exports.mc = exports.match = exports.fromText = void 0;
const portuguesDivertidoGrupos_1 = require("../portuguesDivertidoGrupos");
var portuguesDivertidoGrupos_2 = require("../portuguesDivertidoGrupos");
Object.defineProperty(exports, "fromText", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.fromText; } });
Object.defineProperty(exports, "match", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.match; } });
Object.defineProperty(exports, "mc", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.mc; } });
Object.defineProperty(exports, "order", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.order; } });
Object.defineProperty(exports, "read", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.read; } });
Object.defineProperty(exports, "IMG_CRIANCAS", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.IMG_CRIANCAS; } });
Object.defineProperty(exports, "IMG_FLORESTA", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.IMG_FLORESTA; } });
Object.defineProperty(exports, "IMG_LETRAS", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.IMG_LETRAS; } });
Object.defineProperty(exports, "IMG_LIVRO", { enumerable: true, get: function () { return portuguesDivertidoGrupos_2.IMG_LIVRO; } });
// Parte 2 do curso "Português em Ação" (9º ano). Ilustrações novas em /public/ilustracoes/portugues9.
exports.IMG = "/ilustracoes/portugues9";
/** Marca várias questões como dependentes de um texto-base já lido. */
const txt = (readingId, ...acts) => acts.map((a) => (0, portuguesDivertidoGrupos_1.fromText)(readingId, a));
exports.txt = txt;
/** Anexa uma ilustração (quadrinho etc.) a uma atividade. */
const withImage = (a, imageUrl, imageCaption) => ({
    ...a,
    imageUrl,
    imageCaption,
});
exports.withImage = withImage;
const PLACEHOLDER_VIDEO = "/videos/alfabetizacao-grupo-1.mp4";
const grupo = (title, videoObjective, videoScript, videoThumbnail, activities) => ({
    title,
    videoTitle: title,
    videoObjective,
    videoScript,
    videoDurationLabel: "3 min",
    videoUrl: PLACEHOLDER_VIDEO,
    videoThumbnail,
    groupCoinsBonus: 10,
    activities,
});
exports.grupo = grupo;
