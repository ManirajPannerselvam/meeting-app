<script lang="ts">
  let attendees = [
    { name: "Mani", status: "Present" },
    { name: "Ravi", status: "Present" },
    { name: "Kumar", status: "Absent" }
  ];

  function toggleStatus(index: number) {
    attendees[index].status =
      attendees[index].status === "Present"
        ? "Absent"
        : "Present";

    attendees = [...attendees];
  }

  $: total = attendees.length;
  $: present = attendees.filter(
    (x) => x.status === "Present"
  ).length;

  $: percentage =
    total > 0
      ? ((present / total) * 100).toFixed(1)
      : "0";
</script>

<h1>Meeting Attendance</h1>

<h3>Attendance: {percentage}%</h3>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Update</th>
    </tr>
  </thead>

  <tbody>
    {#each attendees as person, index}
      <tr>
        <td>{person.name}</td>
        <td>{person.status}</td>
        <td>
          <button on:click={() => toggleStatus(index)}>
            Toggle
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

th, td{
  border:1px solid #ddd;
  padding:10px;
}
</style>