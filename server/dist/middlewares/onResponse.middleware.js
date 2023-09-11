"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onResponse = void 0;
function onResponse(_, res, next) {
    res.onResponse = (result) => {
        res.send(result);
    };
    next();
}
exports.onResponse = onResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25SZXNwb25zZS5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL29uUmVzcG9uc2UubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxTQUFnQixVQUFVLENBQUMsQ0FBVSxFQUFFLEdBQWdCLEVBQUUsSUFBa0I7SUFDekUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBO0lBRUQsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDO0FBTkQsZ0NBTUMifQ==