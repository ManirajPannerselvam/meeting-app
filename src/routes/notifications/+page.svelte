<script lang="ts">
  import { onMount } from "svelte";
  import {
    getNotifications,
    markNotificationRead
  } from "$lib/services/database";

  let notifications: any[] = [];

  async function loadData() {
    notifications =
      await getNotifications();
  }

  async function markRead(id: number) {
    await markNotificationRead(id);
    await loadData();
  }

  onMount(loadData);
</script>

<h1>Notifications</h1>

{#each notifications as item}
  <div class="card">
    <h3>{item.title}</h3>

    <p>{item.message}</p>

    <p>
      Status:
      {item.is_read ? "Read" : "Unread"}
    </p>

    {#if !item.is_read}
      <button
        on:click={() =>
          markRead(item.id)}
      >
        Mark Read
      </button>
    {/if}
  </div>
{/each}

<style>
.card{
  border:1px solid #ddd;
  padding:15px;
  margin-bottom:10px;
  border-radius:8px;
}
</style>