<script lang="ts">
  let title = "";
  let agenda = "";
  let meetingType = "Group";
  let meetingDate = "";
  let startTime = "";
  let endTime = "";
  let participants = "";

  function saveMeeting() {
    const meeting = {
      title,
      agenda,
      meetingType,
      meetingDate,
      startTime,
      endTime,
      participants
    };

    let meetings = JSON.parse(
      localStorage.getItem("meetings") || "[]"
    );

    meetings.push(meeting);

    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );

    alert("Meeting Saved Successfully");

    title = "";
    agenda = "";
    participants = "";
    meetingDate = "";
    startTime = "";
    endTime = "";
  }
</script>

<h1>Create Meeting</h1>

<div class="form">
  <input bind:value={title} placeholder="Meeting Title" />

  <textarea
    bind:value={agenda}
    placeholder="Agenda"
  ></textarea>

  <select bind:value={meetingType}>
    <option value="Group">Group</option>
    <option value="Individual">Individual</option>
  </select>

  <input type="date" bind:value={meetingDate} />
  <input type="time" bind:value={startTime} />
  <input type="time" bind:value={endTime} />

  <input
    bind:value={participants}
    placeholder="Participants"
  />

  <button on:click={saveMeeting}>
    Save Meeting
  </button>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
  }

  input,
  textarea,
  select {
    padding: 10px;
  }

  button {
    padding: 10px;
  }
</style>