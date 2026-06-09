<script lang="ts">
  import { saveMinutes, getMinutes } from "$lib/services/database";
  import { onMount } from "svelte";

  let meetingId = "";
  let summary = "";
  let decisions = "";
  let actionItems = "";

  let minutes: any[] = [];

  async function loadMinutes() {
    minutes = await getMinutes();
  }

  async function saveMOM() {
    await saveMinutes({
      meetingId,
      summary,
      decisions,
      actionItems
    });

    meetingId = "";
    summary = "";
    decisions = "";
    actionItems = "";

    await loadMinutes();
  }

  onMount(loadMinutes);
</script>

<h1>Meeting Minutes (MOM)</h1>

<div class="form">
  <input
    bind:value={meetingId}
    placeholder="Meeting ID"
  />

  <textarea
    bind:value={summary}
    placeholder="Meeting Summary"
  ></textarea>

  <textarea
    bind:value={decisions}
    placeholder="Key Decisions"
  ></textarea>

  <textarea
    bind:value={actionItems}
    placeholder="Action Items"
  ></textarea>

  <button on:click={saveMOM}>
    Save MOM
  </button>
</div>

<hr>

<h2>Saved Minutes</h2>

{#each minutes as item}
  <div class="card">
    <h3>Meeting #{item.meeting_id}</h3>

    <p><b>Summary:</b></p>
    <p>{item.summary}</p>

    <p><b>Decisions:</b></p>
    <p>{item.decisions}</p>

    <p><b>Actions:</b></p>
    <p>{item.action_items}</p>
  </div>
{/each}

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  min-height: 100px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 10px;
}
</style>