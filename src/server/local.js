"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes_1 = require("@/server/routes");
var swagger_1 = require("@/server/swagger");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuración de Swagger solo en desarrollo
if (process.env.NODE_ENV === 'development') {
    (0, swagger_1.initSwagger)(app);
}
(0, routes_1.setupRoutes)(app);
var port = 3000;
app.listen(3000, function () {
    console.log("\uD83D\uDE80 Servidor Express en http://localhost:".concat(port));
    console.log("\uD83D\uDCDA Docs Swagger en http://localhost:".concat(port, "/docs"));
});
