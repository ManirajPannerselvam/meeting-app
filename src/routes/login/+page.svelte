<script lang="ts">
  import { currentUser } from "$lib/stores/auth";
  import { loginUser } from "$lib/services/database";

  let username: string = "";
  let password: string = "";

  async function login() {
    try {
      const user = await loginUser(username, password);

      if (user) {
        currentUser.set(user);
        alert("Login Success");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login");
    }
  }
</script>

<h1>Login</h1>

<input bind:value={username} placeholder="Username" />

<input
  bind:value={password}
  type="password"
  placeholder="Password"
/>

<button on:click={login}>
  Login
</button>