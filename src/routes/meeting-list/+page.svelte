<script lang="ts">
  import { onMount } from "svelte";

  let meetings: any[] = [];
  let editIndex = -1;

  function loadMeetings() {
    meetings = JSON.parse(
      localStorage.getItem("meetings") || "[]"
    );
  }

  function deleteMeeting(index: number) {
    meetings.splice(index, 1);

    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );

    loadMeetings();
  }

  function editMeeting(index: number) {
    editIndex = index;
  }

  function saveEdit() {
    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );

    editIndex = -1;
  }

  onMount(loadMeetings);
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
    {#each meetings as meeting, index}
      <tr>
        <td>
          {#if editIndex === index}
            <input bind:value={meeting.title} />
          {:else}
            {meeting.title}
          {/if}
        </td>

        <td>{meeting.meetingDate}</td>
        <td>{meeting.meetingType}</td>

        <td>
          {#if editIndex === index}
            <button on:click={saveEdit}>
              Save
            </button>
          {:else}
            <button
              on:click={() => editMeeting(index)}
            >
              Edit
            </button>
          {/if}

          <button
            on:click={() => deleteMeeting(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>