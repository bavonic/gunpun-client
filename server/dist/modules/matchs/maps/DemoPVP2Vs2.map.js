"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPVP2Vs2 = void 0;
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const player_schema_1 = require("../schemas/player.schema");
class DemoPVP2Vs2 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPVP2Vs2.config;
        return super.onCreate();
    }
    onAuth(client, params) {
        if (!this.metadata.roomName)
            this.setMetadata(Object.assign(Object.assign({}, this.metadata), { roomName: (params === null || params === void 0 ? void 0 : params.roomName) || 'Room', mode: matchs_types_1.MapMode.DEMO_PVP }));
        return super.onAuth(client, params);
    }
    initialize() {
        const _super = Object.create(null, {
            initialize: { get: () => super.initialize }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let users = [];
            this.state.users.forEach((user) => users.push(user));
            let usersTeamA = users.filter(v => v.teamId === 'A');
            let usersTeamB = users.filter(v => v.teamId === 'B');
            users = [...usersTeamA, ...usersTeamB];
            const positionsX = [300, 700, 2550, 3000];
            users.map((user, index) => {
                this.state.players.set(user.userId, new player_schema_1.PlayerSchema({
                    id: user.userId,
                    name: user.name,
                    variant: player_schema_1.PlayerVariant.PERSONAL_I,
                    weaponVariant: types_1.WeaponVariant.PERSONAL_I,
                    x: positionsX[index],
                    y: 800,
                    size: 4,
                    totalHp: 2000,
                    speed: 4,
                    teamId: user.teamId,
                    controller: user.userId,
                    skillIds: user.skillIds,
                    isFlip: user.teamId === 'B',
                    data: JSON.stringify({ avatar: user.avatar }),
                }));
            });
            // // Platforms
            // const width = DemoPVP2Vs2.config.width;
            // const height = 350;
            // this.state.platforms.add(new PlatformSchema({
            //   id: 'platform',
            //   x: DemoPVP2Vs2.config.width / 2,
            //   y: this.mapConfig.height - (height / 2),
            //   w: width,
            //   h: height,
            // }));
            // Required IMPORTANT!
            yield _super.initialize.call(this);
        });
    }
}
DemoPVP2Vs2.config = {
    id: "DemoPVP2Vs2",
    name: "Doubles",
    assetUrl: '/demo/maps/3',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 4,
    mode: matchs_types_1.MapMode.DEMO_PVP,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPVP2Vs2 = DemoPVP2Vs2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1BWUDJWczIubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1BWUDJWczIubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFvRDtBQUNwRCxnREFBMkM7QUFDM0Msa0RBQXdFO0FBRXhFLDREQUF1RTtBQUd2RSxNQUFhLFdBQVksU0FBUSx1QkFBUztJQWN4QyxRQUFRLENBQUMsQ0FBTztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVEsTUFBTSxDQUFDLE1BQWMsRUFBRSxNQUFZO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsV0FBVyxpQ0FBTSxJQUFJLENBQUMsUUFBUSxLQUFFLFFBQVEsRUFBRSxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxRQUFRLEtBQUksTUFBTSxFQUFFLElBQUksRUFBRSxzQkFBTyxDQUFDLFFBQVEsSUFBSSxDQUFDO1FBQ25JLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVjLFVBQVU7Ozs7O1lBQ3ZCLElBQUksS0FBSyxHQUFpQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFckQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDckQsS0FBSyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUV2QyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksNEJBQVksQ0FBQztvQkFDbkQsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsNkJBQWEsQ0FBQyxVQUFVO29CQUNqQyxhQUFhLEVBQUUscUJBQWEsQ0FBQyxVQUFVO29CQUN2QyxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDcEIsQ0FBQyxFQUFFLEdBQUc7b0JBQ04sSUFBSSxFQUFFLENBQUM7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRztvQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUM5QyxDQUFDLENBQUMsQ0FBQTtZQUNMLENBQUMsQ0FBQyxDQUFBO1lBRUYsZUFBZTtZQUNmLDBDQUEwQztZQUMxQyxzQkFBc0I7WUFFdEIsZ0RBQWdEO1lBQ2hELG9CQUFvQjtZQUNwQixxQ0FBcUM7WUFDckMsNkNBQTZDO1lBQzdDLGNBQWM7WUFDZCxlQUFlO1lBQ2YsT0FBTztZQUVQLHNCQUFzQjtZQUN0QixNQUFNLE9BQU0sVUFBVSxXQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBOztBQWxFTSxrQkFBTSxHQUFjO0lBQ3pCLEVBQUUsRUFBRSxhQUFhO0lBQ2pCLElBQUksRUFBRSxTQUFTO0lBQ2YsUUFBUSxFQUFFLGNBQWM7SUFDeEIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtJQUNaLGNBQWMsRUFBRSxnQ0FBaUIsQ0FBQyxLQUFLO0lBQ3ZDLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLElBQUksRUFBRSxzQkFBTyxDQUFDLFFBQVE7SUFDdEIsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO0lBQ2xCLGFBQWEsRUFBRSxFQUFFO0NBQ2xCLENBQUE7QUFaVSxrQ0FBVyJ9