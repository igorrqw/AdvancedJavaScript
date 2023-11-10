"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/


const musicCollection = {

  albums: [
      { title: 'Название альбома 1', artist: 'Исполнитель 1',  year: '2000'},
      { title: 'Название альбома 2', artist: 'Исполнитель 2',  year: '2001'},
      { title: 'Название альбома 3', artist: 'Исполнитель 3',  year: '2002'}
  ],
  [Symbol.iterator]() {
      this.index = 0;
      return this;
  },
  next() {
      return this.index < this.albums.length
          ? {done: false, value: this.albums[this.index++]}
          : {done: true};
  }
}
for (const album of musicCollection) {
  console.log(`${album.title} ${album.artist} (${album.year})`);
}