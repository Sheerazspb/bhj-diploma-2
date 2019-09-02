/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async function(options = {} , callback) {

  let fetchrequest ={}
  fetchrequest.method = options.method;
  fetchrequest.credentials = "include";
  if (options.hasOwnProperty("body")){
    let form_data = new FormData();
    for ( let key in options.body ) {
        form_data.append(key, options.body[key]);
    }
    fetchrequest.body = form_data;
  }
  
  fetchrequest.mode = "cors";
  
  
  console.log("fetchrequest" + fetchrequest);
  console.log("options.url" + options.url);
  fetch(options.url, fetchrequest)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        console.log("data" + data);
        callback(data)
      })
      .catch(function(err) {
        console.log("Something went wrong!", err);
      });
    }
  