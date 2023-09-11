import { createBrowserRouter } from "react-router-dom";
import { Error } from "screens/Error";
import { DemoScreen } from "screens/demo";
import { GamePlayV2 } from "screens/game-v2";
import { DemoLooby } from "screens/demo/demo-lobby";
import { DemoPlayers } from "screens/demo/demo-players";
import { DemoSkills } from "screens/demo/demo-skills";
// import { GameDemo } from "screens/demo/game-demo";
import { MainGame } from "screens/game";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <GamePlayV2 />,
    errorElement: <Error />,
  },
  {
    path: "/demo",
    element: <DemoScreen />,
    errorElement: <Error />,
  },
  {
    path: "/demo/lobby",
    element: <DemoLooby />,
    errorElement: <Error />,
  },
  // {
  //   path: "/demo/game",
  //   // element: <GameDemo />,
  //   errorElement: <Error />,
  // },
  {
    path: "/demo/skills",
    element: <DemoSkills />,
    errorElement: <Error />,
  },
  {
    path: "/demo/players",
    element: <DemoPlayers />,
    errorElement: <Error />,
  },
  // {
  //   path: "/demo/game-v2",
  //   element: <GamePlayV2 />,
  //   errorElement: <Error />,
  // },
]);
