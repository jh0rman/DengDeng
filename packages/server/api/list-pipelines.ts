import type { CromoHandler } from 'cromo'
import { fromIni } from '@aws-sdk/credential-providers'
import { CodePipelineClient, ListPipelinesCommand } from '@aws-sdk/client-codepipeline'

export const GET: CromoHandler = async ({ responseInit }) => {
  const client = new CodePipelineClient({
    region: 'us-east-1',
    credentials: fromIni({ profile: 'test' })
  })

  const command = new ListPipelinesCommand()
  const response = await client.send(command)

  return Response.json(response, responseInit)
}
