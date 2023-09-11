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
exports.DemoPVP1Vs1 = void 0;
const types_1 = require("../../weapons/types");
const matchs_room_1 = require("../matchs.room");
const matchs_types_1 = require("../matchs.types");
const player_schema_1 = require("../schemas/player.schema");
class DemoPVP1Vs1 extends matchs_room_1.MatchRoom {
    onCreate(_) {
        this.mapConfig = DemoPVP1Vs1.config;
        return super.onCreate();
    }
    onAuth(client, params) {
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
            const positionsX = [300, 2000];
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
            // Platforms
            // const width = DemoPVP1Vs1.config.width;
            // const height = 350;
            // this.state.platforms.add(new PlatformSchema({
            //   id: 'platform',
            //   x: DemoPVP1Vs1.config.width / 2,
            //   y: this.mapConfig.height - (height / 2),
            //   w: width,
            //   h: height,
            // }));
            // Required IMPORTANT!
            yield _super.initialize.call(this);
        });
    }
}
DemoPVP1Vs1.config = {
    id: "DemoPVP1Vs1",
    name: "Single",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: matchs_types_1.MapBackgroundMode.LIGHT,
    numberOfPlayers: 2,
    mode: matchs_types_1.MapMode.DEMO_PVP,
    totalTime: 60 * 15,
    totalTurnTime: 15,
};
exports.DemoPVP1Vs1 = DemoPVP1Vs1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVtb1BWUDFWczEubWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL21hcHMvRGVtb1BWUDFWczEubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFvRDtBQUNwRCxnREFBMkM7QUFDM0Msa0RBQXdFO0FBRXhFLDREQUF1RTtBQUd2RSxNQUFhLFdBQVksU0FBUSx1QkFBUztJQWN4QyxRQUFRLENBQUMsQ0FBTztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVEsTUFBTSxDQUFDLE1BQWMsRUFBRSxNQUFZO1FBQzFDLElBQUksQ0FBQyxXQUFXLGlDQUFNLElBQUksQ0FBQyxRQUFRLEtBQUUsUUFBUSxFQUFFLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFFBQVEsS0FBSSxNQUFNLEVBQUUsSUFBSSxFQUFFLHNCQUFPLENBQUMsUUFBUSxJQUFHLENBQUM7UUFDckcsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRWMsVUFBVTs7Ozs7WUFDdkIsSUFBSSxLQUFLLEdBQWlCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVyRCxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUUvQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLDRCQUFZLENBQUM7b0JBQ25ELEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsT0FBTyxFQUFFLDZCQUFhLENBQUMsVUFBVTtvQkFDakMsYUFBYSxFQUFFLHFCQUFhLENBQUMsVUFBVTtvQkFDdkMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7b0JBQ3BCLENBQUMsRUFBRSxHQUFHO29CQUNOLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxJQUFJO29CQUNiLEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUc7b0JBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDOUMsQ0FBQyxDQUFDLENBQUE7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUVGLFlBQVk7WUFDWiwwQ0FBMEM7WUFDMUMsc0JBQXNCO1lBRXRCLGdEQUFnRDtZQUNoRCxvQkFBb0I7WUFDcEIscUNBQXFDO1lBQ3JDLDZDQUE2QztZQUM3QyxjQUFjO1lBQ2QsZUFBZTtZQUNmLE9BQU87WUFFUCxzQkFBc0I7WUFDdEIsTUFBTSxPQUFNLFVBQVUsV0FBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTs7QUE5RE0sa0JBQU0sR0FBYztJQUN6QixFQUFFLEVBQUUsYUFBYTtJQUNqQixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxjQUFjO0lBQ3hCLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLElBQUk7SUFDWixjQUFjLEVBQUUsZ0NBQWlCLENBQUMsS0FBSztJQUN2QyxlQUFlLEVBQUUsQ0FBQztJQUNsQixJQUFJLEVBQUUsc0JBQU8sQ0FBQyxRQUFRO0lBQ3RCLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUNsQixhQUFhLEVBQUUsRUFBRTtDQUNsQixDQUFBO0FBWlUsa0NBQVcifQ==