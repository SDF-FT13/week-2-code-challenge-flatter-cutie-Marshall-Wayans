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
});document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const nameDisplay = document.getElementById("name");
    const imageDisplay = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const newCharacterForm = document.getElementById("character-form");
    const newNameInput = document.getElementById("new-name");
    const newImageInput = document.getElementById("image-url");
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

            
            fetch(`${baseURL}/${currentCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ votes: currentCharacter.votes })
            });
        }
    });


    resetButton.addEventListener("click", () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            voteCount.textContent = 0;

            
            fetch(`${baseURL}/${currentCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ votes: 0 })
            });
        }
    });

    
    newCharacterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newName = newNameInput.value.trim();
        const newImage = newImageInput.value.trim();

        if (newName && newImage) {
            const newCharacter = {
                name: newName,
                image: newImage,
                votes: 0
            };

            
            fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCharacter)
            })
            .then(response => response.json())
            .then(character => {
                
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);

                
                displayCharacter(character);
            });

            
            newNameInput.value = "";
            newImageInput.value = "";
        }
    });
});