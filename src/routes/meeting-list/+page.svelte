<script lang="ts">
  import { onMount } from "svelte";
  import {
    getMeetings,
    updateMeeting,
    deleteMeeting
  } from "$lib/services/database";

  let meetings: any[] = [];
  let editId: number | null = null;

  async function loadData() {
    meetings = await getMeetings();
  }

  async function saveEdit(meeting: any) {
    await updateMeeting(
      meeting.id,
      meeting
    );

    editId = null;

    await loadData();
  }

  async function removeMeeting(id: number) {
    if (!confirm("Delete meeting?")) {
      return;
    }

    await deleteMeeting(id);

    await loadData();
  }

  onMount(loadData);
</script>

<h1>Meeting List</h1>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Date</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {#each meetings as meeting}
      <tr>
        <td>
          {#if editId === meeting.id}
            <input bind:value={meeting.title} />
          {:else}
            {meeting.title}
          {/if}
        </td>

        <td>{meeting.meeting_date}</td>
        <td>{meeting.meeting_type}</td>

        <td>
          {#if editId === meeting.id}
            <button
              on:click={() =>
                saveEdit(meeting)}
            >
              Save
            </button>
          {:else}
            <button
              on:click={() =>
                editId = meeting.id}
            >
              Edit
            </button>
          {/if}

          <button
            on:click={() =>
              removeMeeting(meeting.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>