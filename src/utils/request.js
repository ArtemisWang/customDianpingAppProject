const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
})

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(response => {
    return handleResponse(url, response);
  }).catch(error => {
    console.error(`Request failed. Url = ${url}. Message = ${error}`)
    return Promise.reject({error: {message: "Request failed."}})
  })
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: data
  }).then(response => {
    return handleResponse(url, response);
  }).catch(error => {
    console.error(`Request failed. Url = ${url}. Message = ${error}`)
    return Promise.reject({error: {message: "Request failed."}})
  })
}

function handleResponse(url, response) {
  if(response.status === 200) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url}`)
    return Promise.reject({error: {message: "Request failed due to server error"}})
  }
}

export {get, post}