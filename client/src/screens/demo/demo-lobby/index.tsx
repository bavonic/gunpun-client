import { getGameConfig } from 'game-config';
import { configLobby } from 'lobby-room/LobbyConfig';
import { useEffect } from 'react';

export const DemoLooby = () => {
  let lobby: Phaser.Game

  const startLobby = async () => {
    lobby = await new Phaser.Game(configLobby)
  }
  useEffect(() => {
    startLobby();
  }, [])

  return (
    <div id='phaser-container' />
  )
}
