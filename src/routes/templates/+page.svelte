<script lang="ts">
  let templates = [
    {
      name: "Weekly RF Review",
      agenda: "RF Issues, KPI Review, Action Items"
    },
    {
      name: "Project Status Review",
      agenda: "Progress, Risks, Next Steps"
    },
    {
      name: "Management Review",
      agenda: "Business Metrics, Escalations"
    }
  ];

  function useTemplate(template: any) {
    localStorage.setItem(
      "selectedTemplate",
      JSON.stringify(template)
    );

    alert("Template Selected");
  }
</script>

<h1>Meeting Templates</h1>

{#each templates as template}
  <div class="card">
    <h3>{template.name}</h3>
    <p>{template.agenda}</p>

    <button
      on:click={() => useTemplate(template)}
    >
      Use Template
    </button>
  </div>
{/each}

<style>
.card{
  border:1px solid #ddd;
  padding:15px;
  margin-bottom:15px;
  border-radius:8px;
}
</style>