"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destination_controller_1 = require("../controllers/destination.controller");
const router = express_1.default.Router();
router.get('/', destination_controller_1.getDestinations);
router.get('/:id', destination_controller_1.getDestination);
exports.default = router;
