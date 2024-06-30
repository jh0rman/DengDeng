import { fromIni } from '@aws-sdk/credential-providers'
import { CodePipelineClient, ListPipelinesCommand } from '@aws-sdk/client-codepipeline'

export default eventHandler(async (event) => {
  const client = new CodePipelineClient({
    region: 'us-east-1',
    credentials: fromIni({ profile: '' })
  })
  const command = new ListPipelinesCommand()
  const response = await client.send(command)
  return response
})
