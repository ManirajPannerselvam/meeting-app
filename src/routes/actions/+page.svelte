<script>
  let showCore = false;
  let showTracking = false;
  let showAI = false;
  let showResources = false;

  function openPage(page) {
    console.log("Navigate to:", page);
  }
</script>

<!-- CORE -->
<button class="group-btn" on:click={() => (showCore = !showCore)}>
  Core Pages
</button>

{#if showCore}
  <div class="submenu">
    <button class="item-btn" on:click={() => openPage("dashboard")}>
      Dashboard
    </button>

    <button class="item-btn" on:click={() => openPage("meetings")}>
      Meetings
    </button>

    <button class="item-btn" on:click={() => openPage("mom")}>
      Meeting Minutes
    </button>

    <button class="item-btn" on:click={() => openPage("reports")}>
      Reports
    </button>
  </div>
{/if}

<!-- TRACKING -->
<button class="group-btn" on:click={() => (showTracking = !showTracking)}>
  Tracking
</button>

{#if showTracking}
  <div class="submenu">
    <button class="item-btn" on:click={() => openPage("actions")}>
      Action Tracker
    </button>

    <button class="item-btn" on:click={() => openPage("kpi")}>
      KPI Dashboard
    </button>

    <button class="item-btn" on:click={() => openPage("attendance")}>
      Attendance
    </button>

    <button class="item-btn" on:click={() => openPage("meeting-list")}>
      Meeting List
    </button>
  </div>
{/if}

<!-- AI FEATURES -->
<button class="group-btn" on:click={() => (showAI = !showAI)}>
  AI Features
</button>

{#if showAI}
  <div class="submenu">
    <button class="item-btn" on:click={() => openPage("ai-summary")}>
      AI Summary
    </button>

    <button class="item-btn" on:click={() => openPage("ai-assistant")}>
      AI Assistant
    </button>

    <button class="item-btn" on:click={() => openPage("analytics")}>
      Analytics
    </button>
  </div>
{/if}

<!-- RESOURCES -->
<button class="group-btn" on:click={() => (showResources = !showResources)}>
  Resources & Settings
</button>

{#if showResources}
  <div class="submenu">
    <button class="item-btn" on:click={() => openPage("devices")}>
      Devices
    </button>

    <button class="item-btn" on:click={() => openPage("sims")}>
      SIM Inventory
    </button>

    <button class="item-btn" on:click={() => openPage("profile")}>
      Profile
    </button>

    <button class="item-btn" on:click={() => openPage("backup")}>
      Backup
    </button>
  </div>
{/if}