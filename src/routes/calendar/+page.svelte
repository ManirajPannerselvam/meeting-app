<script lang="ts">
  import { onMount } from "svelte";
  import { getMeetings } from "$lib/services/database";

  let meetings: any[] = [];

  onMount(async () => {
    meetings = await getMeetings();
  });
</script>

<h1>Meeting Calendar</h1>

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Meeting</th>
      <th>Type</th>
    </tr>
  </thead>

  <tbody>
    {#each meetings as meeting}
      <tr>
        <td>{meeting.meeting_date}</td>
        <td>{meeting.title}</td>
        <td>{meeting.meeting_type}</td>
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