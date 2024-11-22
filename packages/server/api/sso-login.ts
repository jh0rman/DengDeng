import { $ } from 'bun'
import type { CromoHandler } from 'cromo'

export const GET: CromoHandler = async ({ query, responseInit }) => {
  const { profile } = query
  await $`aws sso login --profile ${profile}`
  return Response.json(profile, responseInit)
}
