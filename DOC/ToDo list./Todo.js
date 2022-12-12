//-- 指定 dom
var listTo = document.querySelector('.listTo');   //事件列表
var sendData = document.querySelector('.btn-addNew');   //新增事件按鈕
var data = JSON.parse(localStorage.getItem('listData')) || [];   //將事件從轉JSON資料轉成陣列


//-- 綁定監聽事件
sendData.addEventListener('click', addlistTo);   //點擊新增按鈕的事件監聽
listTo.addEventListener('click', listDone);   //點擊刪除按鈕的事件監聽
updateList(data);   //更新事件


//-- 加入待辦事件，並同步更新網頁與 localstorage
function addlistTo(e) {
  e.preventDefault();  //避免原本的動作執行
  
  var text = document.querySelector('.event').value;  //取得輸入在input的值
  var todo = {
    content: text  //定義todo物件
  };
  data.push(todo);  //增加入待辦事件到陣列中
  // console.log(todo);
  
  updateList(data);  //更新網頁內容
  localStorage.setItem('listData', JSON.stringify(data));  //將待辦事件轉化成 JSON 字串 
  console.log(data);
};


//-- 更新網頁內容
function updateList(items) {
  str = '';
  var len = items.length;
  
  for(var i =0; len > i; i++){
    str += '<li><span>' + items[i].content + '</span><i class="fas fa-trash-alt" data-listnum=' + i + ' ></i></li>';
  }
  listTo.innerHTML = str;
};


//-- 刪除待辦事項
function listDone(e) {
  e.preventDefault();  //避免原本的動作執行
  console.log(e.target.nodeName);  //確認點到的元素
  if(e.target.nodeName !== 'I'){return};  //若沒有點到刪除icon的話，則中斷function
  
  var listnum = e.target.dataset.listnum;  //定義選到的待辦事項
  data.splice(listnum, 1);  //刪除事項
  
  //更新網頁內容
  localStorage.setItem('listData', JSON.stringify(data));
  updateList(data);
};