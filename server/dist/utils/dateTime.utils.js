"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtils = void 0;
class DateTimeUtils {
    static timeToSeconds(time = Date.now()) {
        time = new Date(time);
        return +Math.floor(time.getTime() / 1000).toFixed(0);
    }
    static secondsToTime(time) {
        return new Date(time * 1000);
    }
}
exports.DateTimeUtils = DateTimeUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWUudXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZGF0ZVRpbWUudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBWSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3pDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQVM7UUFDNUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBVEQsc0NBU0MifQ==