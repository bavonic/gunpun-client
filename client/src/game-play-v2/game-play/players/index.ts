import { PlayerSchema, PlayerVariant } from './player.types';
import { DefaultPlayer } from './variants/player.default';
import { PersonalPlayer } from './variants/player.personal';

export const createPlayer = (schema: PlayerSchema) => {
  if (schema.variant === PlayerVariant.PERSONAL_I) return new PersonalPlayer({ schema });
  if (schema.variant === PlayerVariant.DEFAULT) return new DefaultPlayer({ schema });
  throw Error(`Player variant "${schema.variant}" was not supported yet.`);
}