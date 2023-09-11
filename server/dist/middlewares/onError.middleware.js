"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onError = void 0;
const utils_1 = require("../utils");
function onError(_, res, next) {
    res.onError = (error) => {
        if (!error.status)
            (0, utils_1.logger)('ERROR', 'Internal Server Error', error);
        let body = {
            message: error.status ? error.message : utils_1.ErrorMessage.INTERNAL_SERVER_ERROR,
            errors: error.errors
        };
        if (!utils_1.ObjectUtils.isEmptyObj(error.errors))
            body.errors = error.errors;
        res.status(error.status || 500).send(body);
    };
    next();
}
exports.onError = onError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25FcnJvci5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL29uRXJyb3IubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvQ0FBMEU7QUFFMUUsU0FBZ0IsT0FBTyxDQUFDLENBQVUsRUFBRSxHQUFRLEVBQUUsSUFBa0I7SUFDOUQsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxJQUFBLGNBQU0sRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsSUFBSSxJQUFJLEdBQVE7WUFDZCxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0JBQVksQ0FBQyxxQkFBcUI7WUFDMUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3JCLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUNyRSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQTtJQUNELElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQztBQVhELDBCQVdDIn0=