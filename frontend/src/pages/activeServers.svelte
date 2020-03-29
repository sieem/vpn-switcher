<script>
    import { ApiService } from '../services/api.service';
    const api = new ApiService();
    let activerServers = [];

    (async function() {
        activerServers = await api.getServerlist();
    })();
    async function deleteServer(SUBID) {
        await api.deleteServer({SUBID});
        activerServers = await api.getServerlist();
    }
</script>


<ul>
	{#each activerServers as { SUBID, label, location }, i}
		<li>{SUBID} {label} {location} <button on:click={deleteServer(SUBID)}>Delete</button></li>
	{/each}
</ul>

<style>

</style>