async function sendMessage() {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-history");

  if (input.value.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-bubble user";
  userMessage.textContent = input.value;
  chat.appendChild(userMessage);

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.value })
    });

    const data = await response.json();

    const botMessage = document.createElement("div");
    botMessage.className = "chat-bubble bot";
    botMessage.textContent = data.reply;
    chat.appendChild(botMessage);

    chat.scrollTop = chat.scrollHeight;
    input.value = "";
  } catch (err) {
    console.error("Error:", err);
  }
  let userQuestions = []; 
  input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userMessage = input.value.trim();
    if (userMessage) {
      addMessage('user', userMessage);

      // ✅ Save question
      userQuestions.push(userMessage);
      saveQuestions();  // Save to localStorage

      input.value = '';

      // Simulate bot response
      setTimeout(() => {
        addMessage('bot', `You said: ${userMessage}`);
      }, 500);
    }
  }
});
}