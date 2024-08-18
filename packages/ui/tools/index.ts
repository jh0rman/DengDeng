import { useDoggo } from '../composables/doggo'
import { AsanaTools } from './asana'

const doggo = useDoggo()

export const Tools = {
  async bark({}) {
    const result = await doggo.bark()
    return result
  },
  ...AsanaTools,
}