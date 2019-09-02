/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(element) {
      this.element = element;
    } else {
      console.log('error');
    }
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions );
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener( 'click', e => {
      const transaction__remove = e.target.closest( '.transaction__remove' );
      if (transaction__remove) {
        const { id } = transaction__remove.dataset;

        this.removeTransaction( id );
      }
      const remove_account = e.target.closest( '.remove-account' );
      if (remove_account) {
        this.removeAccount()
      }
    });
  }


  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions) {
      return
    }
    if (confirm( 'Вы действительно хотите удалить счёт?' )) {
    this.clear();
    let id = document.querySelector('.active').dataset.id
    
    Account.remove( id, {_method: "DELETE"}, () => App.update());
    }
    
  
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm( 'Вы действительно хотите удалить счёт?' )) {
      Transaction.remove( id, {}, () => App.update());
    }
    
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
    render( options ) {
      if(! options) {
        console.log('error');
        return;
      }
      this.lastOptions = options;
      let id = document.querySelector('.active').dataset.id
      Account.get( id, {}, ( response ) => {
            this.renderTitle(response.account.name);
            Transaction.list(options, (response) => {
              let data = {};
              data.body = options
              options._method = "GET" 
              data.method = "POST"
              this.renderTransactions(response.data)
    
              console.log(response)
          
             }); 


      });
      
    }
  

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle( 'Название счёта' );
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector('.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const d = new Date( date.replace( ' ', 'T' )),
      
      months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
      month = months[d.getMonth()],
      day = d.getDate(),
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes();
      const add0 = (number) => {
        if (number < 10) {
          return '0' + number
        } return number
      }

    return `${day} ${month} ${year} г. в ${add0(hours)}:${add0(minutes)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  
  getTransactionHTML( item ) {
    const { type, name, id, sum } = item,
      date = this.formatDate( item.created_at );
      
    return `
      <div class="transaction transaction_${type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <div class="transaction__date">${date}</div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="transaction__summ">
                  ${sum} <span class="currency">₽</span>
              </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const container = document.querySelector( '.content' );
      let itemsHTML = data.reverse()
        .map( this.getTransactionHTML.bind( this ))
        .join( '' );

    container.innerHTML = `<div class="transactions-content">${itemsHTML}</div>`
  }
}
