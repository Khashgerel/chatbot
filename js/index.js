document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById("user-input");
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-history");
  const chatHistory = document.getElementById("conversation-history");

  if (input.value.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-bubble user";
  userMessage.textContent = input.value;
  chat.appendChild(userMessage);

  const getDate = new Date();
  const dateMonth = getDate.getMonth() + 1;
  const dateDay = getDate.getDate(); // Fixed: getDate() for day of month
  const dateHourMinute = getDate.getHours() + ":" + getDate.getMinutes();
  const dateMonthDayYear = dateMonth + "/" + dateDay + "/" + getDate.getFullYear();
  const realDate = dateHourMinute + "\n" + dateMonthDayYear;

  const realDatePart = document.createElement("div");
  realDatePart.textContent = realDate;
  realDatePart.className = 'realDate';

  const conversationHistoryTitle = document.createElement("div");
  conversationHistoryTitle.className = "conversationHistoryTitle";
  conversationHistoryTitle.textContent = input.value; // Fixed: use input.value
  chatHistory.appendChild(conversationHistoryTitle);
  conversationHistoryTitle.appendChild(realDatePart);

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
}