import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  requestSignup = (firstName, lastName, email, password) => (
    superagent
    .post(`${API_HOST}/auth/users`)
    .send({firstName, lastName, email, password})
  )
  // Create a new session 
  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  )

  //UPDATE users SET status='OFFLINE' to 'ONLINE'
  resetStatus = () => (
    superagent
    .patch(`${API_HOST}/auth/resetStatus`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  // Delete a session
  requestLogout = () => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${localStorage.token}`)
  )


  // GET ALL THE PROJECTS FOR THE USER WITH ProgressPct FOR CURRENT USER
  getProjectsList = (page, count) => (
    superagent
    .get(`${API_HOST}/projects`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  //RETRIEVE THE DATA OF A SINNGLE PROJECT
  getProjects = (projectId) => (
    superagent
    .get(`${API_HOST}/projects/${projectId}`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  // Create a new project
  createProjects = (title, deadline, description) => (
    superagent
    .post(`${API_HOST}/projects`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({title, deadline, description})
  )

  // Modify an owned project
  editProjects = (projectId, title, description, deadline) => (
    superagent
    .patch(`${API_HOST}/projects/${projectId}`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({title,description,deadline})

  )

  // Retrieve all the tasks for a single project
  getTasks = (projectId) => (
    superagent
    .get(`${API_HOST}/projects/${projectId}/tasks`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  // Create a new task under a project
  createTasks = (projectId, title, description, deadline, priority) => (
    superagent
    .post(`${API_HOST}/projects/${projectId}/tasks`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({projectId,title, description, deadline, priority})

  )

  // Modify a task
  editTasks = (projectId, taskId, title, description, deadline, priority, token) => (
    superagent
    .patch(`${API_HOST}/tasks/${taskId}`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({projectId, taskId, title, description, deadline, priority, token})
  )

  updateCompletion = (taskId, token) => (
    superagent
    .get(`${API_HOST}/tasks/${taskId}/completed`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  // CHANGE TASK COMPLETION STATUS IF IT BELONGS TO USER
  completedTasks = (taskId, completed) => (
    superagent
    .patch(`${API_HOST}/tasks/${taskId}/completed`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({taskId, completed})
  )

  // RETRIEVE USERS THAT ARE ASSIGNED FOR A GIVEN TASK
  getAssignedUsers = (taskId) => (
    superagent
    .get(`${API_HOST}/tasks/${taskId}/assigned`)
    .set('Authorization', `token ${localStorage.token}`)

  )

  assignTask = (taskId, assigneeId) => (
    superagent
    .post(`${API_HOST}/tasks/${taskId}/assigned`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({assigneeId})
  )

  // Retrieve current user
   getMe = () => (
    superagent
    .get(`${API_HOST}/auth/me`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  // RETRIEVE ALL USERS THAT ARE COWORKERS WITH THE CURRENT USER
  getAll = () => (
   superagent
   .get(`${API_HOST}/auth/all`)
   .set('Authorization', `token ${localStorage.token}`)
 )

  // RETRIEVE USER IN SEARCH BAR FOR TASK ASSIGNMENT
  getAutoComplete = (queryTerm) => (
    superagent
    .get(`${API_HOST}/auth/autocomplete/?queryTerm=${queryTerm}`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  getUserAvatar = (userId) => (
    superagent
    .get(`${API_HOST}/auth/avatar/${userId}`)
    .set('Authorization', `token ${localStorage.token}`)
  )

}

export default new Api();
