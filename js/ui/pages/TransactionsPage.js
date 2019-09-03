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
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error('Элемент отсутствует');
    }

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render( this.lastOptions );
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener( 'click', event => {
      const transButton = event.target.closest( '.transaction__remove' );
      const accButton = event.target.closest('.remove-account');
      if (transButton) {
        const {id} = transButton.dataset;
        this.removeTransaction(id);
      }
      if (accButton) {
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
    if (!this.lastOptions) {
      return;
    }
    if (!confirm( 'Вы действительно хотите удалить этот счёт?' )) {
      return;
    }
    const id = this.lastOptions.account_id;
    this.clear();
    Account.remove(id, {}, () => App.update());
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (!confirm('Вы уверены, что хотите удалить эту транзакцию?')) {
      return;
    }
    Transaction.remove(id, {}, () => App.update());
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if ( !options ) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, {}, (err, response) => {
      this.renderTitle(response.account.name);
    });
    Transaction.list(options, (err, response) => {
      if (err) {
        return;
      }
      if (!response) {
        return;
      }
      if (!response.data) {
        return;
      }
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
    console.log(this.element.querySelector('.content-title'));
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
      const cur = new Date( date.replace( ' ', 'T' ));
      const day = cur.getDate();
      const months = [
          'января',
          'февраля',
          'марта',
          'апреля',
          'мая',
          'июня',
          'июля',
          'августа',
          'сентября',
          'октября',
          'ноября',
          'декабря'
        ];
      const month = months[cur.getMonth()];
      const year = cur.getFullYear();
      const hours = cur.getHours();
      const minutes = cur.getMinutes();
      const formatTime = x => x < 10 ? '0' + x : x;

      return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(minutes)}`;

}

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const {type, name, id} = item;
    const date = this.formatDate( item.created_at );
    const sum = item.sum.toLocaleString( 'en' );
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
    const itemsHTML = data.reverse().map( this.getTransactionHTML.bind( this )).join( '' );
    container.innerHTML = `<div class="transactions-content">${itemsHTML}</div>`;
  }
}
