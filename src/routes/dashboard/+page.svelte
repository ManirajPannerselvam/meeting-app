<script lang="ts">
  import { onMount } from "svelte";
  import { getDashboardStats } from "$lib/services/database";

  let stats = {
    meetings: 0,
    actions: 0,
    users: 0,
    employees: 0
  };

  onMount(async () => {
    stats = await getDashboardStats();
  });
</script>

<h1>Meeting Management Dashboard</h1>

<div class="grid">
  <div class="card">
    <h2>{stats.meetings}</h2>
    <p>Total Meetings</p>
  </div>

  <div class="card">
    <h2>{stats.actions}</h2>
    <p>Action Items</p>
  </div>

  <div class="card">
    <h2>{stats.users}</h2>
    <p>Users</p>
  </div>

  <div class="card">
    <h2>{stats.employees}</h2>
    <p>Employees</p>
  </div>
</div>
<h2>Upcoming Meetings</h2>

{#each upcomingMeetings as meeting}
  <div>
    {meeting.meeting_date}
    -
    {meeting.title}
  </div>
{/each}

<style>
.grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:15px;
}

.card{
  padding:20px;
  border:1px solid #ddd;
  border-radius:8px;
  text-align:center;
}
</style>