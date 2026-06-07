<script lang="ts">
  import { onMount } from "svelte";

  let meetings: any[] = [];

  function loadMeetings() {
    const data = localStorage.getItem("meetings");

    if (data) {
      meetings = JSON.parse(data);
    }
  }

  function deleteMeeting(index: number) {
    meetings.splice(index, 1);

    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );

    loadMeetings();
  }

  onMount(() => {
    loadMeetings();
  });
</script>

<h1>Meeting List</h1>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Type</th>
      <th>Date</th>
      <th>Participants</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {#each meetings as meeting, index}
      <tr>
        <td>{meeting.title}</td>
        <td>{meeting.meetingType}</td>
        <td>{meeting.meetingDate}</td>
        <td>{meeting.participants}</td>
        <td>
          <button on:click={() => deleteMeeting(index)}>
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
table{
  width:100%;
  border-collapse:collapse;
}

th,td{
  border:1px solid #ddd;
  padding:10px;
}
</style>