<script lang="ts">
  let meetings = [
    {
      title: "Weekly RF Review",
      date: "2026-06-10",
      time: "10:00 AM"
    },
    {
      title: "Project Planning",
      date: "2026-06-12",
      time: "02:00 PM"
    },
    {
      title: "Management Review",
      date: "2026-06-15",
      time: "11:00 AM"
    }
  ];
</script>

<h1>Meeting Calendar</h1>

<div class="calendar">
  {#each meetings as meeting}
    <div class="card">
      <h3>{meeting.title}</h3>
      <p>📅 {meeting.date}</p>
      <p>🕒 {meeting.time}</p>
    </div>
  {/each}
</div>

<style>
.calendar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
  gap: 15px;
}

.card {
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
}
</style>