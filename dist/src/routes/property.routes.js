"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("../controllers/property.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', property_controller_1.getProperties);
router.get('/search', property_controller_1.searchProperties);
router.get('/:id', property_controller_1.getProperty);
router.post('/', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('host', 'admin'), property_controller_1.createProperty);
router.put('/:id', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('host', 'admin'), property_controller_1.updateProperty);
router.delete('/:id', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('host', 'admin'), property_controller_1.deleteProperty);
exports.default = router;
