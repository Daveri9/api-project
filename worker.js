
self.onmessage = function (event) {
    // fetch a random dog image from the API
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json()) 
        .then(data => {
            // Send the image URL back to the main thread
            self.postMessage(data.message)
        })
        .catch(error => {

            self.postMessage({ error: 'Error fetching dog image: ' + error.message })
        })
}

