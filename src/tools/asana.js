import { tool } from 'ai'
import { z } from 'zod'
import * as Asana from 'asana'

const client = Asana.ApiClient.instance
const token = client.authentications['token']
token.accessToken =  '2/1207911092626834/1207911070805541:1c550c5f7534739521cc042c22155efa'

const projectsApiInstance = new Asana.ProjectsApi()
const sectionsApiInstance = new Asana.SectionsApi()
const tagsApiInstance = new Asana.TagsApi()
const tasksApiInstance = new Asana.TasksApi()
const usersApiInstance = new Asana.UsersApi()

export const asanaTools = {
  addFollowersForProject: tool({
    description: 'Agrega seguidores a un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que se agregarán los seguidores.'),
      followers: z.array(z.string()).describe('Array de usuarios que serán seguidores del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: addFollowersForProject,
  }),
  addMembersForProject: tool({
    description: 'Agrega miembros a un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que se agregarán los miembros.'),
      members: z.array(z.string()).describe('Array de usuarios que serán miembros del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: addMembersForProject,
  }),
  createProject: tool({
    description: 'Crea un proyecto en Asana.',
    parameters: z.object({
      name: z.string().describe('Nombre del proyecto.'),
      archived: z.boolean().optional().describe('Indica si el proyecto está archivado.'),
      due_on: z.string().optional().describe('Fecha de vencimiento del proyecto en formato YYYY-MM-DD.'),
      notes: z.string().optional().describe('Descripción del proyecto.'),
      followers: z.array(z.string()).optional().describe('Array de usuarios que serán seguidores del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
      ownerId: z.string().optional().describe('ID del usuario propietario del proyecto.'),
      teamId: z.string().optional().describe('ID del equipo al que pertenece el proyecto.'),
      workspaceId: z.string().optional().describe('ID del espacio de trabajo al que pertenece el proyecto.'),
    }),
    execute: createProject,
  }),
  deleteProject: tool({
    description: 'Elimina un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto que se eliminará.'),
    }),
    execute: deleteProject,
  }),
  duplicateProject: tool({
    description: 'Duplica un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto que se duplicará.'),
      teamId: z.string().describe('ID del equipo al que pertenecerá el nuevo proyecto.'),
      name: z.string().describe('Nombre del nuevo proyecto.'),
      includeAllocations: z.boolean().optional().describe('Indica si se incluirán las asignaciones del proyecto.'),
      includeForms: z.boolean().optional().describe('Indica si se incluirán los formularios del proyecto.'),
      includeMembers: z.boolean().optional().describe('Indica si se incluirán los miembros del proyecto.'),
      includeNotes: z.boolean().optional().describe('Indica si se incluirán las notas del proyecto.'),
      includeTaskAssignee: z.boolean().optional().describe('Indica si se incluirán los asignados de las tareas del proyecto.'),
      includeTaskDates: z.boolean().optional().describe('Indica si se incluirán las fechas de las tareas del proyecto.'),
      includeTaskDependencies: z.boolean().optional().describe('Indica si se incluirán las dependencias de las tareas del proyecto.'),
      includeTaskFollowers: z.boolean().optional().describe('Indica si se incluirán los seguidores de las tareas del proyecto.'),
      includeTaskNotes: z.boolean().optional().describe('Indica si se incluirán las notas de las tareas del proyecto.'),
      includeTaskProjects: z.boolean().optional().describe('Indica si se incluirán los proyectos de las tareas del proyecto.'),
      includeTaskSubtasks: z.boolean().optional().describe('Indica si se incluirán las subtareas de las tareas del proyecto.'),
      includeTaskTags: z.boolean().optional().describe('Indica si se incluirán las etiquetas de las tareas del proyecto.'),
    }),
    execute: duplicateProject,
  }),
  getProjects: tool({
    description: 'Obtiene la información de los proyectos de Asana.',
    parameters: z.object({
      workspaceId: z.string().optional().describe('ID del espacio de trabajo al que pertenecen los proyectos.'),
      teamId: z.string().optional().describe('ID del equipo al que pertenecen los proyectos.'),
      archived: z.boolean().optional().describe('Indica si se obtienen los proyectos archivados.'),
    }),
    execute: getProjects,
  }),
  removeFollowersForProject: tool({
    description: 'Elimina seguidores de un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que se eliminarán los seguidores.'),
      followers: z.array(z.string()).describe('Array de usuarios que serán eliminados como seguidores del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: removeFollowersForProject,
  }),
  removeMembersForProject: tool({
    description: 'Elimina miembros de un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que se eliminarán los miembros.'),
      members: z.array(z.string()).describe('Array de usuarios que serán eliminados como miembros del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: removeMembersForProject,
  }),
  updateProject: tool({
    description: 'Actualiza un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto que se actualizará.'),
      name: z.string().optional().describe('Nuevo nombre del proyecto.'),
      archived: z.boolean().optional().describe('Indica si el proyecto está archivado.'),
      due_on: z.string().optional().describe('Nueva fecha de vencimiento del proyecto en formato YYYY-MM-DD.'),
      notes: z.string().optional().describe('Nueva descripción del proyecto.'),
      followers: z.array(z.string()).optional().describe('Nuevo array de usuarios que serán seguidores del proyecto. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
      ownerId: z.string().optional().describe('Nuevo ID del usuario propietario del proyecto.'),
      teamId: z.string().optional().describe('Nuevo ID del equipo al que pertenece el proyecto.'),
    }),
    execute: updateProject,
  }),
  addTaskForSection: tool({
    description: 'Agrega una tarea a una sección de Asana.',
    parameters: z.object({
      sectionId: z.string().describe('ID de la sección a la que se agregará la tarea.'),
      taskId: z.string().describe('ID de la tarea que se agregará a la sección.'),
    }),
    execute: addTaskForSection,
  }),
  createSectionForProject: tool({
    description: 'Crea una sección para un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que se creará la sección.'),
      name: z.string().describe('Nombre de la sección.'),
    }),
    execute: createSectionForProject,
  }),
  deleteSection: tool({
    description: 'Elimina una sección de Asana.',
    parameters: z.object({
      sectionId: z.string().describe('ID de la sección que se eliminará.'),
    }),
    execute: deleteSection,
  }),
  getSectionsForProject: tool({
    description: 'Obtiene las secciones de un proyecto de Asana.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto del que se obtendrán las secciones.'),
    }),
    execute: getSectionsForProject,
  }),
  updateSection: tool({
    description: 'Actualiza una sección de Asana.',
    parameters: z.object({
      sectionId: z.string().describe('ID de la sección que se actualizará.'),
      name: z.string().describe('Nuevo nombre de la sección.'),
    }),
    execute: updateSection,
  }),
  createTag: tool({
    description: 'Crea una etiqueta en Asana.',
    parameters: z.object({
      workspaceId: z.string().describe('ID del espacio de trabajo al que pertenecerá la etiqueta.'),
      name: z.string().describe('Nombre de la etiqueta.'),
      notes: z.string().optional().describe('Descripción de la etiqueta.'),
      followers: z.array(z.string()).optional().describe('Array de usuarios que serán seguidores de la etiqueta. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: createTag,
  }),
  deleteTag: tool({
    description: 'Elimina una etiqueta de Asana.',
    parameters: z.object({
      tagId: z.string().describe('ID de la etiqueta que se eliminará.'),
    }),
    execute: deleteTag,
  }),
  getTags: tool({
    description: 'Obtiene la información de las etiquetas de Asana.',
    parameters: z.object({
      workspaceId: z.string().optional().describe('ID del espacio de trabajo al que pertenecen las etiquetas.'),
    }),
    execute: getTags,
  }),
  getTagsForTask: tool({
    description: 'Obtiene las etiquetas de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se obtendrán las etiquetas.'),
    }),
    execute: getTagsForTask,
  }),
  addDependenciesForTask: tool({
    description: 'Agrega dependencias a una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se agregarán las dependencias.'),
      dependencies: z.array(z.string()).describe('Array de IDs de tareas que son dependencias de la tarea.'),
    }),
    execute: addDependenciesForTask,
  }),
  addDependentsForTask: tool({
    description: 'Agrega tareas que dependen de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se agregarán las tareas dependientes.'),
      dependents: z.array(z.string()).describe('Array de IDs de tareas que dependen de la tarea.'),
    }),
    execute: addDependentsForTask,
  }),
  addFollowersForTask: tool({
    description: 'Agrega seguidores a una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se agregarán los seguidores.'),
      followers: z.array(z.string()).describe('Array de usuarios que serán seguidores de la tarea. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: addFollowersForTask
  }),
  addProjectForTask: tool({
    description: 'Agrega un proyecto a una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se agregará el proyecto.'),
      projectId: z.string().describe('ID del proyecto al que se agregará la tarea.'),
      sectionId: z.string().optional().describe('ID de la sección del proyecto al que se agregará la tarea.'),
    }),
    execute: addProjectForTask
  }),
  addTagForTask: tool({
    description: 'Agrega una etiqueta a una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se agregará la etiqueta.'),
      tagId: z.string().describe('ID de la etiqueta que se agregará a la tarea.'),
    }),
    execute: addTagForTask,
  }),
  createSubtaskForTask: tool({
    description: 'Crea una subtarea para una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea a la que se creará la subtarea.'),
      name: z.string().describe('Nombre de la subtarea.'),
      completed: z.boolean().optional().describe('Indica si la subtarea está completada.'),
      due_on: z.string().optional().describe('Fecha de vencimiento de la subtarea en formato YYYY-MM-DD.'),
      notes: z.string().optional().describe('Descripción de la subtarea.'),
      assigneeId: z.string().optional().describe('ID del usuario asignado a la subtarea.'),
      followers: z.array(z.string()).optional().describe('Array de usuarios que serán seguidores de la subtarea. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
      projects: z.array(z.string()).optional().describe('Array de IDs de proyectos a los que se agregará la subtarea.'),
      tags: z.array(z.string()).optional().describe('Array de IDs de etiquetas que se agregarán a la subtarea.'),
    }),
    execute: createSubtaskForTask,
  }),
  createTask: tool({
    description: 'Crea una tarea en Asana.',
    parameters: z.object({
      name: z.string().describe('Nombre de la tarea.'),
      completed: z.boolean().optional().describe('Indica si la tarea está completada.'),
      due_on: z.string().optional().describe('Fecha de vencimiento de la tarea en formato YYYY-MM-DD.'),
      notes: z.string().optional().describe('Descripción de la tarea.'),
      assigneeId: z.string().optional().describe('ID del usuario asignado a la tarea.'),
      followers: z.array(z.string()).optional().describe('Array de usuarios que serán seguidores de la tarea. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
      projects: z.array(z.string()).describe('Array de IDs de proyectos a los que se agregará la tarea.'),
      tags: z.array(z.string()).optional().describe('Array de IDs de etiquetas que se agregarán a la tarea.'),
    }),
    execute: createTask,
  }),
  deleteTask: tool({
    description: 'Elimina una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea que se eliminará.'),
    }),
    execute: deleteTask,
  }),
  duplicateTask: tool({
    description: 'Duplica una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea que se duplicará.'),
      name: z.string().optional().describe('Nombre de la nueva tarea.'),
      includeAssignee: z.boolean().optional().describe('Indica si se incluirá el asignado de la tarea.'),
      includeAttachments: z.boolean().optional().describe('Indica si se incluirán los archivos adjuntos de la tarea.'),
      includeDates: z.boolean().optional().describe('Indica si se incluirán las fechas de la tarea.'),
      includeDependencies: z.boolean().optional().describe('Indica si se incluirán las dependencias de la tarea.'),
      includeFollowers: z.boolean().optional().describe('Indica si se incluirán los seguidores de la tarea.'),
      includeNotes: z.boolean().optional().describe('Indica si se incluirán las notas de la tarea.'),
      includeParent: z.boolean().optional().describe('Indica si se incluirá el padre de la tarea.'),
      includeProjects: z.boolean().optional().describe('Indica si se incluirán los proyectos de la tarea.'),
      includeSubtasks: z.boolean().optional().describe('Indica si se incluirán las subtareas de la tarea.'),
      includeTags: z.boolean().optional().describe('Indica si se incluirán las etiquetas de la tarea.'),
    }),
    execute: duplicateTask,
  }),
  getDependenciesForTask: tool({
    description: 'Obtiene las dependencias de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se obtendrán las dependencias.'),
    }),
    execute: getDependenciesForTask,
  }),
  getDependentsForTask: tool({
    description: 'Obtiene las tareas que dependen de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se obtendrán las tareas dependientes.'),
    }),
    execute: getDependentsForTask
  }),
  getSubtasksForTask: tool({
    description: 'Obtiene las subtareas de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se obtendrán las subtareas.'),
    }),
    execute: getSubtasksForTask,
  }),
  getTasks: tool({
    description: 'Obtiene la información de las tareas de Asana de un proyecto específico.',
    parameters: z.object({
      projectId: z.string().describe('ID del proyecto al que pertenecen las tareas. Si no se especifica, se obtienen todas las tareas.'),
      sectionId: z.string().optional().describe('ID de la sección del proyecto al que pertenecen las tareas.'),
      assigneeId: z.string().optional().describe('ID del usuario asignado a las tareas.'),
    }),
    execute: getTasks,
  }),
  removeDependenciesForTask: tool({
    description: 'Elimina dependencias de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se eliminarán las dependencias.'),
      dependencies: z.array(z.string()).describe('Array de IDs de tareas que serán eliminadas como dependencias de la tarea.'),
    }),
    execute: removeDependenciesForTask,
  }),
  removeDependentsForTask: tool({
    description: 'Elimina tareas que dependen de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se eliminarán las tareas dependientes.'),
      dependents: z.array(z.string()).describe('Array de IDs de tareas que serán eliminadas como dependientes de la tarea.'),
    }),
    execute: removeDependentsForTask,
  }),
  removeFollowerForTask: tool({
    description: 'Elimina seguidores de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se eliminarán los seguidores.'),
      followers: z.array(z.string()).describe('Array de usuarios que serán eliminados como seguidores de la tarea. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
    }),
    execute: removeFollowerForTask,
  }),
  removeProjectForTask: tool({
    description: 'Elimina un proyecto de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se eliminará el proyecto.'),
      projectId: z.string().describe('ID del proyecto que se eliminará de la tarea.'),
    }),
    execute: removeProjectForTask,
  }),
  removeTagForTask: tool({
    description: 'Elimina una etiqueta de una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea de la que se eliminará la etiqueta.'),
      tagId: z.string().describe('ID de la etiqueta que se eliminará de la tarea.'),
    }),
    execute: removeTagForTask,
  }),
  setParentForTask: tool({
    description: 'Establece una tarea como padre de otra tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea que se establecerá como hija.'),
      parentId: z.string().nullable().describe('ID de la tarea que se establecerá como padre. Si es null, se quitará el padre de la tarea.'),
    }),
    execute: setParentForTask,
  }),
  updateTask: tool({
    description: 'Actualiza una tarea de Asana.',
    parameters: z.object({
      taskId: z.string().describe('ID de la tarea que se actualizará.'),
      name: z.string().optional().describe('Nuevo nombre de la tarea.'),
      completed: z.boolean().optional().describe('Indica si la tarea está completada.'),
      due_on: z.string().optional().describe('Nueva fecha de vencimiento de la tarea en formato YYYY-MM-DD.'),
      notes: z.string().optional().describe('Nueva descripción de la tarea.'),
      assigneeId: z.string().optional().describe('Nuevo ID del usuario asignado a la tarea.'),
      followers: z.array(z.string()).optional().describe('Nuevo array de IDs de usuarios que serán seguidores de la tarea. Pueden ser IDs de los usuarios o "me" para el usuario autenticado.'),
      projects: z.array(z.string()).optional().describe('Nuevo array de IDs de proyectos a los que se agregará la tarea.'),
      tags: z.array(z.string()).optional().describe('Nuevo array de IDs de etiquetas que se agregarán a la tarea.'),
    }),
    execute: updateTask,
  }),
}

// Projects API

async function addFollowersForProject({ projectId, followers }) {
  const body = {
    data: {
      followers,
    },
  }
  const result = await projectsApiInstance.addFollowersForProject(body, projectId)
  return JSON.stringify(result.data, null, 2)
}

async function addMembersForProject({ projectId, members }) {
  const body = {
    data: {
      members,
    },
  }
  const result = await projectsApiInstance.addMembersForProject(body, projectId)
  return JSON.stringify(result.data, null, 2)
}

async function createProject({ name, archived, due_on, notes, followers, ownerId, teamId, workspaceId }) {
  const body = {
    data: {
      name,
      archived,
      due_on,
      notes,
      followers,
      owner: ownerId,
      team: teamId,
      workspace: workspaceId,
    },
  }
  const result = await projectsApiInstance.createProject(body)
  return JSON.stringify(result.data, null, 2)
}

async function deleteProject({ projectId }) {
  const result = await projectsApiInstance.deleteProject(projectId)
  return JSON.stringify(result.data, null, 2)
}

async function duplicateProject({ projectId, teamId, name, includeAllocations, includeForms, includeMembers, includeNotes, includeTaskAssignee, includeTaskDates, includeTaskDependencies, includeTaskFollowers, includeTaskNotes, includeTaskProjects, includeTaskSubtasks, includeTaskTags }) {
  const opts = {
    data: {
      team: teamId,
      name,
      include: {
        allocations: includeAllocations,
        forms: includeForms,
        members: includeMembers,
        notes: includeNotes,
        task_assignee: includeTaskAssignee,
        task_dates: includeTaskDates,
        task_dependencies: includeTaskDependencies,
        task_followers: includeTaskFollowers,
        task_notes: includeTaskNotes,
        task_projects: includeTaskProjects,
        task_subtasks: includeTaskSubtasks,
        task_tags: includeTaskTags,
      },
    },
  }
  const result = await projectsApiInstance.duplicateProject(projectId, opts)
  return JSON.stringify(result.data, null, 2)
}

async function getProjects({ workspaceId, teamId, archived }) {
  const opts = {
    workspace: workspaceId,
    team: teamId,
    archived: archived,
  }
  const result = await projectsApiInstance.getProjects(opts)
  return JSON.stringify(result.data, null, 2)
}

async function removeFollowersForProject({ projectId, followers }) {
  const body = {
    data: {
      followers,
    },
  }
  const result = await projectsApiInstance.removeFollowersForProject(body, projectId)
  return JSON.stringify(result.data, null, 2)
}

async function removeMembersForProject({ projectId, members }) {
  const body = {
    data: {
      members,
    },
  }
  const result = await projectsApiInstance.removeMembersForProject(body, projectId)
  return JSON.stringify(result.data, null, 2)
}

async function updateProject({ projectId, name, archived, due_on, notes, followers, ownerId, teamId }) {
  const body = {
    data: {
      name,
      archived,
      due_on,
      notes,
      followers,
      owner: ownerId,
      team: teamId,
    },
  }
  const result = await projectsApiInstance.updateProject(body, projectId)
  return JSON.stringify(result.data, null, 2)
}

// Sections API

async function addTaskForSection({ sectionId, taskId }) {
  const opts = {
    data: {
      task: taskId,
    },
  }
  const result = await sectionsApiInstance.addTaskForSection(sectionId, opts)
  return JSON.stringify(result.data, null, 2)
}

async function createSectionForProject({ projectId, name }) {
  const opts = {
    data: {
      name,
    },
  }
  const result = await sectionsApiInstance.createSectionForProject(projectId, opts)
  return JSON.stringify(result.data, null, 2)
}

async function deleteSection({ sectionId }) {
  const result = await sectionsApiInstance.deleteSection(sectionId)
  return JSON.stringify(result.data, null, 2)
}

async function getSectionsForProject({ projectId }) {
  const result = await sectionsApiInstance.getSectionsForProject(projectId)
  return JSON.stringify(result.data, null, 2)
}

async function updateSection({ sectionId, name }) {
  const opts = {
    data: {
      name,
    },
  }
  const result = await sectionsApiInstance.updateSection(sectionId, opts)
  return JSON.stringify(result.data, null, 2)
}

// Tags API

async function createTag({ name, notes, followers, workspaceId }) {
  const body = {
    data: {
      name,
      notes,
      followers,
      workspace: workspaceId,
    },
  }
  const result = await tagsApiInstance.createTag(body)
  return JSON.stringify(result.data, null, 2)
}

async function deleteTag({ tagId }) {
  const result = await tagsApiInstance.deleteTag(tagId)
  return JSON.stringify(result.data, null, 2)
}

async function getTags({ workspaceId }) {
  const opts = {
    workspace: workspaceId,
  }
  const result = await tagsApiInstance.getTags(opts)
  return JSON.stringify(result.data, null, 2)
}

async function getTagsForTask({ taskId }) {
  const result = await tagsApiInstance.getTagsForTask(taskId)
  return JSON.stringify(result.data, null, 2)
}

// Tasks API

async function addDependenciesForTask({ taskId, dependencies }) {
  const body = {
    data: {
      dependencies,
    },
  }
  const result = await tasksApiInstance.addDependenciesForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function addDependentsForTask({ taskId, dependents }) {
  const body = {
    data: {
      dependents,
    },
  }
  const result = await tasksApiInstance.addDependentsForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function addFollowersForTask({ taskId, followers }) {
  const body = {
    data: {
      followers,
    },
  }
  const result = await tasksApiInstance.addFollowersForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function addProjectForTask({ taskId, projectId, sectionId }) {
  const body = {
    data: {
      project: projectId,
      section: sectionId,
    },
  }
  const result = await tasksApiInstance.addProjectForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function addTagForTask({ taskId, tagId }) {
  const body = {
    data: {
      tag: tagId,
    },
  }
  const result = await tasksApiInstance.addTagForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function createSubtaskForTask({ taskId, name, completed, due_on, notes, assigneeId, followers, projects, tags }) {
  const body = {
    data: {
      name,
      completed,
      due_on,
      notes,
      assignee: assigneeId,
      followers,
      projects,
      tags,
    },
  }
  const result = await tasksApiInstance.createSubtaskForTask(body, taskId, opts)
  return JSON.stringify(result.data, null, 2)
}

async function createTask({ name, completed, due_on, notes, assigneeId, followers, projects, tags }) {
  const body = {
    data: {
      name,
      completed,
      due_on,
      notes,
      assignee: assigneeId,
      followers,
      projects,
      tags,
    },
  }
  const result = await tasksApiInstance.createTask(body)
  return JSON.stringify(result.data, null, 2)
}

async function deleteTask({ taskId }) {
  const result = await tasksApiInstance.deleteTask(taskId)
  return JSON.stringify(result.data, null, 2)
}

async function duplicateTask({ taskId, name, includeAssignee, includeAttachments, includeDates, includeDependencies, includeFollowers, includeNotes, includeParent, includeProjects, includeSubtasks, includeTags }) {
  const body = {
    data: {
      name,
      include: {
        assignee: includeAssignee,
        attachments: includeAttachments,
        dates: includeDates,
        dependencies: includeDependencies,
        followers: includeFollowers,
        notes: includeNotes,
        parent: includeParent,
        projects: includeProjects,
        subtasks: includeSubtasks,
        tags: includeTags,
      },
    },
  }
  const result = await tasksApiInstance.duplicateTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function getDependenciesForTask({ taskId }) {
  const result = await tasksApiInstance.getDependenciesForTask(taskId)
  return JSON.stringify(result.data, null, 2)
}

async function getDependentsForTask({ taskId }) {
  const result = await tasksApiInstance.getDependentsForTask(taskId)
  return JSON.stringify(result.data, null, 2)
}

async function getSubtasksForTask({ taskId }) {
  const result = await tasksApiInstance.getSubtasksForTask(taskId)
  return JSON.stringify(result.data, null, 2)
}

async function getTasks({ projectId, sectionId, assigneeId }) {
  const opts = {
    project: projectId,
    section: sectionId,
    assignee: assigneeId,
  }
  const result = await tasksApiInstance.getTasks(opts)
  return JSON.stringify(result.data, null, 2)
}

async function removeDependenciesForTask({ taskId, dependencies }) {
  const body = {
    data: {
      dependencies,
    },
  }
  const result = await tasksApiInstance.removeDependenciesForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function removeDependentsForTask({ taskId, dependents }) {
  const body = {
    data: {
      dependents,
    },
  }
  const result = await tasksApiInstance.removeDependentsForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function removeFollowerForTask({ taskId, followers }) {
  const body = {
    data: {
      followers
    }
  }
  const result = await tasksApiInstance.removeFollowerForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function removeProjectForTask({ taskId, projectId }) {
  const body = {
    data: {
      project: projectId
    }
  }
  const result = await tasksApiInstance.removeProjectForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function removeTagForTask({ taskId, tagId }) {
  const body = {
    data: {
      tag: tagId
    }
  }
  const result = await tasksApiInstance.removeTagForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function setParentForTask({ taskId, parentId }) {
  const body = {
    data: {
      parent: parentId
    }
  }
  const result = await tasksApiInstance.setParentForTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}

async function updateTask({ taskId, name, completed, due_on, notes, assigneeId, followers, projects, tags }) {
  const body = {
    data: {
      name,
      completed,
      due_on,
      notes,
      assignee: assigneeId,
      followers,
      projects,
      tags,
    },
  }
  const result = await tasksApiInstance.updateTask(body, taskId)
  return JSON.stringify(result.data, null, 2)
}
