document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameDisplay = document.getElementById("name");
    const imageDisplay = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    let currentCharacter = null;

    
    fetch(baseURL)
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });

    
    function displayCharacter(character) {
        currentCharacter = character;
        nameDisplay.textContent = character.name;
        imageDisplay.src = character.image;
        imageDisplay.alt = character.name;
        voteCount.textContent = character.votes;
    }

    
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (currentCharacter) {
            const additionalVotes = parseInt(voteInput.value) || 0;
            currentCharacter.votes += additionalVotes;
            voteCount.textContent = currentCharacter.votes;
            voteInput.value = "";
        }
    });

    
    resetButton.addEventListener("click", () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            voteCount.textContent = 0;
        }
    });
});