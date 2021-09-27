<script lang="ts">
	import ActiveServers from './pages/ActiveServers.svelte';

	import Login from './pages/Login.svelte';
	import NewServer from './pages/NewServer.svelte';

	import auth from './services/auth.service';
</script>

<main>
	<h1>VPN Switcher</h1>
</main>
{#if !auth.loggedIn()}
	<Login />
{:else}
	<NewServer />
	<ActiveServers />
{/if}

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>