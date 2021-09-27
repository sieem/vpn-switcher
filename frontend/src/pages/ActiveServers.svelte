<script lang="ts">
    import { activeServers, setActiveServers } from '../services/activeServers.service';
    import api from '../services/api.service';
import Spinner from './Spinner.svelte';
    let promise;

    setActiveServers();

    function deleteServer(SUBID) {
        promise = api.deleteServer({SUBID}).then(() => setActiveServers());
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

{#await promise}
	<Spinner />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<ul>
	{#each $activeServers as { SUBID, label, location }}
		<li>
            <div title={SUBID}>{label}</div>
            <button on:click={() => getConnectionFile(SUBID)}>getFile</button>
            <button on:click={() => deleteServer(SUBID)}>Delete</button></li>
	{/each}
</ul>

<style>
    ul {
        padding: 0;
    }

    li {
        display: grid;
        grid-template-columns: 1fr 70px 70px;
        align-items: baseline;
        gap: 10px;
        padding: 15px 0;
    }

    li button {
        margin-bottom: 0;
    }
</style>