<script lang="ts">
  import { saveChat, getChats }
    from "$lib/services/database";

  let meetingId = 1;
  let sender = "";
  let message = "";

  let messages: any[] = [];

  async function loadChat() {
    messages = await getChats(meetingId);
  }

  async function sendMessage() {
    if (!message) return;

    await saveChat({
      meetingId,
      sender,
      message
    });

    message = "";

    await loadChat();
  }

  loadChat();
</script>

<h1>Meeting Chat</h1>

<div class="chatbox">
  {#each messages as msg}
    <div class="msg">
      <b>{msg.sender}</b>

      <p>{msg.message}</p>

      <small>
        {msg.created_at}
      </small>
    </div>
  {/each}
</div>

<div class="input-area">
  <input
    bind:value={sender}
    placeholder="Your Name"
  />

  <input
    bind:value={message}
    placeholder="Type Message"
  />

  <button on:click={sendMessage}>
    Send
  </button>
</div>

<style>
.chatbox{
  height:400px;
  overflow:auto;
  border:1px solid #ddd;
  padding:10px;
}

.msg{
  margin-bottom:10px;
  padding:8px;
  border-radius:5px;
  background:#f5f5f5;
}

.input-area{
  display:flex;
  gap:10px;
  margin-top:10px;
}
</style>