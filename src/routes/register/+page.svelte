<script lang="ts">
  let name = "";
  let email = "";
  let password = "";

  function register() {
    alert("Registration Success");
    window.location.href = "/login";
  }
</script>

<h1>Create Account</h1>

<input bind:value={name} placeholder="Name" />
<input bind:value={email} placeholder="Email" />
<input bind:value={password} type="password" placeholder="Password" />

<button on:click={register}>
  Register
</button>