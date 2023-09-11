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
exports.PlatformSchema = void 0;
const schema_1 = require("@colyseus/schema");
const game_object_schema_1 = require("./game-object.schema");
class PlatformSchema extends game_object_schema_1.GameObjectSchema {
    constructor(initial) {
        super(initial);
        this.isVisible = true;
    }
}
__decorate([
    (0, schema_1.type)("boolean"),
    __metadata("design:type", Boolean)
], PlatformSchema.prototype, "isVisible", void 0);
exports.PlatformSchema = PlatformSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NjaGVtYXMvcGxhdGZvcm0uc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4Qyw2REFBMEU7QUFFMUUsTUFBYSxjQUFlLFNBQVEscUNBQWdCO0lBR2xELFlBQVksT0FBeUI7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSEEsY0FBUyxHQUFZLElBQUksQ0FBQztJQUkzQyxDQUFDO0NBQ0Y7QUFMa0I7SUFBaEIsSUFBQSxhQUFJLEVBQUMsU0FBUyxDQUFDOztpREFBMkI7QUFEN0Msd0NBTUMifQ==