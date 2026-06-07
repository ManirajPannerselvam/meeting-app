<script lang="ts">
  let message = "";

  let messages = [
    {
      sender: "Mani",
      text: "Welcome to the meeting room."
    }
  ];

  function sendMessage() {
    if (!message.trim()) return;

    messages = [
      ...messages,
      {
        sender: "You",
        text: message
      }
    ];

    message = "";
  }
</script>

<h1>Meeting Chat</h1>

<div class="chat-box">
  {#each messages as msg}
    <div class="message">
      <strong>{msg.sender}</strong>
      <p>{msg.text}</p>
    </div>
  {/each}
</div>

<div class="chat-input">
  <input
    bind:value={message}
    placeholder="Type message..."
  />

  <button on:click={sendMessage}>
    Send
  </button>
</div>

<style>
.chat-box{
  height:400px;
  overflow:auto;
  border:1px solid #ddd;
  padding:15px;
  margin-bottom:15px;
}

.message{
  margin-bottom:10px;
  padding:10px;
  background:#f4f4f4;
  border-radius:6px;
}

.chat-input{
  display:flex;
  gap:10px;
}

.chat-input input{
  flex:1;
  padding:10px;
}
</style>