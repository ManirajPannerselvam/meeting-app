<script lang="ts">
  let currentPage = "dashboard";

  const stats = {
    meetings: 8,
    pendingActions: 15,
    completedActions: 27,
    attendance: "92%"
  };
</script>

<div class="app">
  <aside class="sidebar">
    <h2>Meeting App</h2>

    <button on:click={() => currentPage = "dashboard"}>
      Dashboard
    </button>

    <button on:click={() => currentPage = "meetings"}>
      Meetings
    </button>

    <button on:click={() => currentPage = "mom"}>
      Meeting Minutes
    </button>

    <button on:click={() => currentPage = "reports"}>
      Reports
    </button>
<button on:click={exportPDF}>
  Export PDF
</button>
<hr />

  <a href="/login">
    <button>Login</button>
  </a>
<a href="/calendar">
  <button>Calendar</button>
</a>

  <a href="/register">
    <button>Register</button>
  </a>
<a href="/attendance">
  <button>Attendance</button>
</a>

  <a href="/meetings">
    <button>Create Meeting</button>
  </a>
<a href="/action-tracker">
  <button>Action Tracker</button>
</a>
<a href="/reports">
  <button>Reports</button>
</a>
<a href="/chat">
  <button>Group Chat</button>
</a>
<a href="/files">
  <button>Files</button>
</a>
<a href="/ai-assistant">
  <button>AI Assistant</button>
</a>
<a href="/meeting-list">
  <button>Meeting List</button>
</a>

  </aside>

  <main class="content">
    {#if currentPage === "dashboard"}

      <h1>Dashboard</h1>

      <div class="cards">
        <div class="card">
          <h3>Today's Meetings</h3>
          <p>{stats.meetings}</p>
        </div>

        <div class="card">
          <h3>Pending Actions</h3>
          <p>{stats.pendingActions}</p>
        </div>

        <div class="card">
          <h3>Completed Actions</h3>
          <p>{stats.completedActions}</p>
        </div>

        <div class="card">
          <h3>Attendance</h3>
          <p>{stats.attendance}</p>
        </div>
      </div>

    {:else if currentPage === "meetings"}

      <h1>Meetings</h1>

      <button>Create Meeting</button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Weekly RF Review</td>
            <td>08-Jun-2026</td>
            <td>Scheduled</td>
          </tr>
        </tbody>
      </table>

    {:else if currentPage === "mom"}

      <h1>Meeting Minutes</h1>

      <textarea
        rows="10"
        placeholder="Enter discussion points..."
      ></textarea>

    {:else}

      <h1>Reports</h1>

      <button>Export Excel</button>
      <button>Export PDF</button>

    {/if}
  </main>
</div>

<style>
  .app{
    display:flex;
    height:100vh;
    font-family:Arial, sans-serif;
  }

  .sidebar{
    width:220px;
    background:#1f2937;
    color:white;
    padding:20px;
  }

  .sidebar button{
    width:100%;
    margin-top:10px;
    padding:10px;
    cursor:pointer;
  }

  .content{
    flex:1;
    padding:20px;
    background:#f5f5f5;
  }

  .cards{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:15px;
  }

  .card{
    background:white;
    padding:20px;
    border-radius:8px;
    box-shadow:0 2px 6px rgba(0,0,0,.15);
  }

  table{
    width:100%;
    margin-top:15px;
    background:white;
  }

  th, td{
    padding:10px;
    text-align:left;
  }

  textarea{
    width:100%;
    padding:10px;
  }
</style>