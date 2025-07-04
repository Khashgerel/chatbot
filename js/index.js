async function sendMessage() {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-history");

  if (input.value.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-bubble user";
  userMessage.textContent = input.value;
  chat.appendChild(userMessage);

  const getDate = new Date();
  const dateMonth = getDate.getMonth() + 1;
  const dateDay = getDate.getDay() - 1;
  const dateHourMinute = getDate.getHours() + ":" + getDate.getMinutes();
  const lineBreak = document.createElement("br");
  const dateMonthDayYear = dateMonth + "/" + dateDay + "/" + getDate.getFullYear();
  const realDate = dateHourMinute + "\n" + dateMonthDayYear;
  realDate.className = 'realDate';
        
  const realDatePart = document.createElement("div");
  realDatePart.textContent = realDate;
  realDatePart.className = 'realDate';

  for (let i = 0; i < 1; i++) {
    const conversationHistoryTitle = document.createElement("div");
    conversationHistoryTitle.className = "conversationHistoryTitle";
    conversationHistoryTitle.textContent = userText;
    ChatHistory.appendChild(conversationHistoryTitle);
    conversationHistoryTitle.appendChild(realDatePart);
    }
 

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

      userQuestions.push(userMessage);
      saveQuestions();

      input.value = '';

      setTimeout(() => {
        addMessage('bot', `You said: ${userMessage}`);
      }, 500);
    }
  }
});
chatHistory.push({ text, sender });
localStorage.setItem("chat", JSON.stringify(chatHistory));
}