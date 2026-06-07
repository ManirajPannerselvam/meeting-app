<script lang="ts">
  let totalMeetings = 25;
  let completedMeetings = 20;
  let openActions = 8;
  let attendance = 92;
</script>

<h1>Analytics Dashboard</h1>

<div class="grid">
  <div class="card">
    <h2>{totalMeetings}</h2>
    <p>Total Meetings</p>
  </div>

  <div class="card">
    <h2>{completedMeetings}</h2>
    <p>Completed Meetings</p>
  </div>

  <div class="card">
    <h2>{openActions}</h2>
    <p>Open Actions</p>
  </div>

  <div class="card">
    <h2>{attendance}%</h2>
    <p>Attendance</p>
  </div>
</div>

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
}
</style>