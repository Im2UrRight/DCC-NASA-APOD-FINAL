// COURTESY COMMENTS! Put your name here or you will lose 20 points.
//Jonathan Ashby
//4/24/2023

//date must be in YYYY-MM-DD format, Must be after 1995-06-16
//test date 11/23/2010
const api_key = 'L6f1Y4xOae6pw2Fj3zNg9PwEt3E6F1WD72FYC4cU'
const apiContainer = document.querySelector('.apod')
const dateInput = document.querySelector('#date')
const apodContainer = document.querySelector('.apod')
const rdmBtn = document.querySelector('#rdm')
const srchBtn = document.querySelector('#srch')
let today = todayFormat()

//set max for date input
dateInput.max = today
//toISOString always uses UTC time so can't use this unless i account for that
function todayFormat() {
    var now = new Date();
    var yyyy = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return ''+yyyy+'-'+mm+'-'+dd;
}

// to get a randome date
function randomDate(minDate, maxDate) {
  const min = new Date(minDate);
  const max = new Date(maxDate);
  const randomTime = min.getTime() + Math.random() * (max.getTime() - min.getTime());
  return new Date(randomTime).toISOString().slice(0, 10); 
}

//use fetch api to get info
async function fetchAPOD(date) {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
    .then(data => data.json())
    .catch(error => {
      console.error(`Error communicating with NASA APOD server: ${error.message}`)
    })
    constructor(response)
  }


//constructor for api
function constructor(apod) {
  clearElement(apiContainer)
  
  let localDate = new Date(apod.date).toLocaleString()
  localDate = localDate.slice(0, localDate.indexOf(','))
  const imageContainer = document.createElement('div')
  const apodImage = new Image()
  const apodImgErr = document.createElement('p')
  const apodCaption = document.createElement('figcaption')
  const apodExpl = document.createElement('p')
  const apodDate = document.createElement('span')

  //internals
  imageContainer.classList.add('apod_image')
  apodImage.src = apod.url
  apodCaption.innerText = `${apod.title}. `
  apodDate.innerText = localDate
  apodDate.classList.add('date')
  apodExpl.innerText = apod.explanation
  apodExpl.classList.add('expl')
  
  //append
  apodCaption.appendChild(apodDate)
  apiContainer.appendChild(imageContainer)
  imageContainer.appendChild(apodImage)
  imageContainer.appendChild(apodImgErr)
  imageContainer.appendChild(apodCaption)
  apiContainer.appendChild(apodExpl)

  //event listeners

  //errors
  apodImage.onerror = function() {
    apodImage.display = 'hidden'
    apodImgErr.innerText = "Sorry, this image was lost amoungst the stars"
  } 
}
//clear element
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

//Event listeners
srchBtn.addEventListener('click', e => {
  e.preventDefault()
  fetchAPOD(dateInput.value)
})

rdmBtn.addEventListener('click', e => {
  e.preventDefault()
  fetchAPOD(randomDate('1995-06-16', today))
})

fetchAPOD(today)