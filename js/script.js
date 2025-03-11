const signe = document.querySelector('#signe')
const dateJour = document.querySelector('#datejour')
const date = document.querySelector('#date')
const horoscope = document.querySelector('#horoscope')
const image = document.querySelector('aside')
const leftArrow = document.querySelector('.arrow-left')
const rightArrow = document.querySelector('.arrow-right')
const previousSign = document.querySelector('.left-horoscope')
const nextSign = document.querySelector('.right-horoscope')

async function afficherHoroscope(idChoisi) {
  const req = await fetch('/json/horoscope.json')

  const resp = await req.json()

  const prevId = (idChoisi - 2 + 12) % 12 + 1
  const nextId = (idChoisi % 12) + 1
  
  const found = resp.find((element) => element.id === idChoisi)
  const prev = resp.find((element) => element.id === prevId)
  const next = resp.find((element) => element.id === nextId)
  
  previousSign.innerHTML = `${prev.signe} <span>${prev.date}</span>`
  nextSign.innerHTML = `${next.signe} <span>${next.date}</span>`

  const today = new Date()
  const formattedDate = today.toLocaleDateString('fr-FR')
  dateJour.innerText = `Horoscope du ${formattedDate}`

  signe.innerText = found.signe

  date.innerText = `Du ${found.date}`

  horoscope.innerHTML = `
    <p><span>Amour :</span> ${found.amour}</p>
    <p><span>Travail :</span> ${found.travail}</p>
    <p><span>Argent :</span> ${found.argent}</p>
    <p><span>Santé :</span> ${found.sante}</p>
    <p><span>Famille et amis :</span> ${found.famille}</p>
    <p><span>Conseil :</span> ${found.conseil}</p> 
  `

  image.innerHTML = `<img src="${found.image}" alt="${found.signe}">`  
}

function next(){
  idSigne = (idSigne % 12) + 1
  afficherHoroscope(idSigne)
}

function previous(){
  idSigne = (idSigne - 2 + 12) % 12 + 1
  afficherHoroscope(idSigne)
}

leftArrow.addEventListener('click', (e) => {
  e.preventDefault()
  previous()
})

previousSign.addEventListener('click', (e) => {
  e.preventDefault()
  previous()
})

rightArrow.addEventListener('click', (e) => {
  e.preventDefault()
  next()
})

nextSign.addEventListener('click', (e) => {
  e.preventDefault()
  next()
})

let idSigne = 1;

afficherHoroscope(idSigne)