"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFromQuery = void 0;
function parseFromQuery(query) {
    let limit = Number(query.limit);
    if (Number.isNaN(limit) || limit <= 0)
        limit = 20;
    let offset = Number(query.offset);
    if (Number.isNaN(offset) || limit <= 0)
        offset = 0;
    return {
        limit,
        offset
    };
}
exports.parseFromQuery = parseFromQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UudXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9kYXRhYmFzZS9kYXRhYmFzZS51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixjQUFjLENBQUMsS0FBb0I7SUFDakQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7UUFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUVuRCxPQUFPO1FBQ0wsS0FBSztRQUNMLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQztBQVZELHdDQVVDIn0=