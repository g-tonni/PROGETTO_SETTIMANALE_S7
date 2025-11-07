const productURL = 'https://striveschool-api.herokuapp.com/api/product/'

const getProduct = function () {
  fetch(productURL, {
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
      data.forEach((prod) => {
        createCard(prod)
      })

      const buttonDetails = document.getElementsByClassName('button-details')
      for (let i = 0; i < buttonDetails.length; i++) {
        buttonDetails[i].setAttribute(
          'href',
          'details.html?productID=' + data[i]._id
        )
      }
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}

getProduct()

const row = document.getElementById('row-product')

const createCard = function (prod) {
  row.innerHTML += `
  <div class="col col-12 col-md-4 col-lg-3">
   <div class="card h-100">
     <div class="h-75">
        <img src="${prod.imageUrl}" class="card-img-top" alt="Puzzle">
     </div>
     <div class="card-body d-flex flex-column justify-content-between">
       <h5 class="card-title fw-bold mb-0">${prod.name}</h5>
       <p class="card-text">${prod.brand}</p>
       <p class="card-text"><span class="fw-bold fs-5">${prod.price}</span> €</p>
       <p class="d-none id-card">${prod._id}</p>
       <div class="d-flex justify-content-between">
          <a class="btn btn-dark m-0 d-flex align-items-center button-details rounded-pill">
             <p class="m-0" style="font-size: 12px">SCOPRI DI PIU'</p>
          </a>
          <button class="btn btn-primary cart-button rounded-circle"><i class="bi bi-cart-plus fs-5"></i></button>
       </div>
     </div>
   </div>
  </div>
  `
}
