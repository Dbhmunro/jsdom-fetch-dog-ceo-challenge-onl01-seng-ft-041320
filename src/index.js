console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"



function fetchImages() {
    fetch(imgUrl)
    .then(function(resp) {
        return resp.json()
    })
    .then(renderImages)
}

function renderImages(images) {
    const imgDiv = document.getElementById("dog-image-container")
    images.message.forEach(function(image) {
        imgDiv.innerHTML += `<img src=${image} width="500" height="500"></br>`
    })
}

function fetchBreeds() {
    fetch(breedUrl)
    .then(function(resp) {
        return resp.json()
    })
    .then(renderBreeds)
    .then(function() {
        document.getElementById("breed-dropdown").disabled = false
    })
}

function renderBreeds(breeds) {
    const breedListDiv = document.getElementById("dog-breeds")
    for (const breed in breeds.message) {
        // debugger
        breedListDiv.innerHTML += `
        <li class=${breed[0]}>${breed}</li>
        <ul class=${breed[0]}>
        ${breeds.message[breed].map(function(breedType) {
            return `<li>${breedType}</li>`
        }).join("")}
        </ul>
        `
    }
}
    
document.addEventListener("DOMContentLoaded", function() {
    fetchImages()
    fetchBreeds()

    document.getElementById("dog-breeds").addEventListener("click", function(e) {
        let li = e.target
        // console.log(li.tagName)
        if (li.tagName == "LI") {
            li.style.color = "#E8313E"
        }
    })

    document.getElementById("breed-dropdown").onchange = function(e) {
        let startsWith = e.target.value
        const breedListDiv = document.getElementById("dog-breeds")
        for (let i=0; i < breedListDiv.children.length; i++) {
            if (breedListDiv.children[i].className == startsWith) {
                breedListDiv.children[i].hidden = false
            } else {
                breedListDiv.children[i].hidden = true
            }
        }
    }
})
