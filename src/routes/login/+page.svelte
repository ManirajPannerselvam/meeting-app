<script lang="ts">
  let email = "";
  let password = "";
  let error = "";

  function login() {
    if (!email || !password) {
      error = "Please enter email and password";
      return;
    }

    localStorage.setItem("user", email);

    window.location.href = "/";
  }
</script>

<div class="login-container">
  <div class="card">
    <h1>Meeting App</h1>

    <input
      bind:value={email}
      type="email"
      placeholder="Email"
    />

    <input
      bind:value={password}
      type="password"
      placeholder="Password"
    />

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button on:click={login}>
      Login
    </button>

    <a href="/register">
      Create Account
    </a>
  </div>
</div>

<style>
.login-container{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#f4f6f9;
}

.card{
  width:350px;
  background:white;
  padding:30px;
  border-radius:10px;
  box-shadow:0 0 15px rgba(0,0,0,.1);
}

input{
  width:100%;
  padding:10px;
  margin-top:10px;
}

button{
  width:100%;
  padding:10px;
  margin-top:15px;
}
.error{
  color:red;
}
</style>