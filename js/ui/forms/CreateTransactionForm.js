/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element)
    this.element = element;
    this.renderAccountsList();

  }

  update() {
    this.renderAccountsList();
         
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let account = Account.list({_method: "GET"},(accountsList) => {
      
      console.log(accountsList.data);
      for (let i = 0; i < accountsList.data.length; i++){
        let data = accountsList.data[i]
        console.log(data.id +"here")
        this.element.querySelector('.accounts-select').innerHTML += `
          <option value="${data.id}">${data.name}</option>
        `;
      }
     
    });

  }  
    
  
  

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
  let data = {};
	data.body = options;
	//data.method = options._method;
  data.method = "POST";
  
	 const result = Transaction.create(data, (res) => {
    
    let modalInc = App.getModal('newIncome');
    
    modalInc.close();
    let modalExp = App.getModal('newExpense');
    
    modalExp.close();
    
    App.update();
    console.log(res)

	 }); 
	}
}
