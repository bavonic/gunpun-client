"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEnum = void 0;
const parseEnum = (enumInput, getType = 'KEYS') => {
    const arr = Object.keys(enumInput);
    if (getType === 'KEYS')
        return arr.slice(arr.length / 2, arr.length);
    if (getType === 'VALUES')
        return arr.slice(0, arr.length / 2);
    throw Error('INVALID');
};
exports.parseEnum = parseEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lbnVtLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sU0FBUyxHQUFHLENBQUMsU0FBYyxFQUFFLFVBQTZCLE1BQU0sRUFBRSxFQUFFO0lBQy9FLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsSUFBSSxPQUFPLEtBQUssTUFBTTtRQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckUsSUFBSSxPQUFPLEtBQUssUUFBUTtRQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RCxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUE7QUFMWSxRQUFBLFNBQVMsYUFLckIifQ==