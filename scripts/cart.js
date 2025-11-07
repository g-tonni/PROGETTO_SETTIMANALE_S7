const productCartURL = 'https://striveschool-api.herokuapp.com/api/product/'

const key = 'memory-cart'

const cartBadge = document.getElementById('n-cart')

// truccheto trovato per i bottoni delle card già disponibili altrimenti non me li trovava, come se non esistessero, perchè vengono generate con js (almeno credo sia per questo)
// non ho capito perfettamente :| ma funziona
document.addEventListener('click', (e) => {
  const butSel = e.target.closest('.cart-button')
  if (!butSel) return
  // console.log(button)
  const cardSel = butSel.closest('.card')
  const id = cardSel.querySelector('.id-card').innerText
  // console.log(id)

  fetch(productCartURL + id, {
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
      // console.log(data)
      cartElement(data)
      const cartProduct = document.getElementsByClassName('cart-product')
      if (cartProduct.length > 0) {
        cartBadge.classList.remove('d-none')
        cartBadge.innerText = cartProduct.length
      }
      // localStorage.setItem(key, JSON.stringify(data))
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
})

const carrello = document.getElementById('cart-body')
const cartElement = function (prod) {
  carrello.innerHTML += `
   <div class="d-flex align-items-center justify-content-between mb-3 cart-product">
        <div class="rounded-2 overflow-hidden  me-2">
            <img src="${prod.imageUrl}" alt="Puzzle" style="height: 80px; width: 80px" class="img-fluid">
        </div>
        <div class="flex-grow-1">
            <p class="m-0 fw-bold">${prod.name}</p>
            <p class="m-0 mb-1" style="font-size: 14px">${prod.brand}</p>
            <p class="m-0">${prod.price}€</p>
        </div>
        <div>
            <button class="btn btn-danger" onclick="deleteElementCart(event)"><i class="bi bi-trash"></i></button>
        </div>
    </div>
   `
}

const deleteElementCart = function (e) {
  const butSel = e.target
  const elSel = butSel.closest('.cart-product')
  elSel.remove()

  const cartProduct = document.getElementsByClassName('cart-product')
  cartBadge.innerText = cartProduct.length
  if (cartProduct.length < 1) {
    cartBadge.classList.add('d-none')
  }
}
