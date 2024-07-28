import { tool } from 'ai'
import { z } from 'zod'
import * as Asana from 'asana'

const client = Asana.ApiClient.instance
const token = client.authentications['token']
token.accessToken =  ''

const projectsApiInstance = new Asana.ProjectsApi()
const sectionsApiInstance = new Asana.SectionsApi()
const tagsApiInstance = new Asana.TagsApi()
const tasksApiInstance = new Asana.TasksApi()
const usersApiInstance = new Asana.UsersApi()

export const AsanaApi = {
  async getProjects({ archived }) {
    const opts = {
      archived: archived,
    }
    const result = await projectsApiInstance.getProjects(opts)
    return JSON.stringify(result.data, null, 2)
  },
  async addTaskForSection({ sectionId, taskId }) {
    const opts = {
      data: {
        task: taskId,
      },
    }
    const result = await sectionsApiInstance.addTaskForSection(sectionId, opts)
    return JSON.stringify(result.data, null, 2)
  },
  async getSectionsForProject({ projectId }) {
    const result = await sectionsApiInstance.getSectionsForProject(projectId)
    return JSON.stringify(result.data, null, 2)
  },
  async getTagsForTask({ taskId }) {
    const result = await tagsApiInstance.getTagsForTask(taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async addDependenciesForTask({ taskId, dependencies }) {
    const body = {
      data: {
        dependencies,
      },
    }
    const result = await tasksApiInstance.addDependenciesForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async addDependentsForTask({ taskId, dependents }) {
    const body = {
      data: {
        dependents,
      },
    }
    const result = await tasksApiInstance.addDependentsForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async addProjectForTask({ taskId, projectId, sectionId }) {
    const body = {
      data: {
        project: projectId,
        section: sectionId,
      },
    }
    const result = await tasksApiInstance.addProjectForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async addTagForTask({ taskId, tagId }) {
    const body = {
      data: {
        tag: tagId,
      },
    }
    const result = await tasksApiInstance.addTagForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async createTask({ name, completed, due_on, notes, assigneeId, projects, parentId, tags }) {
    const body = {
      data: {
        name,
        completed,
        due_on,
        notes,
        assignee: assigneeId,
        projects,
        parent: parentId,
        tags,
      },
    }
    const result = await tasksApiInstance.createTask(body)
    return JSON.stringify(result.data, null, 2)
  },
  async deleteTask({ taskId }) {
    const result = await tasksApiInstance.deleteTask(taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async getDependenciesForTask({ taskId }) {
    const result = await tasksApiInstance.getDependenciesForTask(taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async getDependentsForTask({ taskId }) {
    const result = await tasksApiInstance.getDependentsForTask(taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async getSubtasksForTask({ taskId }) {
    const result = await tasksApiInstance.getSubtasksForTask(taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async getTasks({ projectId, sectionId, assigneeId }) {
    const opts = {
      project: projectId,
      section: sectionId,
      assignee: assigneeId,
    }
    const result = await tasksApiInstance.getTasks(opts)
    return JSON.stringify(result.data, null, 2)
  },
  async removeDependenciesForTask({ taskId, dependencies }) {
    const body = {
      data: {
        dependencies,
      },
    }
    const result = await tasksApiInstance.removeDependenciesForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async removeDependentsForTask({ taskId, dependents }) {
    const body = {
      data: {
        dependents,
      },
    }
    const result = await tasksApiInstance.removeDependentsForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async removeProjectForTask({ taskId, projectId }) {
    const body = {
      data: {
        project: projectId
      }
    }
    const result = await tasksApiInstance.removeProjectForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async removeTagForTask({ taskId, tagId }) {
    const body = {
      data: {
        tag: tagId
      }
    }
    const result = await tasksApiInstance.removeTagForTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
  async updateTask({ taskId, name, completed, due_on, notes, assigneeId, parentId, projects, tags }) {
    const body = {
      data: {
        name,
        completed,
        due_on,
        notes,
        assignee: assigneeId,
        parent: parentId,
        projects,
        tags,
      },
    }
    const result = await tasksApiInstance.updateTask(body, taskId)
    return JSON.stringify(result.data, null, 2)
  },
}
