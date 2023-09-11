"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSkills = void 0;
const skills_types_1 = require("./skills.types");
exports.playerSkills = [
    // {
    //   id: PlayerSkillId.TWO_BULLETS,
    //   avatar: `/images/player-skills/${PlayerSkillId.TWO_BULLETS.toLowerCase()}.png`,
    //   lifeCycle: 5,
    // },
    {
        id: skills_types_1.PlayerSkillId.THREE_BULLETS,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.THREE_BULLETS.toLowerCase()}.png`,
        lifeCycle: 10,
    },
    {
        id: skills_types_1.PlayerSkillId.PLUS_ONE_BULLETS,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.PLUS_ONE_BULLETS.toLowerCase()}.png`,
        lifeCycle: 15,
    },
    {
        id: skills_types_1.PlayerSkillId.PLUS_TWO_BULLETS,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.PLUS_TWO_BULLETS.toLowerCase()}.png`,
        lifeCycle: 20,
    },
    {
        id: skills_types_1.PlayerSkillId.P_PLUS_30_DAMAGE,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.P_PLUS_30_DAMAGE.toLowerCase()}.png`,
        lifeCycle: 20,
        isPassive: true,
    },
    {
        id: skills_types_1.PlayerSkillId.P_PLUS_50_DAMAGE,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.P_PLUS_50_DAMAGE.toLowerCase()}.png`,
        lifeCycle: 20,
        isPassive: true,
    },
    {
        id: skills_types_1.PlayerSkillId.P_RECOVER_200HP,
        avatar: `/images/player-skills/${skills_types_1.PlayerSkillId.P_RECOVER_200HP.toLowerCase()}.png`,
        lifeCycle: 20,
        isPassive: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tYXRjaHMvc2tpbGxzL3NraWxscy5kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQUE0RDtBQUUvQyxRQUFBLFlBQVksR0FBa0I7SUFDekMsSUFBSTtJQUNKLG1DQUFtQztJQUNuQyxvRkFBb0Y7SUFDcEYsa0JBQWtCO0lBQ2xCLEtBQUs7SUFDTDtRQUNFLEVBQUUsRUFBRSw0QkFBYSxDQUFDLGFBQWE7UUFDL0IsTUFBTSxFQUFFLHlCQUF5Qiw0QkFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTTtRQUNoRixTQUFTLEVBQUUsRUFBRTtLQUNkO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsNEJBQWEsQ0FBQyxnQkFBZ0I7UUFDbEMsTUFBTSxFQUFFLHlCQUF5Qiw0QkFBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNO1FBQ25GLFNBQVMsRUFBRSxFQUFFO0tBQ2Q7SUFDRDtRQUNFLEVBQUUsRUFBRSw0QkFBYSxDQUFDLGdCQUFnQjtRQUNsQyxNQUFNLEVBQUUseUJBQXlCLDRCQUFhLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU07UUFDbkYsU0FBUyxFQUFFLEVBQUU7S0FDZDtJQUNEO1FBQ0UsRUFBRSxFQUFFLDRCQUFhLENBQUMsZ0JBQWdCO1FBQ2xDLE1BQU0sRUFBRSx5QkFBeUIsNEJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTTtRQUNuRixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0Q7UUFDRSxFQUFFLEVBQUUsNEJBQWEsQ0FBQyxnQkFBZ0I7UUFDbEMsTUFBTSxFQUFFLHlCQUF5Qiw0QkFBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNO1FBQ25GLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLElBQUk7S0FDaEI7SUFDRDtRQUNFLEVBQUUsRUFBRSw0QkFBYSxDQUFDLGVBQWU7UUFDakMsTUFBTSxFQUFFLHlCQUF5Qiw0QkFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTTtRQUNsRixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQSJ9