const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const USER_PER_PAGE = 36 // 一頁顯示 36 位用戶

const users = []
const favoriteList = JSON.parse(localStorage.getItem('Favorite')) || []

let filteredUsers = []

const dataPanel = document.querySelector("#data-panel")
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#name-search-input')
const genderFilter = document.querySelector('#gender-filter')
const favoriteTab = document.querySelector('#nav-favorite-tab')
const paginator = document.querySelector('#paginator')

const modalName = document.querySelector("#modal-name")
const modalImage = document.querySelector("#modal-image")
const modalGender = document.querySelector("#modal-gender")
const modalBirthday = document.querySelector("#modal-birthday")
const modalAge = document.querySelector("#modal-age")
const modalRegion = document.querySelector("#modal-region")
const modalEmail = document.querySelector('#modal-email')
const modalLike = document.querySelector("#modal-like")
const userInfo = document.querySelector("#userInfo")

let viewingPage
let previousViewingPage

// 5. 透過 axios 取得 Index API 裡的資料，並將資料存進 users 資訊
axios
  .get(INDEX_URL)
  .then(res => {
    // Array(200)
    users.push(...res.data.results)

    users.forEach(user => {
      // add fullName key-value
      const fullname = `${user.name} ${user.surname}`
      user.fullname = fullname

      // add genderColor key-value
      if (user.gender === "male") {
        user.genderColor = '#007BFF'
      } else {
        user.genderColor = '#DC3545'
      }
    })
    refreshPaginator(users)
  })
  .catch(err => console.log(err))

// 6. 將 users 資訊呈現在首頁
function renderUserList(data) {
  let HTMLText = ""

  data.forEach(user => {
    // console.log(user)
    // 讀取每位 user 的 id, name, avatar 放進首頁 user 資訊
    const id = user.id
    // 16. 畫面初始 render 資料時，已在 favoriteList 的給 "彩色實心"
    if (favoriteList.some(user => user.id === id)) {
      HTMLText += `
        <div class="col-sm-4 col-md-3 col-lg-2 col-xl-1 px-3">
          <a class="card-photo mb-2" style="cursor: pointer" data-toggle="modal" data-target="#userInfoModal">
            <img src="${user.avatar}" class="card-img-top rounded" alt="User Profile Picture" data-id="${user.id}">
          </a>
          <div class="card-info d-flex justify-content-between align-items-center">
            <p class="card-name fs-6 text-center mt-2">${user.name}</p>
            <i class="fas fa-heart" data-id="${user.id}" style="font-size: 12px; color: ${user.genderColor}; cursor: pointer;"></i>
          </div>
      </div>
      `
    } else {
      HTMLText += `
        <div class="col-sm-4 col-md-3 col-lg-2 col-xl-1 px-3">
          <a class="card-photo mb-2" style="cursor: pointer" data-toggle="modal" data-target="#userInfoModal">
            <img src="${user.avatar}" class="card-img-top rounded" alt="User Profile Picture" data-id="${user.id}">
          </a>
          <div class="card-info d-flex justify-content-between align-items-center">
            <p class="card-name fs-6 text-center mt-2">${user.name}</p>
            <i class="far fa-heart" data-id="${user.id}" style="font-size: 12px; color: #f0f0f0; cursor: pointer;"></i>
          </div>
      </div>
      `
    }
  })
  dataPanel.innerHTML = HTMLText
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

// 7. 透過 axios 取得特定 uid 在 Show API 裡的資料，並呈現在 Modal 中
function showUserInfoModal(id) {
  axios
    .get(INDEX_URL + id)
    .then(res => {
      const data = res.data

      modalName.innerText = `${data.name} ${data.surname}`
      modalAge.innerText = data.age
      modalRegion.innerText = data.region
      modalImage.innerHTML = `<img src="${data.avatar}" class="rounded">`
      modalBirthday.innerHTML = `<i class="fas fa-birthday-cake mr-1" style="color: #6c757d"></i> ${data.birthday}`

      // 顯示符合 gender 的 icon
      modalGender.innerHTML = `<i class="fas fa-${data.gender} ml-1 mr-2" style="color: #6c757d"></i> ${data.gender}`

      // 僅顯示縮短版的 email 
      const shortenEmail = data.email.slice(0, data.email.indexOf('@'))
      modalEmail.innerHTML = `<a href="mailto:${data.email}" style="text-decoration: none; color:inherit;"><i class="far fa-envelope mr-1" style="color:#6c757d;"></i> ${shortenEmail} </a>`
      
      // 19. 依照有無在 favoriteList & 性別顏色 區分 liked button
      if (favoriteList.some(user => user.id === data.id)) {
        // console.log('在清單')
        let likedColor = ''
        if (data.gender === "male") {
          likedColor = '#007BFF'
        } else {
          likedColor = '#DC3545'
        }
        modalLike.innerHTML = `<div class="p-2 m-0 rounded" style="color: white; font-size: 12px; background-color: ${likedColor}"> LIKED <i class="fas fa-heart"></i>`
      } else {
        // console.log('不在清單')
        modalLike.innerHTML = ''
      }
    })
    .catch((err) => console.log(err))
}

// 8. 在 dataPanel 裝監聽器，當點擊到 IMG 時會跳出 Modal
dataPanel.addEventListener('click', function onPanelClicked(event) {
  // console.log(event.target)
  if (event.target.tagName === "IMG") {
    const id = event.target.dataset.id
    // console.log(id)
    showUserInfoModal(id)
  }
})

// 10. 在 searchForm 裝監聽器，當輸入 input 按下 search 後，顯示搜尋結果
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(keyword)
  )

  // error handling
  if (filteredUsers.length === 0) {
    return alert('Cannot find user with name: ' + keyword)
  }

  refreshPaginator(filteredUsers)
})

// !! 搜尋 keyword 動態顯示搜尋結果
// !! 也新增 backspace 到 keyword = 0 時，重新 render 畫面
searchInput.addEventListener('input', function timelySearch() {
  const keyword = searchInput.value.trim().toLowerCase()

  // 一有 keyword 就開始搜尋
  if (keyword.length > 0 ) {
    filteredUsers = users.filter(user =>
      user.fullname.toLowerCase().includes(keyword)
    )
    if (filteredUsers.length) {
      refreshPaginator(filteredUsers)
    } else {
      dataPanel.innerHTML = '<div class="p-3 m-auto"><h1 style="color: coral;">NOT FOUND!&ensp;:(</h1></div>'
      paginator.innerText = ''
    }
  }
})

// 11. 在 searchInput 區塊輸入關鍵字後，按下 enter 亦可搜尋
searchInput.addEventListener('keydown', function onSearchInputClicked(event) {
  // console.log(event.code)
  const keyword = searchInput.value.trim().toLowerCase()
  if (event.code === 'Enter') {
    filteredUsers = users.filter(user =>
      user.fullname.toLowerCase().includes(keyword)
    )

    // error handling
    if (filteredUsers.length === 0) {
      return alert('Cannot find user with name: ' + keyword)
    }
    
    refreshPaginator(filteredUsers)
  }
  if ((event.code === 'Backspace') && (keyword.length === 1) ) {
    filteredUsers = [] // 清空之前的搜尋紀錄
    refreshPaginator(users)
  }
})

// 13. 在 genderFilter 裝監聽器，按下 button 後，會篩選出不同性別
genderFilter.addEventListener('click', function onGenderFilterClicked(event) {
  switch (event.target.id) {
    case "gender-male":
      filteredUsers = users.filter(user => user.gender === "male")
      event.target.innerHTML = `Male <i class="fas fa-male"></i> (${filteredUsers.length})`
      refreshPaginator(filteredUsers)
      break;
    case "gender-female":
      filteredUsers = users.filter(user => user.gender === "female")
      event.target.innerHTML = `Female <i class="fas fa-female"></i> (${filteredUsers.length})`
      refreshPaginator(filteredUsers)
      break;
    case "gender-all":
      filteredUsers = [] // 點選 all 即清空 filtered 選項
      event.target.innerHTML = `All <i class="fas fa-male"></i> <i class="fas fa-female"></i> (${users.length})`
      refreshPaginator(filteredUsers)
      break;
  }
})

// 14. 新增 addToFavorite 函式，透過 uid 將按讚的用戶收藏進 favoriteList
function addToFavorite(id) {
  const thisUser = users.find((user) => user.id === id)
  favoriteList.push(thisUser)
  localStorage.setItem('Favorite', JSON.stringify(favoriteList))
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

// 17. 新增 removeFromFavorite 函式，可將已收藏的用戶從 favoriteList 中移除
function removeFromFavorite(id) {
  const thisUser = favoriteList.findIndex(user => user.id === id)
  favoriteList.splice(thisUser, 1)
  localStorage.setItem('Favorite', JSON.stringify(favoriteList))
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

// 15. 在 like button 裝監聽器，點選 like 後，愛心會依照性別變色/實心 & 新增用戶進 favoriteList
dataPanel.addEventListener("click", function onPanelClicked(event) {
  // console.log(event.target)
  if (event.target.matches('.fa-heart')) {
    const id = Number(event.target.dataset.id)
    const thisUser = users.find((user) => user.id === id)
    // 18. 在 like button 裝監聽器函式中，增加辨別是否已在 favoriteList 及 confirm 訊息
    if (favoriteList.some(user => user.id === id)) {
      if (confirm('您已經給過 like 啦！已收藏 (　ﾟ∀ﾟ) ﾉ♡ \n如果想取消收藏,請按下 "確認"')) {
        removeFromFavorite(id)
        event.target.classList.remove('fas')
        event.target.classList.add('far')
        event.target.style.color = '#f0f0f0'
        alert(`已將 ${thisUser.name} 從收藏清單移除 (╥﹏╥)`);
      } else {
        alert('結束這回合 (´･_･`)\n' + `${thisUser.name} 還在您的收藏清單中唷！`);
      }
    } else {
      addToFavorite(id)
      // 把空心變實心
      event.target.classList.remove('far')
      event.target.classList.add('fas')
      // 更換實心顏色
      event.target.style.color = thisUser.genderColor
    }
  }
})

// 21. 新增 renderPaginator 函式，依照用戶筆數渲染出分頁數目
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / USER_PER_PAGE)

  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    if (page === Number(viewingPage)) {
      rawHTML += `<li class="page-item"><a class="page-link text-white bg-secondary" href="#" data-page="${page}">${page}</a></li>`
    } else {
      rawHTML += `<li class="page-item"><a class="page-link text-secondary" href="#" data-page="${page}">${page}</a></li>`
    }
  }
  paginator.innerHTML = rawHTML
}

// 22. 新增 getUsersByPage 函式，依照頁碼呈現當頁的用戶資料
function getUsersByPage(page) {
  const data = filteredUsers.length ? filteredUsers : users
  const startIndex = (page - 1) * USER_PER_PAGE
  return data.slice(startIndex, startIndex + USER_PER_PAGE)
}

// 23. 在 paginator 裝監聽器，點選不同頁碼時會呈現該頁面的用戶資料
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  viewingPage = Number(event.target.dataset.page)
  changePaginatorStyle(event.target.classList)

  if (previousViewingPage) {
    let previousPageClass = event.target.parentElement.parentElement.children[previousViewingPage - 1].children[0].classList
    console.log(event.target.parentElement)
    changePaginatorStyle(previousPageClass)
  }

  previousViewingPage = Number(event.target.dataset.page)
  renderUserList(getUsersByPage(viewingPage))
})

// 24. 切換頁碼時，按鈕樣式會跟著變化，方便使用者知道「當前頁面」
function changePaginatorStyle(data) {
  data.toggle('bg-secondary')
  data.toggle('text-white')
  data.toggle('text-secondary')
}

// 25. 新增 refreshPaginator 函式，當資料有 filter 時頁碼要跟著重置
function refreshPaginator(data) {
  const showUsers = data.length ? data : users
  viewingPage = 1 // filter 後要將 viewingPage 修正回 1
  previousViewingPage = 1 // previousViewingPage 也要修正回 1

  // renderUserList by pages
  renderPaginator(showUsers.length)
  renderUserList(getUsersByPage(viewingPage))
}

// 27. 新增 email icon 監聽器，當滑鼠滑到 email icon 時，變實心提醒用戶可點擊
modalEmail.addEventListener("mouseenter", function onModalEmailHover(event) {
  // console.log(event.target.children[0].children[0]) // HTMLCollection
  // console.log('mouseenter')
  const emailIcon = event.target.children[0].children[0]
  emailIcon.classList.remove('far')
  emailIcon.classList.add('fas')
})

modalEmail.addEventListener("mouseleave", function onModalEmailHover(event) {
  // console.log('mouseleave')
  const emailIcon = event.target.children[0].children[0]
  emailIcon.classList.remove('fas')
  emailIcon.classList.add('far')
})