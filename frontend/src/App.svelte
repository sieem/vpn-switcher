<script lang="ts">
	import ActiveServers from './pages/ActiveServers.svelte';
	import Login from './pages/Login.svelte';
	import Logout from './pages/Logout.svelte';
	import NewServer from './pages/NewServer.svelte';
	import { loggedIn, setLoginState } from './services/auth.service';

	setLoginState();
</script>

<main>
	<h1>VPN Switcher</h1>
</main>
{#if !$loggedIn}
	<Login />
{:else}
	<Logout />
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