function displayDetails() {
    const editWrapper = document.querySelector('.editWrapper');

    const selectedCardString = localStorage.getItem('selectedCard');

    if (selectedCardString) {
        const selectedCard = JSON.parse(selectedCardString);
        editWrapper.innerHTML = `
        <h1>${selectedCard.artwork_name}</h1>
        <h2>who is it for? ${selectedCard.who_is_it_for}</h2>
        <h2>Status: ${selectedCard.status}</h2>
        <h2>Deadline: ${selectedCard.deadline}</h2>
        <button class="back">go back</button>
        `
        const back = document.querySelector('.back');
        back.addEventListener("click", handleBack);
    } else {
        editWrapper.innerHTML = `
        <h1>Data must be lost...</h1>
        `
    }
}

function handleBack() {
    window.location.href = "home.html"
}

document.addEventListener('DOMContentLoaded', function() {
    displayDetails();
})