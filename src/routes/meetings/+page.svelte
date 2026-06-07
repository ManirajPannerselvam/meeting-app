import { onMount } from "svelte";

onMount(() => {
  const template = localStorage.getItem(
    "selectedTemplate"
  );

  if (template) {
    const data = JSON.parse(template);

    title = data.name;
    agenda = data.agenda;
  }
});