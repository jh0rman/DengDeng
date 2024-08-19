import type { CromoHandler } from 'cromo'
import { loadSharedConfigFiles } from '@smithy/shared-ini-file-loader'

export const GET: CromoHandler = async ({ responseInit }) => {
  const sharedConfigFiles = await loadSharedConfigFiles()

  let profiles = Object.keys(sharedConfigFiles.configFile)
  profiles = profiles.filter((profile) => !profile.startsWith('sso-session.'))

  return Response.json(profiles, responseInit)
}
