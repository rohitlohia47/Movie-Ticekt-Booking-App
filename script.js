const container = document.querySelector(".container")
const movieSelect = document.getElementById('movie')
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById('count')
const total = document.getElementById('total')

populateUI();

let ticketprice = movieSelect.value

//Function To update The Seat Count and Total Amount And Set The Selected Seats Index In Localstorage 👇👇

const updateCount = () => {
    let selectedSeats = document.querySelectorAll(".row .seat.selected")
    let seatsIndex = [...selectedSeats].map((item) => {
        return [...seats].indexOf(item)  //Checking, whcih seats are selected in the original seats array
    })
    localStorage.setItem('Selected Seats', JSON.stringify(seatsIndex))

    count.innerText = selectedSeats.length
    total.innerText = selectedSeats.length * ticketprice
}

//Function To Set Movie and Price In Localstorage 

const setItems = (movie, price) => {
    localStorage.setItem('Movie', movie)
    localStorage.setItem('Price', price)
}

// Function to get all the saved items from the localstorage and populate then inside the UI
function populateUI() {
    let selectedseats = JSON.parse(localStorage.getItem('Selected Seats'))
    console.log(selectedseats);
    if (selectedseats !== null && selectedseats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedseats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }

        })

        let selctedmovie = localStorage.getItem('Movie')
        movieSelect.selectedIndex = selctedmovie



    }
}

//Function to update the ticket price whenever user change the Movie

movieSelect.addEventListener('change', (e) => {
    ticketprice = e.target.value
    setItems(e.target.selectedIndex, e.target.value)
    updateCount();

})



//Event Listener To Select Seats And Toggle Their Color In UI👇👇

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateCount()
    }

})

updateCount();