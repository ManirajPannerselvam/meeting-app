<script lang="ts">
  import { onMount } from "svelte";
import { browser } from "$app/environment";
  import { getActions, addAction } from "$lib/services/database";
import { getActions } from "$lib/db";

  let actions: any[] = [];
  let loading = false;
onMount(async () => {
    if (!browser) return;

    actions = await getActions();
  });

  // form fields
  let meetingId: number | null = null;
  let description = "";
  let status = "";

  async function loadActions() {
    try {
      loading = true;
      actions = await getActions();
    } catch (err) {
      console.error("Failed to load actions", err);
    } finally {
      loading = false;
    }
  }

  async function createAction() {
    if (!meetingId || !description || !status) {
      alert("Please fill all fields");
      return;
    }
    const ok = await addAction(meetingId, description, status);
    if (ok) {
      await loadActions();
      meetingId = null;
      description = "";
      status = "";
    } else {
      console.error("Failed to create action");
    }
  }

  onMount(loadActions);
</script>

<h1>Action Tracker</h1>

<form on:submit|preventDefault={createAction}>
  <input type="number" placeholder="Meeting ID" bind:value={meetingId} required />
  <input placeholder="Description" bind:value={description} required />
  <select bind:value={status} required>
    <option value="">Select status</option>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
  </select>
  <button type="submit">Add Action</button>
</form>

{#if loading}
  <p>Loading...</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Meeting ID</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#each actions as action}
        <tr>
          <td>{action.id}</td>
          <td>{action.meeting_id}</td>
          <td>{action.description}</td>
          <td>{action.status}</td>
        </tr>
      {:else}
        <tr><td colspan="4">No actions found</td></tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  h1 {
    margin-bottom: 15px;
  }
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  input, select, button {
    padding: 8px;
  }
  table {
    width: 100%;
    background: white;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
</style>
