// 29. 複製 main.js 並刪除不需要的元素 創建 favorite.js
const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users/"
const USER_PER_PAGE = 36 // 一頁顯示 36 位用戶

const favoriteList = JSON.parse(localStorage.getItem('Favorite')) || [] // 此頁面只需用到 favoriteList

const dataPanel = document.querySelector("#data-panel")
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

console.log(favoriteList)

let viewingPage = 1
let previousViewingPage = 1

// 30. renderUserList 只留已 favorite 的 HTML
function renderUserList(data) {
  let HTMLText = ""

  data.forEach(user => {
    const id = user.id
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
  })
  dataPanel.innerHTML = HTMLText
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

// 31. Modal 裡 依性別區分 LIKED 顏色
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

      // 依性別區分 LIKED 顏色
      if (data.gender === "male") {
        modalLike.innerHTML = `<div class="p-2 m-0 rounded" style="color: white; font-size: 12px; background-color: #007BFF"> LIKED <i class="fas fa-heart"></i>`
      } else {
        modalLike.innerHTML = `<div class="p-2 m-0 rounded" style="color: white; font-size: 12px; background-color: #DC3545"> LIKED <i class="fas fa-heart"></i>`
      }
    })
    .catch((err) => console.log(err))
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  // console.log(event.target)
  if (event.target.tagName === "IMG") {
    const id = event.target.dataset.id
    showUserInfoModal(id)
  }
})

function addToFavorite(id) {
  const thisUser = favoriteList.find((user) => user.id === id)
  favoriteList.push(thisUser)
  localStorage.setItem('Favorite', JSON.stringify(favoriteList))
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

function removeFromFavorite(id) {
  const thisUser = favoriteList.findIndex(user => user.id === id)
  favoriteList.splice(thisUser, 1)
  localStorage.setItem('Favorite', JSON.stringify(favoriteList))
  favoriteTab.innerHTML = `Favorite (${favoriteList.length})`
}

// 無需確認是否有在 favoriteList 裡
dataPanel.addEventListener("click", function onPanelClicked(event) {
  // console.log(event.target)
  if (event.target.matches('.fa-heart')) {
    const id = Number(event.target.dataset.id)
    const thisUser = favoriteList.find((user) => user.id === id)

    if (confirm('確定要取消收藏嗎 ( ´•︵•` )？')) {
      removeFromFavorite(id)
      event.target.classList.remove('fas')
      event.target.classList.add('far')
      event.target.style.color = '#f0f0f0'
      alert(`已將 ${thisUser.name} 從收藏清單移除 (╥﹏╥)`);
    } else {
      alert('太棒了！' + `${thisUser.name} 仍在您的收藏清單唷 (*ﾟ∀ﾟ*)♡`);
    }
    renderPaginator(favoriteList.length)
    renderUserList(getUsersByPage(1))
  }
})

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

function getUsersByPage(page) {
  const startIndex = (page - 1) * USER_PER_PAGE
  return favoriteList.slice(startIndex, startIndex + USER_PER_PAGE)
}

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

function changePaginatorStyle(data) {
  data.toggle('bg-secondary')
  data.toggle('text-white')
  data.toggle('text-secondary')
}

modalEmail.addEventListener("mouseenter", function onModalEmailHover(event) {
  const emailIcon = event.target.children[0].children[0]
  emailIcon.classList.remove('far')
  emailIcon.classList.add('fas')
})

modalEmail.addEventListener("mouseleave", function onModalEmailHover(event) {
  const emailIcon = event.target.children[0].children[0]
  emailIcon.classList.remove('fas')
  emailIcon.classList.add('far')
})

// 32. renderUserList by pages
renderPaginator(favoriteList.length)
renderUserList(getUsersByPage(viewingPage))