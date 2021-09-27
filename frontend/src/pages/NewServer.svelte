<script lang="ts">
    import { writable } from 'svelte/store';
    import { setActiveServers } from '../services/activeServers.service';
    import api from '../services/api.service';
    import Spinner from './Spinner.svelte';

    const serverLocations = writable([]);
    let promise;
    let selected = 0;

    (async function() {
        serverLocations.set(await api.getServerLocations());
    })();

    function handleClick() {
        let _serverLocations;
        serverLocations.subscribe(value => _serverLocations = value)();
        
        promise = api.startServer({
            DCID: _serverLocations[selected].DCID,
            location: _serverLocations[selected].name,
        }).then(() => setActiveServers());
    }
</script>

<div>
    <select bind:value={selected}>
        {#each $serverLocations as { name }, i}
            <option value={i}>
                {name}
            </option>
        {/each}
    </select>

    <button on:click={handleClick}>Generate new server</button>

    {#await promise}
        <Spinner />
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>

</style>