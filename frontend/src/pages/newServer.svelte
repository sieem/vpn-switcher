<script>
    import { ApiService } from '../services/api.service';
    const api = new ApiService();
    let serverLocations = [];
    let promise;
    let selected = 0;

    (async function() {
        serverLocations = await api.getServerLocations();
    })();

    function handleClick() {
        console.log( serverLocations[selected])
        promise = api.startServer({
            DCID: serverLocations[selected].DCID,
            location: serverLocations[selected].name,
        });
    }
</script>

<select bind:value={selected}>
    {#each serverLocations as { name }, i}
        <option value={i}>
            {name}
        </option>
    {/each}
</select>

<button on:click={handleClick}>Generate new server</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>

</style>