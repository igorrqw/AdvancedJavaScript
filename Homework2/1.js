"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
  #books;
  constructor(listBooks) {
    if (listBooks.length !== new Set(listBooks).size) {
      throw new Error(`В списке книг есть дубликаты!`);
    } else {
      this.#books = listBooks;
    }
  }

  get allBooks() {
    return this.#books;
  }

  addBook(title) {
    if (this.hasBook(title)) {
      throw new Error("Не удается добавить книгу. Эта книга уже добавлена!");
    } else {
      this.#books.push(title);
    }
  }

  removeBook(title) {
    if (this.hasBook(title)) {
      const index = this.#books.indexOf(title);
      this.#books.splice(index, 1);
    } else {
      throw new Error(`"Не удается удалить книгу. Этой книги не существует"`);
    }
  }

  hasBook(title) {
    return this.#books.includes(title);
  }
}

const array = [
  "Мастер и Маргарита",
  "Собачье сердце",
  "Мёртвые души",
  "Война и мир",
  "Бесы",
];
const newLibrary = new Library(array);

newLibrary.addBook("Ревизор");

newLibrary.removeBook("Бесы");
console.log(newLibrary.allBooks);
