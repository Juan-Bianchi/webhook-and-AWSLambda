"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const linear_controller_1 = require("../controller/linear.controller");
exports.router = (0, express_1.Router)();
exports.router.use('/linear', linear_controller_1.linearRouter);
