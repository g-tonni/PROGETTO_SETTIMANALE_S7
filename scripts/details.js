const productURL = 'https://striveschool-api.herokuapp.com/api/product/'

const url = location.search
// console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('productID')
// console.log('ID', id)

const body = document.getElementsByTagName('body')

const getProd = function () {
  fetch(productURL + id, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYTk2MmY0YmQ0NzAwMTU4NWIxZDYiLCJpYXQiOjE3NjI1MDMwMTAsImV4cCI6MTc2MzcxMjYxMH0.prkw1wDA1sxtXmDjhPczT415z6zjAuZsvUDuw3Rj2QY',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nella risposta: ', res.status)
      }
    })
    .then((data) => {
      console.log(data)
      createDetailsCard(data)
      body[0].style.background = `linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.83)), url(${data.imageUrl})`
      body[0].style.backgroundSize = 'cover'
      body[0].style.backgroundRepeat = 'no-repeat'
      body[0].style.backgroundPosition = 'top'
      body[0].style.backgroundPosition = 'top'
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}

getProd()

const colDetails = document.getElementById('col-details')
const createDetailsCard = function (prod) {
  colDetails.innerHTML += `
   <div class="card h-100">
     <div class="h-75 overflow-hidden mb-3">
        <img src="${prod.imageUrl}" class="card-img-top" alt="Puzzle">
     </div>
     <div class="card-body d-flex flex-column justify-content-between px-4">
        <div>
            <h5 class="card-title fw-bolder fs-4">${prod.name}</h5>
            <p class="card-text fw-bold opacity-50">${prod.brand}</p>
            <p class="card-text">${prod.description}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
            <p class="card-text fs-5 d-flex align-items-center m-0"><span class="fw-bold fs-3 m-0 me-1">${prod.price}</span><span class="m-0">€</span></p>
            <button class="btn btn-success"><i class="bi bi-cart-plus fs-5"></i></button>
        </div>
     </div>
   </div>
  `
}
