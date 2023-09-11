"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectSchema = void 0;
const schema_1 = require("@colyseus/schema");
class GameObjectSchema extends schema_1.Schema {
    constructor(initial) {
        super();
        this.id = initial.id;
        this.x = initial.x || 0;
        this.y = initial.y || 0;
        this.w = initial.w || 0;
        this.h = initial.h || 0;
    }
}
__decorate([
    (0, schema_1.type)("string"),
    __metadata("design:type", String)
], GameObjectSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], GameObjectSchema.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], GameObjectSchema.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], GameObjectSchema.prototype, "w", void 0);
__decorate([
    (0, schema_1.type)("number"),
    __metadata("design:type", Number)
], GameObjectSchema.prototype, "h", void 0);
exports.GameObjectSchema = GameObjectSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS1vYmplY3Quc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NjaGVtYXMvZ2FtZS1vYmplY3Quc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFnRDtBQVVoRCxNQUFhLGdCQUFpQixTQUFRLGVBQU07SUFPMUMsWUFBWSxPQUF5QjtRQUNuQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQWRpQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7NENBQVk7QUFDWDtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MkNBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MkNBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MkNBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs7MkNBQVc7QUFMNUIsNENBZUMifQ==