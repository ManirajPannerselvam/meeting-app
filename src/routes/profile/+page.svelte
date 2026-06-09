<script lang="ts">
  let user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );
</script>

<h1>User Profile</h1>

<p><b>Username:</b> {user.username}</p>
<p><b>Role:</b> {user.role}</p>