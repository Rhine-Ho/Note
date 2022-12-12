# Learn DOM control & addEventListener by Create Todo list.


### Step1

- Add todo 
- Delete todo 
- Mark todo as completed/incomplete
Extended: with localStorage local storage

wrapper：A container that contains the entire Todo List.
- todo__input：Input field, input and add button
- todo__list：Containers for all todo
- todo：Toggle status checkbox, todo title and delete button.

### Step2 
```
<div class="wrapper">
  <h1>Todo List</h1>
  <div class="todo__input-block">
    <input class="todo__input" type="text" placeholder="Add New Todo Here..." minlength="1" maxlength="48">
    <button class="btn-new"></button>
  </div>
  <div class="todo__hr"></div>

  <ul class="todo__list">
    <li class="todo">
      <label class="todo__title">
        <input class="todo__check" type="checkbox">
        <p>Fix debug</p>
      </label>
      <button class="btn-delete"></button>
    </li>
    <li class="todo">
      <label class="todo__title">
        <input class="todo__check" type="checkbox">
        <p>Write code</p>
      </label>
      <button class="btn-delete"></button>
    </li>
  </ul>
</div>
```
在 <label> 標籤中放入 input 標籤，就不需指定 for 和 id，可參考：HTML <label> 标签的 for 属性

將上述程式碼再加入 css 屬性，排版後版面如下：



Step3. 建立監聽事件
在處理事件時，通常會需要指派監聽者（Event listeners）來監聽事件觸發。

透過監測 DOM 中的某一元素（element），當使用者觸發某事件（event）時，就會執行後續動作（functuion），語法如下：

element.addEventListener('event', function, useCapture)
event 事件：監聽事件類型，如：click 或 keypress
function 功能：當指定事件觸發時執行函式
useCapture：指定事件在捕獲或冒泡階段執行，預設值為 flase（冒泡）
參考資料：[week 7] DOM 事件傳遞機制：捕獲與冒泡、事件代理

新增 todo
在輸入框 點選 Add / 按下 Enter 鍵，可新增 todo
新增後清空輸入框內容
步驟如下：
選取需要的 DOM 元素，監聽該元素的 click / keypress 事件
// 點擊按鈕新增
document.querySelector('.btn-new').addEventListener('click', function () {
  addTodos();
});

// 按 Enter 新增
document.querySelector('.todo__input').addEventListener('keypress', function (e) {
  // Enter 對應鍵盤代碼：13
  if (e.which === 13) {
    addTodos();
  }
});
若接收到事件，以函式 addTodos 處理新增 todo
function addTodos() {
  const inputValue = document.querySelector('.todo__input').value;
  
 // 檢查輸入欄位是否為空值，trim() 可清除字串前後空白
  if (inputValue.trim().length === 0) return;
  // 新增 todo
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo');
  newTodo.innerHTML = `
    <label class="todo__title">
      <input class="todo__check" type="checkbox">
      <p>${escapeHtml(inputValue)}</p>
    </label>
    <button class="btn-delete"></button>
  `
  document.querySelector('.todo__list').appendChild(newTodo);
  // 新增成功後，清空輸入欄
  document.querySelector('.todo__input').value = '';
}
利用跳脫函式 escapeHtml 處理特殊字元，防止程式碼無法正常顯示
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
刪除 todo
點擊右側叉叉圖示，可刪除 todo
遇到問題：動態新增
由於 todo 是「動態新增」，若直接選取 btn-delete，將無法對後來新增的按鈕進行監聽。

解決辦法：事件代理
我們可透過事件傳遞機制，改成對父元素（事件代理）進行事件監聽，如此即可對底下的所有 btn-delete 進行監聽。

// 事件代理：透過父元素來監聽 click 事件
document.querySelector('.todo__list').addEventListener('click', function (event) {
  const target = event.target;
  // 刪除 todo
  if (target.classList.contains('btn-delete')) {
    target.parentNode.remove()
  }
});
標記 todo 為已完成/未完成
點擊左側框框，能夠切換狀態為 已完成 / 未完成
步驟如下：
同樣監聽 checkbox 的父元素 .todo__list
若點擊目標包含 checkbox，即可切換狀態
document.querySelector('.todo__list').addEventListener('click', function (event) {
  const target = event.target;
  // check / uncheck todo
  if (target.classList.contains('todo__check')) {
    target.parentNode.classList.toggle('todo__done')
  }
}
延伸：搭配 localStorage 本地儲存
localStorage
是由 HTML5 提供的一種 Web Storage
儲存大小約 5MB
可將資料儲存在用戶端，資料就不會因重整頁面或關閉瀏覽器而消失
以 key-value pair 的形式保存，且會轉成 JSON 字串格式
localStorage method
儲存資料：localStorage.setItem('key', 'value')
讀取資料：let storageValue = localStorage.getItem(key, - value)
清除資料：localStorage.removeItem(key)
清除全部資料：localStorage.clear()
搭配 localStorage 實作 Todo List，我們可將資料存放在瀏覽器。但似乎還需要時間來研究如何使用，等之後熟悉用法會再來更新！

參考內容：

[JS初心者]帶你用localStorage做出一個陽春版「To-Do List」(待辦清單)-1
Day 20 - 30 天 Progressive Web App 學習筆記 - To-Do List 實作 PWA - (新增/修改/刪除待辦事項清單)
JS30-Day15-LocalStorage
HTML5 Web Storage
[JavaScript] Cookie、LocalStorage、SessionStorage 三種差異
發表於  HackMD
 5540
讚賞3 收藏 訂閱


# instruction

1.We learned alert('hello'); to create a popup with the text "hello".Now create a popup with your name in it.
```
1.window.alert("Rhine ho"); //Alert Box
2.window.confirm("Rhine ho");//Confirm Box
3.window.prompt("要在彈跳視窗顯示的文字","輸入格的預設t");
```

2.Display today's datein the Console in Chrome.
```

```
3.Overwrite the webpage using 
document.body.innerHTML so that the page just displays your name.
```

```
4.Overwrite the webpage to be empty.
```

```
5.Create 3 buttons next to each other one with the label "Up" and another with the label "Down"
```

```
6.Load Javascript from within the HTML and console.log your name.
```

```
7.Change the value of the todo1 variable to number(e.g.99)and run typeof todo1. What is the type?
```

```
8.Create 3 variables:month, dayOfMonth, year. Use these variables to console.log today's date in one line in this format:"November 9,2021"
```

```
9.Save the result of 4+5*3 in a variable and console.log the result. Do the same with the result of (4+5)*3. Notice the rules of math are the same in programming (brackets first, then multiply, then add). 
```

```
10.Create a variable age that saves your age(e.g. let age = 25;)Create another 
variable:let message ='I am' + age + 'years old';
What is the type of the message variable?
```

```
11.Change the title that shows up in the tab to 
"< your_name >'s Todo App"(replacing < your_name > with your actual name).
```

```
12.Add your name to the top of the webpage using a < div >.
```

```
13.Reverse the todo list by re-arranging the
 < div>'s in the HTML. Notice that elements are rendered from top to bottom.
 Reverse the list back after to follow along with the rest of the tutorial.
```

```
14.Use Javascript to add a < button > containing the text "Click Me"inside the button.
```
function btn(){
    let btn = document.createElement("button");
    btn.innerHTML = "Read More";
    document.body.appendChild(btn);
}
btn();
```
- 


15.Use Javascript to change the title of the webpage that shows up in the tabs.
```

```
16.Reverse the order of the three todo items on the webpage by re-arranging the Javascript code.Notice how instructions are run one by one and elements are also created one by one.
```

```
17.Create a function named "greeting" that takes 1 parameter, firstName, and uses it to console.log a message saying hello.
Example: greeting('Simon'); => "Hello Simon"
```

```
18.Writea funtion named "toUpper"that converts 1 string parameter "str" to uppercase and console.log the result. Use Google to find the code for converting a string to uppercase in Javascript.
Example:toUpper('Simon'); => "SIMON"
```

```
19.Write a function that converts a parameter "length" from inches to centimeters.
```

```






```
        //funtion name
    //(can be anything you want)
              |  
function addTodo(todoTitle)/parameter(s)/{
    ... /funtion body/
}
```
- Creating a function = defining a function
- Running a funtion = calling a funtion addTodo('new todo');
- Takes a parameter
function addTodo(todoTitle, priority){
    ...
}

- Passing in a value(s)
addTodo('new todo',1);/Argument(s)/
- 

