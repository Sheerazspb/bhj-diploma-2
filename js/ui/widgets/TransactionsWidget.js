/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(element) {
      this.element = element;
    } else {
      console.log('error') 
    };
    this.registerEvents()

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const button_income = document.querySelector('.create-income-button');
    button_income.addEventListener('click', () => {
      let modal = App.getModal('newIncome');
      modal.open()
      
    })
    const button_expense = document.querySelector('.create-expense-button');
    button_expense.addEventListener('click', () => {
      let modal = App.getModal('newExpense');
      modal.open()
    })
  }
}