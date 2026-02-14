"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.protect, booking_controller_1.getBookings);
router.get('/:id', auth_middleware_1.protect, booking_controller_1.getBooking);
router.post('/', auth_middleware_1.protect, booking_controller_1.createBooking);
router.put('/:id', auth_middleware_1.protect, booking_controller_1.updateBooking);
router.delete('/:id', auth_middleware_1.protect, booking_controller_1.deleteBooking);
router.get('/property/:id/availability', booking_controller_1.checkAvailability);
exports.default = router;
