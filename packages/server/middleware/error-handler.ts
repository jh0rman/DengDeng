import { $ } from 'bun'
import type { CromoMiddleware } from 'cromo'
import { CredentialsProviderError } from '@smithy/property-provider'

export const errorHandler: CromoMiddleware = async (context, next) => {
  try {
    const response = await next(context)
    return response
  } catch (error) {
    if (error instanceof CredentialsProviderError) {
      await $`aws sso login --profile test`
      return new Response('Unauthorized', { status: 401 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}
