/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebar_toggle = document.querySelector('.sidebar-toggle');
    const sidebar_open = document.querySelector('body');
    const sidebar_collapse = document.querySelector('body');
    sidebar_toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      sidebar_open.classList.toggle('sidebar-open');
      
      sidebar_collapse.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const login_button = document.querySelector('.menu-item_login');
    const register_button = document.querySelector('.menu-item_register');
    const logout_button = document.querySelector('.menu-item_logout')
    let modal;
    login_button.addEventListener('click', () => {
      modal = App.getModal('login');
      modal.open();
    })
    register_button.addEventListener('click',() => {
      modal = App.getModal('register');
      modal.open();
    })
    logout_button.addEventListener('click', () => {
      User.logout();
      
        App.setState( 'init' )
      
    })
  }
  

}
