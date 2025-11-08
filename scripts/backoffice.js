let productURL = 'https://striveschool-api.herokuapp.com/api/product/'
let finalUrl

const url = location.search
// console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('productID')
// console.log('ID', id)

// CLASSE PER GENERARE PRODOTTO
class Product {
  constructor(_name, _description, _brand, _image, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _image
    this.price = _price
  }
}

// RECUPERO TUTTI GLI ELEMENTI DEL FORM
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const imageInput = document.getElementById('image')
const priceInput = document.getElementById('price')

const resetButton = document.getElementById('reset-button')

let metodo

if (id) {
  metodo = 'PUT'
  finalUrl = productURL + id
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
      nameInput.value = data.name
      descriptionInput.value = data.description
      brandInput.value = data.brand
      imageInput.value = data.imageUrl
      priceInput.value = data.price
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
} else {
  metodo = 'POST'
  finalUrl = productURL
}

const form = document.getElementById('form-product')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = nameInput.value
  const description = descriptionInput.value
  const brand = brandInput.value
  const image = imageInput.value
  const price = priceInput.value

  const newProduct = new Product(name, description, brand, image, price)
  console.log(newProduct)

  fetch(finalUrl, {
    method: metodo,
    body: JSON.stringify(newProduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYTk2MmY0YmQ0NzAwMTU4NWIxZDYiLCJpYXQiOjE3NjI1MDMwMTAsImV4cCI6MTc2MzcxMjYxMH0.prkw1wDA1sxtXmDjhPczT415z6zjAuZsvUDuw3Rj2QY',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('PRODOTTO SALVATO')
        window.location.href = `backoffice.html`
      } else {
        throw new Error('Errore nella risposta: ', res.status)
      }
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })

  form.reset()
})

resetButton.addEventListener('click', () => {
  form.reset()
})

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
        createProd(prod)
      })
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}

getProduct()

const colProd = document.getElementById('shop-products')

const createProd = function (prod) {
  colProd.innerHTML += `
    <div class="d-flex flex-column mb-4 shadow-sm p-3 rounded-2 border border-secondary-subtle">
      <div class="d-flex align-items-center"> 
        <div style="height: 60px; width: 60px;" class="me-2">
            <img src="${prod.imageUrl}" alt="Puzzle" class="img-fluid">
        </div>
        <div>
            <p class="fw-bold m-0">${prod.name}</p>
            <p class="m-0" style="font-size: 14px">ID: ${prod._id}</p>      
        </div>
      </div>
       <div class="d-flex align-items-center justify-content-between w-100 mt-3">
         <button class="btn btn-primary" onclick="editProd('${prod._id}')">MODIFICA</button>
         <button class="btn btn-danger" onclick="deleteProd('${prod._id}')" >ELIMINA</button>
       </div>
    </div>
    `
}

const deleteProd = function (id) {
  fetch(productURL + id, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYTk2MmY0YmQ0NzAwMTU4NWIxZDYiLCJpYXQiOjE3NjI1MDMwMTAsImV4cCI6MTc2MzcxMjYxMH0.prkw1wDA1sxtXmDjhPczT415z6zjAuZsvUDuw3Rj2QY',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('PRODOTTO ELIMINATO')
        location.reload()
      } else {
        throw new Error('Errore nella risposta: ', res.status)
      }
    })
    .catch((err) => {
      console.log('ERRORE: ', err)
    })
}

const editProd = function (id) {
  window.location.href = `backoffice.html?productID=${id}`
}
