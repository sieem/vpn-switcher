<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import home from "./pages/home.svelte";
	import activeServers from "./pages/activeServers.svelte";
	import newServer from "./pages/newServer.svelte";
	import login from "./pages/login.svelte";

	import auth from './services/auth.service';


	export let url = "";

</script>

<main>
	<Router url="{url}">
	<h1>VPN Switcher</h1>
	<nav>
		<Link to="/">home</Link>
		<Link to="activeServers">activeServers</Link>
		<Link to="newServer">newServer</Link>
	</nav>
	<div class="page">
		<Route path="newServer" component="{newServer}" />
		<Route path="activeServers" component="{activeServers}" />
		<Route path="/" component="{home}"></Route>
	</div>
	</Router>
</main>

{#if !auth.loggedIn()}
	<svelte:component this={login}  />
{:else}
	<svelte:component this={newServer}  />
	<svelte:component this={activeServers}  />
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