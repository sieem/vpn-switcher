<script>
    import { ApiService } from '../services/api.service';
    const api = new ApiService();
    let activerServers = [];
    let promise;

    function handleClick() {
        promise = api.startServer({test:"test"});
    }
</script>

<button on:click={handleClick}>
	Generate new server
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>

</style>