<script lang="ts">
  import { registerUser } from "$lib/services/auth";

  let username = "";
  let password = "";

  async function register() {
    try {
      await registerUser(username, password);

      alert("Registration Successful");

      username = "";
      password = "";
    } catch (e) {
      alert("User already exists");
    }
  }
</script>

<h1>Register</h1>

<input bind:value={username} placeholder="Username" />

<input
  bind:value={password}
  type="password"
  placeholder="Password"
/>

<button on:click={register}>
  Register
</button>