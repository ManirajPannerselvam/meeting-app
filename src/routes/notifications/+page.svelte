<script lang="ts">
  let notifications = [
    {
      title: "Weekly RF Review",
      message: "Meeting starts in 30 minutes",
      priority: "High"
    },
    {
      title: "Project Planning",
      message: "Action item due tomorrow",
      priority: "Medium"
    }
  ];
</script>

<h1>Notifications</h1>

{#each notifications as item}
  <div class="card">
    <h3>{item.title}</h3>
    <p>{item.message}</p>
    <span>{item.priority}</span>
  </div>
{/each}

<style>
.card{
  border:1px solid #ddd;
  padding:15px;
  margin-bottom:10px;
  border-radius:8px;
}
</style>