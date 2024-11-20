const url = 'https://dog.ceo/api/breeds/image/random'

// function to fetch dog images using async/await
async function fetchDogImage() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('failed to fetch dog image')
        }
        const data = await response.json()
        const breedName = extractBreed(data.message) 
        displayDogImagesWithBreed(data.message, breedName)
    } 
    catch (error) {
        console.error('error:', error.message)
    }
}

// function to extract breed name from image url
function extractBreed(url) {
    const parts = url.split('/');
    return parts[parts.length - 2].replace('-', ' ');
}

// function that fetches multiple images using promises 
function fetchMultipleImages() {
    const numOfImages = 4
    const urls = Array(numOfImages).fill(url)

   Promise.all(
    urls.map(function(url) {
        return fetch(url).then(function (response) {
            if (!response.ok) {
                throw new Error('failed to fetch dog image')
            }
            return response.json()
        })
    })
)
    .then(function (dataArray) {
        console.log('all fetched images:', dataArray.map(function (data) {
            return data.message
        }))
        
        // use Promise.any() to get the first successful image
        return Promise.any(
            dataArray.map(function (data) {
                return Promise.resolve(data.message)
            })
        )
        .then(function (firstSuccessfulImage) {
            console.log('success getting first image:', firstSuccessfulImage)
        })
        .catch(function (error) {
            console.error('error in Promise.any:', error.message)
        })
        .finally(function () {
            // to display all fetched images
            dataArray.forEach(function (data) {
                const breedName = extractBreed(data.message)
                displayDogImagesWithBreed(data.message, breedName)
            })
        })
    })
    .catch(function (error) {
        console.error('error fetching multiple images:', error.message)
    })
}

// function to display the dog image with breed name
function displayDogImagesWithBreed(url, breed) {
    const container = document.getElementById('dog-image-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${breed}</h3>
      <img src="${url}" alt="${breed}" />
    `;
    container.appendChild(card);
  }

// event listener for button to fetch/display multiple dog images 
document.getElementById('fetch-button').addEventListener('click', fetchMultipleImages);


// event listener for button effects
const button = document.getElementById('fetch-button')

button.addEventListener('click', () => {
    button.classList.add('clicked')

    // to reset the buttons appearance 
    setTimeout(() => {
        button.classList.remove('clicked')
    }, 200);
})

// fetches a single image first, before button is pushed 
fetchDogImage()