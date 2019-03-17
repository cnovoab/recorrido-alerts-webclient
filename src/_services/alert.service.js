import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

export const alertService = {
    create,
    list,
    update,
    delete: _delete
};

function login(email, password) {
    return axios.post(`${config.apiUrl}/auth/login`, { email, password })
      .then(user => {
          if (user.data.token) {
              localStorage.setItem('user', JSON.stringify(user.data));
          }
          return user.data;
      })
      .catch(error => {
        return Promise.reject('Username or password is incorrect');
      })
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
  return axios.post(`${config.apiUrl}/users`, { user: user })
          .catch(error => {
            return Promise.reject(error.response.data.errors[0])
          });
}

function list() {
  return axios.get(`${config.apiUrl}/alerts`, headers: authHeader());
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
