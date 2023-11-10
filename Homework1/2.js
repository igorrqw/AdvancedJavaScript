"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
    constructor(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
  }
  
  // Вам необходимо реализовать класс, который управляет заказами и поварами.
  class Manager {
    // В данной задаче я не увидел необходимость использовать Map/Set
    constructor() {
      this.clients = {};
  
      this.cooks = {
        Пицца: "Олег",
        Суши: "Андрей",
        Десерт: "Анна",
      };
  
      this.foodMenu = [
        "Маргарита",
        "Пепперони",
        "Три сыра",
        "Филадельфия",
        "Калифорния",
        "Чизмаки",
        "Сеякемаки",
        "Тирамису",
        "Чизкейк",
      ];
    }
  
    newOrder(...data) {
      const client = data[0].firstname;
  
      const orders = [];
      for (let i = 1; i < data.length; i++) {
        const foodName = data[i].name;
  
        if (this.foodMenu.includes(foodName)) {
          orders.push(data[i]);
        } else {
          return this.getLogError(data[i]);
        }
      }
  
      if (this.clients[client]) {
        const oldClientOrders = this.clients[client];
  
        for (let i = 0; i < orders.length; i++) {
          const newOrder = orders[i];
          const oldOrder = this.getCustomerOrder(oldClientOrders, newOrder.name);
  
          if (oldOrder) {
            oldOrder.quantity += newOrder.quantity;
          } else {
            oldClientOrders.push(newOrder);
          }
        }
      } else {
        this.clients[client] = orders;
      }
  
      this.getLogOrders(client);
    }
  
    getCustomerOrder(orders, nameOrder) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
  
        if (order.name === nameOrder) {
          return orders[i];
        }
      }
      return false;
    }
  
    getLogError(food) {
      throw new Error(
        `${food.type} "${food.name}" - такого блюда не существует.`
      );
    }
  
    getLogOrders(client) {
      const clientOrders = this.clients[client];
  
      console.log(`Клиент ${client} заказал:`);
      for (let index = 0; index < clientOrders.length; index++) {
        const element = clientOrders[index];
  
        console.log(
          `${element.type} "${element.name}" - ${
            element.quantity
          }; готовит повар ${this.cooks[element.type]}`
        );
      }
      console.log("------------------");
    }
  }
  
  // Можно передать внутрь конструктора что-либо, если необходимо.
  const manager = new Manager();
  
  // Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
  manager.newOrder(
    new Client("Иван", "Иванов"),
    { name: "Маргарита", quantity: 1, type: "Пицца" },
    { name: "Пепперони", quantity: 2, type: "Пицца" },
    { name: "Чизкейк", quantity: 1, type: "Десерт" }
  );
  // Вывод:
  // Клиент Иван заказал:
  // Пицца "Маргарита" - 1; готовит повар Олег
  // Пицца "Пепперони" - 2; готовит повар Олег
  // Десерт "Чизкейк" - 1; готовит повар Анна
  
  // ---
  
  const clientPavel = new Client("Павел", "Павлов");
  manager.newOrder(
    clientPavel,
    { name: "Филадельфия", quantity: 5, type: "Суши" },
    { name: "Калифорния", quantity: 3, type: "Суши" }
  );
  // Вывод:
  // Клиент Павел заказал:
  // Суши "Филадельфия" - 5; готовит повар Андрей
  // Суши "Калифорния" - 3; готовит повар Андрей
  
  manager.newOrder(
    clientPavel,
    { name: "Калифорния", quantity: 1, type: "Суши" },
    { name: "Тирамису", quantity: 2, type: "Десерт" }
  );
  // Вывод:
  // Клиент Павел заказал:
  // Суши "Филадельфия" - 5; готовит повар Андрей
  // Суши "Калифорния" - 4; готовит повар Андрей
  // Десерт "Тирамису" - 2; готовит повар Анна
  
  manager.newOrder(
    clientPavel,
    { name: "Филадельфия", quantity: 1, type: "Суши" },
    { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
  );
  // Ничего не должно быть добавлено, должна быть выброшена ошибка:
  // Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.
  