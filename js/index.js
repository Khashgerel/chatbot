    async function sendMessage() {
        const input = document.getElementById("user-input");
        const chat = document.getElementById("chat-history");

        if (input.value.trim() === "") return;

        const userText = input.value;

        const userMessage = document.createElement("div");
        userMessage.className = "chat-bubble user";
        userMessage.textContent = userText;
        chat.appendChild(userMessage);

        input.value = "";

        const botMessage = document.createElement("div");
        botMessage.className = "chat-bubble bot";
        botMessage.textContent = "Typing...";
        chat.appendChild(botMessage);
        chat.scrollTop = chat.scrollHeight;

        try {
            const response = await fetch(`https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/chat/?query=${userText}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
                
            });

            const data = await response.json();
            botMessage.textContent = data || "Sorry, I couldn't get a response.";
        } catch (error) {
            botMessage.textContent = "Error fetching response.";
            console.error(error);
        }

        chat.scrollTop = chat.scrollHeight;
    }