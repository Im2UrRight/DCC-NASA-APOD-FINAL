// COURTESY COMMENTS! Put your name here or you will lose 20 points.
//Jonathan Ashby
//4/24/2023

//date must be in YYYY-MM-DD format, Must be after 1995-06-16
//test date 11/23/2010
const api_key = 'L6f1Y4xOae6pw2Fj3zNg9PwEt3E6F1WD72FYC4cU'
const apodContainer = document.querySelector('.apod')
const dateInput = document.querySelector('#date')
const apodContainer = document.querySelector('.apod')
const rdmBtn = document.querySelector('#rdm')
const srchBtn = document.querySelector('#srch')

function todayFormat() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`);
    if (!response.ok) {
      throw new Error(`Error communicating with NASA APOD server: ${response.statusText}`);
    }
    const data = await response.json();
    constructor(data);
  } catch (error) {
    console.error(`Error communicating with NASA APOD server: ${error.message}`);
  }
}

//constructor for api
function constructor(apod) {
  clearElement(apodContainer);
  const imageContainer = document.createElement('div');
  const apodImage = new Image();
  const apodImgErr = document.createElement('p');
  const apodCaption = document.createElement('figcaption');
  const apodExpl = document.createElement('p');
  const apodDate = document.createElement('span');

  //internals
  imageContainer.classList.add('apod_image');
  apodImage.src = apod.url;
  apodCaption.innerText = `${apod.title}.`;
  apodDate.innerText = localDate;
  apodDate.classList.add('date');
  apodExpl.innerText = apod.explanation;
  apodExpl.classList.add('expl');
  
  //append
  apodCaption.appendChild(apodDate);
  apodContainer.appendChild(imageContainer);
  imageContainer.appendChild(apodImage);
  imageContainer.appendChild(apodImgErr);
  imageContainer.appendChild(apodCaption);
  apodContainer.appendChild(apodExpl);
  
  // Event listeners
  apodImage.onload = function () {
    apodImgErr.style.display = 'none';
  };
  //errors
  apodImage.onerror = function () {
    apodImage.style.display = 'none';
    apodImgErr.innerText = "Sorry, this image was lost among the stars";
  };
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
  fetchAPOD(randomDate('1995-06-16', todayFormat()));
});

// Initial fetch
fetchAPOD(todayFormat())
