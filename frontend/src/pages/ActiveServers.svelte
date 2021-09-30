<script lang="ts">
    import { activeServers, setActiveServers } from '../services/activeServers.service';
    import api from '../services/api.service';
    import Spinner from './Spinner.svelte';
    let promise: Promise<void>;
    let downloadError: string;

    setActiveServers();

    function deleteServer(SUBID) {
        promise = api.deleteServer({SUBID}).then(() => setActiveServers());
    }

    async function getConnectionFile(SUBID) {
        downloadError = null;
        try {
            const connectionFile = await api.getConnectionFile({SUBID});
            const url = window.URL.createObjectURL(connectionFile);
            const a = document.createElement('a');
            a.download = `${SUBID}.ovpn`;
            a.href = url;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            downloadError = error;
        }
    }
</script>

{#await promise}
	<Spinner />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<ul>
    {#if downloadError}
        <li class="error">
            <div class="wrapper">
                <div>{downloadError}</div>
                <div></div>
                <button on:click={() => downloadError = null}>Close</button>
            </div>
        </li>
    {/if}
	{#each $activeServers as { SUBID, label, location }}
		<li>
            <div class="wrapper">
                <div title={SUBID}>{label}</div>
                <button on:click={() => getConnectionFile(SUBID)}>Get OpenVPN File</button>
                <button on:click={() => deleteServer(SUBID)}>Delete</button>
            </div>
        </li>
	{/each}
</ul>

<style>
    ul {
        padding: 0;
    }

    li {
        margin-top: 15px;
        margin-bottom: 15px;

        background: #008C6C;
		color: white;
    }

    li .wrapper {
        display: grid;
        grid-template-columns: 1fr 150px 70px;
        align-items: baseline;
        gap: 10px;
        padding: 15px 0;
    }

    li button {
        margin-bottom: 0;
    }

    .error {
        background-color: #BB7561;
    }
</style>