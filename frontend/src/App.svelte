<script lang="ts">
	import ActiveServers from './pages/ActiveServers.svelte';
	import Login from './pages/Login.svelte';
	import Logout from './pages/Logout.svelte';
	import NewServer from './pages/NewServer.svelte';
	import { loggedIn, setLoginState } from './services/auth.service';

	setLoginState();
</script>

<div class="wrapper">
	<h1>VPN Switcher</h1>
</div>
{#if !$loggedIn}
	<div class="wrapper">
		<Login />
	</div>
{:else}
	<div class="wrapper toolbar">
		<NewServer />
		<Logout />
	</div>
	<div class="activeServers">
		<div class="wrapper">
			<ActiveServers />
		</div>
	</div>
{/if}

<style>

	h1 {
		color: #BB7561;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.toolbar {
		display: grid;
		grid-template-columns: 1fr 70px;
	}

	.activeServers {
        background: #008C6C;
		color: white;
	}
</style>