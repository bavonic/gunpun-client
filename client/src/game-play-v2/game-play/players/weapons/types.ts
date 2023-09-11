
export enum WeaponVariant {
  DEFAULT = 'DEFAULT',
  // Personal
  PERSONAL_I = 'PERSONAL_I',
}

export type WeaponAssetUrls = {
  [key in WeaponVariant]: string
}

export const weaponAssetUrls: WeaponAssetUrls = {
  [WeaponVariant.DEFAULT]: '/images/weapons/default/assets',
  [WeaponVariant.PERSONAL_I]: '/images/weapons/personal/assets',
}