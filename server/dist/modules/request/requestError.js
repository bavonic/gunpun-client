"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
const utils_1 = require("../../utils");
class RequestError extends Error {
    constructor(error) {
        super(error);
        const responseErrorMessage = utils_1.ObjectUtils.getIn(error, 'response.data.message');
        this.message = responseErrorMessage || 'Unknow error from the system';
        this.status = utils_1.ObjectUtils.getIn(error, 'response.status', 3001);
        // Handle axios error
        if (error.message === "Network Error")
            this.message = 'Unable to connect the system, please check your connection';
        else if (error.response && typeof error.response.data === 'string' && error.response.data)
            this.message = error.response.data;
        // Handle message
        if (this.status === 403 && !this.message)
            this.message = 'Permission denied.';
        // Handle fields error
        const resErrors = utils_1.ObjectUtils.getIn(error, 'response.data.errors', {});
        this.errors = Object.keys(resErrors).reduce((obj, key) => {
            const value = resErrors[key];
            if (Array.isArray(value))
                obj[key] = value[0];
            else
                obj[key] = value.toString();
            return obj;
        }, {});
        this.error = {
            message: this.message,
            errors: this.errors,
            status: this.status
        };
        this.alert = {
            message: this.message,
            type: 'danger',
        };
        this.response = error.response;
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcmVxdWVzdC9yZXF1ZXN0RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQTBDO0FBRTFDLE1BQWEsWUFBYSxTQUFRLEtBQUs7SUFHckMsWUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUViLE1BQU0sb0JBQW9CLEdBQUcsbUJBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsSUFBSSw4QkFBOEIsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRSxxQkFBcUI7UUFDckIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLGVBQWU7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLDREQUE0RCxDQUFDO2FBQzlHLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUk7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRTlILGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBRTlFLHNCQUFzQjtRQUN0QixNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUNwRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVOLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFBO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBdkNELG9DQXVDQyJ9