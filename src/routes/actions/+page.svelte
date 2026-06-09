<script lang="ts">
  import { saveAction, getActions } from "$lib/services/database";
  import { onMount } from "svelte";

  let task = "";
  let owner = "";
  let dueDate = "";

  let actions: any[] = [];

  async function loadActions() {
    actions = await getActions();
  }

  async function addAction() {
    await saveAction({
      meetingId: 0,
      task,
      owner,
      dueDate,
      status: "Open"
    });

    task = "";
    owner = "";
    dueDate = "";

    await loadActions();
  }

  onMount(loadActions);
</script>

<h1>Action Tracker</h1>

<div class="form">
  <input
    bind:value={task}
    placeholder="Task"
  />

  <input
    bind:value={owner}
    placeholder="Owner"
  />

  <input
    type="date"
    bind:value={dueDate}
  />

  <button on:click={addAction}>
    Add Action
  </button>
</div>

<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Owner</th>
      <th>Due Date</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {#each actions as action}
      <tr>
        <td>{action.task}</td>
        <td>{action.owner}</td>
        <td>{action.due_date}</td>
        <td>{action.status}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
.form{
  display:flex;
  gap:10px;
  margin-bottom:20px;
}

table{
  width:100%;
  border-collapse:collapse;
}

th,td{
  border:1px solid #ddd;
  padding:8px;
}
</style>