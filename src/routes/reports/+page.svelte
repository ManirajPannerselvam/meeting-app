<script lang="ts">
  import { exportMeetingReport }
    from "$lib/services/excelExport";

  import { exportMeetingPDF }
    from "$lib/services/pdfExport";

  const reportData = [
    {
      title: "Weekly RF Review",
      date: "2026-06-08",
      organizer: "Mani",
      status: "Completed"
    },
    {
      title: "Project Planning",
      date: "2026-06-09",
      organizer: "Ravi",
      status: "Open"
    }
  ];

  function exportExcel() {
    exportMeetingReport(reportData);
  }

  function exportPDF() {
    exportMeetingPDF(reportData);
  }
</script>

<h1>Reports</h1>

<button on:click={exportExcel}>
  Export Excel
</button>

<button on:click={exportPDF}>
  Export PDF
</button>