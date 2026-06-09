<script lang="ts">
  import { getMeetings } from "$lib/services/database";
  
  let currentPage = "dashboard";

  // toggles for collapsible groups
  let showCore = true;
  let showTracking = false;
  let showAI = false;
  let showResources = false;

  let stats = {
    meetings: 0,
    pendingActions: 0,
    completedActions: 0,
    attendance: "0%"
  };

  let meetings: any[] = [];
  let loading = false;

  async function loadDashboardData() {
    try {
      loading = true;
      meetings = await getMeetings();
      stats.meetings = meetings.length;
      // You can calculate pendingActions, completedActions from other tables here
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      loading = false;
    }
  }

  function exportPDF() {
    alert("Exporting PDF...");
  }

  // Load data when switching to dashboard or meetings
  $: if (currentPage === "dashboard" || currentPage === "meetings") {
    loadDashboardData();
  }
</script>

<div class="app">
  <aside class="sidebar">
    <h2>Meeting App</h2>

    <!-- Core Pages -->
    <button on:click={() => showCore = !showCore}>
      {showCore ? "▼ Core Pages" : "▶ Core Pages"}
    </button>
    {#if showCore}
      <div class="subgroup">
        <button on:click={() => currentPage = "dashboard"}>Dashboard</button>
        <button on:click={() => currentPage = "meetings"}>Meetings</button>
        <button on:click={() => currentPage = "mom"}>Meeting Minutes</button>
        <button on:click={() => currentPage = "reports"}>Reports</button>
        <a href="/calendar"><button>Calendar</button></a>
      </div>
    {/if}

    <!-- Tracking -->
    <button on:click={() => showTracking = !showTracking}>
      {showTracking ? "▼ Tracking" : "▶ Tracking"}
    </button>
    {#if showTracking}
      <div class="subgroup">
        <a href="/actions"><button>Action Tracker</button></a>
        <a href="/kpi"><button>KPI Dashboard</button></a>
        <a href="/defects"><button>Defect Tracker</button></a>
        <a href="/attendance"><button>Attendance</button></a>
        <a href="/meeting-list"><button>Meeting List</button></a>
      </div>
    {/if}

    <!-- AI Features -->
    <button on:click={() => showAI = !showAI}>
      {showAI ? "▼ AI Features" : "▶ AI Features"}
    </button>
    {#if showAI}
      <div class="subgroup">
        <a href="/ai-summary"><button>AI Summary</button></a>
        <a href="/ai-actions"><button>AI Action Extraction</button></a>
        <a href="/ai-assistant"><button>AI Assistant</button></a>
        <a href="/analytics"><button>Analytics Dashboard</button></a>
      </div>
    {/if}

    <!-- Resources & Settings -->
    <button on:click={() => showResources = !showResources}>
      {showResources ? "▼ Resources & Settings" : "▶ Resources & Settings"}
    </button>
    {#if showResources}
      <div class="subgroup">
        <a href="/attachments"><button>Attachments</button></a>
        <a href="/files"><button>Files</button></a>
        <a href="/templates"><button>Meeting Templates</button></a>
        <a href="/notifications"><button>Notifications</button></a>
        <a href="/sims"><button>SIM Inventory</button></a>
        <a href="/devices"><button>Device Inventory</button></a>
        <a href="/rf-tests"><button>RF Test Tracker</button></a>
        <a href="/profile"><button>Profile</button></a>
        <a href="/login"><button>Login</button></a>
        <a href="/register"><button>Register</button></a>
        <a href="/backup"><button>Backup</button></a>
        <a href="/skills"><button>Skill Matrix</button></a>
      </div>
    {/if}

    <hr />
    <button on:click={exportPDF}>Export PDF</button>
  </aside>

  <main class="content">
    {#if currentPage === "dashboard"}
      <h1>Dashboard</h1>
      {#if loading}
        <p>Loading...</p>
      {:else}
        <div class="cards">
          <div class="card"><h3>Today's Meetings</h3><p>{stats.meetings}</p></div>
          <div class="card"><h3>Pending Actions</h3><p>{stats.pendingActions}</p></div>
          <div class="card"><h3>Completed Actions</h3><p>{stats.completedActions}</p></div>
          <div class="card"><h3>Attendance</h3><p>{stats.attendance}</p></div>
        </div>
      {/if}

    {:else if currentPage === "meetings"}
      <h1>Meetings</h1>
      <button>Create Meeting</button>
      {#if loading}
        <p>Loading...</p>
      {:else}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {#each meetings as meeting}
              <tr>
                <td>{meeting.title}</td>
                <td>{meeting.meeting_date}</td>
                <td>{meeting.meeting_type}</td>
              </tr>
            {:else}
              <tr><td colspan="3">No meetings found</td></tr>
            {/each}
          </tbody>
        </table>
      {/if}

    {:else if currentPage === "mom"}
      <h1>Meeting Minutes</h1>
      <textarea rows="10" placeholder="Enter discussion points..."></textarea>
      
    {:else}
      <h1>Reports</h1>
      <button>Export Excel</button>
      <button on:click={exportPDF}>Export PDF</button>
    {/if}
  </main>
</div>

<style>
  .app {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  .sidebar {
    width: 240px;
    background: #1f2937;
    color: white;
    padding: 20px;
    overflow-y: auto;
  }
  .sidebar button {
    width: 100%;
    margin-top: 6px;
    padding: 10px;
    cursor: pointer;
    background: #374151;
    border: none;
    border-radius: 4px;
    color: white;
    text-align: left;
  }
  .sidebar button:hover {
    background: #4b5563;
  }
  .subgroup {
    margin-left: 10px;
    margin-top: 5px;
  }
  .content {
    flex: 1;
    padding: 20px;
    background: #f5f5f5;
    overflow-y: auto;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  .card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,.15);
  }
  table {
    width: 100%;
    margin-top: 15px;
    background: white;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  textarea {
    width: 100%;
    padding: 10px;
  }
</style>