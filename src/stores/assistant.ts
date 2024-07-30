import { reactive } from 'vue'
import { openaiStore } from './openai'
import { useStorage } from '../composables/local-storage'

export const assistantStore = reactive({
  async id() {
    const assistant = await this.getAssistant()
    return assistant.id
  },
  async getAssistant() {
    const { getAssistantId } = useStorage()
    const assistantId = getAssistantId()
    if (assistantId) {
      try {
        return await openaiStore.assistants.retrieve(assistantId)
      } catch (error) {
        return await this.createAssistant()
      }
    } else {
      return await this.createAssistant()
    }
  },
  async createAssistant() {
    const { setAssistantId } = useStorage()
    const instance = await openaiStore.assistants.create({
      model: 'gpt-4o-mini',
      name: 'Deng Deng',
      instructions: 'Eres un perro asistente de voz especializado en ayudar a desarrolladores. Tus respuestas no deben incluir sintaxis Markdown ni HTML ni IDs. Si alguna función requiere de parametros entonces trata de suplirlos mediante el uso de otras funciones.',
      tools: [
        {
            "type": "function",
            "function": {
                "name": "getProjects",
                "description": "Obtiene la información de los proyectos de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "archived": {
                            "type": "boolean",
                            "description": "Indica si se obtienen los proyectos archivados."
                        }
                    },
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "addTaskForSection",
                "description": "Agrega una tarea a una sección de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "sectionId": {
                            "type": "string",
                            "description": "ID de la sección a la que se agregará la tarea."
                        },
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea que se agregará a la sección."
                        }
                    },
                    "required": [
                        "sectionId",
                        "taskId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "addDependenciesForTask",
                "description": "Agrega dependencias a una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea a la que se agregarán las dependencias."
                        },
                        "dependencies": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Array de IDs de tareas que son dependencias de la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "dependencies"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "addDependentsForTask",
                "description": "Agrega tareas que dependen de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea a la que se agregarán las tareas dependientes."
                        },
                        "dependents": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Array de IDs de tareas que dependen de la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "dependents"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "addProjectForTask",
                "description": "Agrega un proyecto a una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea a la que se agregará el proyecto."
                        },
                        "projectId": {
                            "type": "string",
                            "description": "ID del proyecto al que se agregará la tarea."
                        },
                        "sectionId": {
                            "type": "string",
                            "description": "ID de la sección del proyecto al que se agregará la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "projectId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "createTask",
                "description": "Crea una tarea en Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Nombre de la tarea."
                        },
                        "completed": {
                            "type": "boolean",
                            "description": "Indica si la tarea está completada."
                        },
                        "due_on": {
                            "type": "string",
                            "description": "Fecha de vencimiento de la tarea en formato YYYY-MM-DD."
                        },
                        "notes": {
                            "type": "string",
                            "description": "Descripción de la tarea."
                        },
                        "assigneeId": {
                            "type": "string",
                            "description": "ID del usuario asignado a la tarea."
                        },
                        "projects": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Array de IDs de proyectos a los que se agregará la tarea."
                        },
                        "parentId": {
                            "type": "string",
                            "description": "ID de la tarea padre de la tarea, convierte la tarea en subtarea de la tarea padre."
                        },
                    },
                    "required": [
                        "name",
                        "projects"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "deleteTask",
                "description": "Elimina una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea que se eliminará."
                        }
                    },
                    "required": [
                        "taskId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "getDependenciesForTask",
                "description": "Obtiene las dependencias de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea de la que se obtendrán las dependencias."
                        }
                    },
                    "required": [
                        "taskId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "getDependentsForTask",
                "description": "Obtiene las tareas que dependen de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea de la que se obtendrán las tareas dependientes."
                        }
                    },
                    "required": [
                        "taskId"
                    ],
                }
            }
        },
        {
          "type": "function",
          "function": {
              "name": "getSubtasksForTask",
              "description": "Obtiene las subtareas de una tarea de Asana.",
              "parameters": {
                  "type": "object",
                  "properties": {
                      "taskId": {
                          "type": "string",
                          "description": "ID de la tarea de la que se obtendrán las subtareas."
                      }
                  },
                  "required": [
                      "taskId"
                  ],
              }
          }
        },
        {
            "type": "function",
            "function": {
                "name": "getTasks",
                "description": "Obtiene la información de las tareas de Asana de un proyecto específico.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "projectId": {
                            "type": "string",
                            "description": "ID del proyecto al que pertenecen las tareas. Si no se especifica, se obtienen todas las tareas."
                        },
                        "sectionId": {
                            "type": "string",
                            "description": "ID de la sección del proyecto al que pertenecen las tareas."
                        },
                        "assigneeId": {
                            "type": "string",
                            "description": "ID del usuario asignado a las tareas."
                        }
                    },
                    "required": [
                        "projectId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "removeDependenciesForTask",
                "description": "Elimina dependencias de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea de la que se eliminarán las dependencias."
                        },
                        "dependencies": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Array de IDs de tareas que serán eliminadas como dependencias de la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "dependencies"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "removeDependentsForTask",
                "description": "Elimina tareas que dependen de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea de la que se eliminarán las tareas dependientes."
                        },
                        "dependents": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Array de IDs de tareas que serán eliminadas como dependientes de la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "dependents"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "removeProjectForTask",
                "description": "Elimina un proyecto de una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea de la que se eliminará el proyecto."
                        },
                        "projectId": {
                            "type": "string",
                            "description": "ID del proyecto que se eliminará de la tarea."
                        }
                    },
                    "required": [
                        "taskId",
                        "projectId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "updateTask",
                "description": "Actualiza una tarea de Asana.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "taskId": {
                            "type": "string",
                            "description": "ID de la tarea que se actualizará."
                        },
                        "name": {
                            "type": "string",
                            "description": "Nuevo nombre de la tarea."
                        },
                        "completed": {
                            "type": "boolean",
                            "description": "Indica si la tarea está completada."
                        },
                        "due_on": {
                            "type": "string",
                            "description": "Nueva fecha de vencimiento de la tarea en formato YYYY-MM-DD."
                        },
                        "notes": {
                            "type": "string",
                            "description": "Nueva descripción de la tarea."
                        },
                        "assigneeId": {
                            "type": "string",
                            "description": "Nuevo ID del usuario asignado a la tarea."
                        },
                        "parentId": {
                            "type": [
                                "string",
                                "null"
                            ],
                            "description": "Nuevo ID de la tarea padre de la tarea, convierte la tarea en subtarea de la tarea padre. Si es null, se quitará el padre de la tarea."
                        },
                        "projects": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "Nuevo array de IDs de proyectos a los que se agregará la tarea."
                        },
                    },
                    "required": [
                        "taskId"
                    ],
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "bark",
                "description": "Hace que DengDeng ladre.",
            }
        }
      ]
    })
    setAssistantId(instance.id)
    return instance
  },
})
