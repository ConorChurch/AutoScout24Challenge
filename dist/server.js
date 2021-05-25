"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const server = index_1.default;
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`App listening on PORT ${port}`));
module.exports = server;
