import { AppEnv } from 'types'
import { EnvConfigs } from '../types'
import { betConfigs } from './_beta.configs'
import { productionConfigs } from './_production.configs'
import { stagingConfigs } from './_staging.configs'

export const configs: EnvConfigs = {
  [AppEnv.STAGING]: stagingConfigs,
  [AppEnv.BETA]: betConfigs,
  [AppEnv.PRODUCTION]: productionConfigs,
}
