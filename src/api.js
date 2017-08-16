import superagent from 'superagent'
import { API_HOST } from './config'


class Api {
  requestSignup = (firstName, lastName, email, password) => (
    superagent
    .post(`${API_HOST}/auth/users`)
    .send({firstName, lastName, email, password})
  )

  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })

  )

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${token}`)
  )

  getProjectsList = (page, count) => (
    superagent
    .get(`${API_HOST}/projects`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  getProjects = (id) => (
    superagent
    .get(`${API_HOST}/projects/${id}`)
    .set('Authorization', `token ${localStorage.token}`)
  )

  createProjects = (title, deadline, description) => (
    superagent
    .post(`${API_HOST}/projects`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({title, deadline, description})
  )

  editProjects = (id, title, description, token) => (
    superagent
    .patch(`${API_HOST}/projects/${id}`)
    .set('Authorization', `token ${token}`)
    .send({title,description})
  )

  getTasks = (id) => (
    superagent
    .get(`${API_HOST}/projects/${id}/tasks`)
    .set('Authorization', `token ${localStorage.token}`)

  )

  createTasks = (id, title, description, deadline, priority) => (
    superagent
    .post(`${API_HOST}/projects/${id}/tasks`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({title, description, deadline, priority})

  )

  editTasks = (id, title, description, deadline, priority) => (
    superagent
    .post(`${API_HOST}/projects/${id}/tasks`)
    .set('Authorization', `token ${localStorage.token}`)
    .send({title, description, deadline, priority})
  )

   getMe = (token) => (
    superagent
    .get(`${API_HOST}/auth/me`)
    .set('Authorization', `token ${token}`)
  )

}

export default new Api();
