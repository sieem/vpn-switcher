<script lang="ts">
    import { writable } from 'svelte/store';
    import api from '../services/api.service';

    let activerServers = writable([]);

    (async function() {
        activerServers.set(await api.getServerlist());
    })();
    async function deleteServer(SUBID) {
        await api.deleteServer({SUBID});
        activerServers.set(await api.getServerlist());
    }
    async function getConnectionFile(SUBID) {
        try {
            const connectionFile = await api.getConnectionFile({SUBID});
            const url = window.URL.createObjectURL(connectionFile);
            const a = document.createElement('a');
            a.download = `${SUBID}.ovpn`;
            a.href = url;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert(error)
        }
    }
</script>


<ul>
	{#each $activerServers as { SUBID, label, location }}
		<li>{SUBID} {label} {location} <button on:click={() => getConnectionFile(SUBID)}>getFile</button> <button on:click={() => deleteServer(SUBID)}>Delete</button></li>
	{/each}
</ul>

<style>

</style>