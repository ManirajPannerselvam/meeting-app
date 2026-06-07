<script lang="ts">
  let meetingTitle = "";
  let discussion = "";
  let decision = "";
  let actionItem = "";
  let owner = "";
  let dueDate = "";

  let actions: any[] = [];

  function addAction() {
    actions = [
      ...actions,
      {
        actionItem,
        owner,
        dueDate,
        status: "Open"
      }
    ];

    actionItem = "";
    owner = "";
    dueDate = "";
  }

  function saveMoM() {
    const mom = {
      meetingTitle,
      discussion,
      decision,
      actions
    };

    console.log(mom);

    alert("Meeting Minutes Saved");
  }
</script>

<h1>Meeting Minutes (MoM)</h1>

<div class="container">

  <label>Meeting Title</label>
  <input bind:value={meetingTitle} />

  <label>Discussion Points</label>
  <textarea rows="5" bind:value={discussion}></textarea>

  <label>Decision Taken</label>
  <textarea rows="3" bind:value={decision}></textarea>

  <h2>Action Items</h2>

  <input
    bind:value={actionItem}
    placeholder="Action Item"
  />

  <input
    bind:value={owner}
    placeholder="Owner"
  />

  <input
    type="date"
    bind:value={dueDate}
  />

  <button on:click={addAction}>
    Add Action
  </button>

  <table>
    <thead>
      <tr>
        <th>Action</th>
        <th>Owner</th>
        <th>Due Date</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {#each actions as item}
        <tr>
          <td>{item.actionItem}</td>
          <td>{item.owner}</td>
          <td>{item.dueDate}</td>
          <td>{item.status}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button on:click={saveMoM}>
    Save Meeting Minutes
  </button>

</div>

<style>
.container{
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:20px;
}

input, textarea{
  padding:10px;
}

table{
  width:100%;
  margin-top:20px;
}

th, td{
  border:1px solid #ddd;
  padding:8px;
}
</style>