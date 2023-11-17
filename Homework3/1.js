"use strict";
localStorage.setItem(
  "Apple iPhone 15",
  JSON.stringify(["Камера супер, фото потрясающе.", "Отличное разрешение"])
);
localStorage.setItem(
  "Samsung Galaxy A54",
  JSON.stringify(["Достоинства: Яркий экран 120гц, классные камеры"])
);
localStorage.setItem(
  "Xiaomi 13 Pro",
  JSON.stringify([" Отличная камера. Отличное разрешение и ГЦ экрана"])
);
localStorage.setItem(
  "HUAWEI P60 Pro",
  JSON.stringify(["Достоинства: Процессор, дисплей."])
);
localStorage.setItem(
  "ASUS Zenfone 10",
  JSON.stringify([
    "Достоинства: скорость работы, размер, экран.",
    "Яркий экран 120гц",
  ])
);

const inputProduct = document.querySelector(".nameProduct");
const textField = document.querySelector(".feedback");
const btnAdd = document.querySelector(".add");

function getCorrectTextField() {
  if (textField.value && inputProduct.value) {
    return true;
  }
}
function addFeedback(nameProduct, feedback) {
  const textField = getFeedbacks(nameProduct);

  if (textField.length === 0) {
    localStorage.setItem(nameProduct, [feedback]);
  } else {
    textField.push(feedback);
    localStorage.setItem(nameProduct, textField);
  }
}
function getFeedbacks(nameProduct) {
  const data = localStorage.getItem(nameProduct);
  if (data === null) {
    return [];
  }
  return [data];
}

btnAdd.addEventListener("click", () => {
  if (!getCorrectTextField()) {
    throw new Error("Заполните все поля!");
  }
  addFeedback(inputProduct.value, textField.value);
  inputProduct.value = "";
  textField.value = "";
});
