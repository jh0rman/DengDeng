import { loadSharedConfigFiles } from '@smithy/shared-ini-file-loader'

export default eventHandler(async (event) => {
  const profiles = await loadSharedConfigFiles()
  return Object.keys(profiles.configFile)
})
