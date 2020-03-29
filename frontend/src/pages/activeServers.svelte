<script>
    import { ApiService } from '../services/api.service';
    const api = new ApiService();
    let activerServers = [];

    (async function() {
        activerServers = await api.getServerlist();
    })();
</script>


<ul>
	{#each activerServers as { id }, i}
		<li>{id}</li>
	{/each}
</ul>

<style>

</style>