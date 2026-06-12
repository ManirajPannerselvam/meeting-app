  import { onMount } from "svelte";
  import { getMeetings } from "$lib/api/meetings";

  let meetings = [];

  onMount(async () => {
    try {
      meetings = await getMeetings();
    } catch (err) {
      console.error(err);
    }
  });