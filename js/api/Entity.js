/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'http://bhj-diploma.u-w.me'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
   
  let body = Object.assign({ _method: 'GET' }, data );
let options = {}   
 options.method ="POST"
   options.body = body
    options.url = this.HOST + this.URL
    createRequest(options, callback);
  }
  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let options = data
    data = Object.assign({ _method: 'PUT' }, data )
    options.url = this.HOST + this.URL
    createRequest(options, callback);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let options = data
    options.url = this.HOST + this.URL+"/"+id
    createRequest(options, callback);

  }

  /**
   * Обновляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static update( id = '', data, callback = f => f ) {
    let options = data
    options.url = this.HOST + this.URL+"/"+id
    createRequest(options, callback);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let options = data
    options.method = "DELETE"
    options.url = this.HOST + this.URL+"/"+id
    createRequest(options, callback);
  }
}
Entity.URL = '';
Entity.HOST = 'http://bhj-diploma.u-w.me';