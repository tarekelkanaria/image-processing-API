"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../../utilities/resize"));
// Test resizeImage module
describe('Test resize functionality', () => {
    it('Should resize the image', () => {
        return expectAsync((0, resize_1.default)('./assets/images/fjord.jpg', 200, 200, path_1.default.join(__dirname, `../../../thumb/fjord.jpg`))).toBeResolved();
    });
});
