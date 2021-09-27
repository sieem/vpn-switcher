<script lang="ts">
    import api from '../services/api.service';
    import { saveToken } from '../services/auth.service';
    import Spinner from './Spinner.svelte';

    let promise;
    let password;

    function handleClick() {
        promise = login();
    }

    function handleEnter(event) {
        if(event.keyCode == 13) {
            promise = login();
        }
    }

    async function login() {
        try {
            const response = await api.login({ password });
            saveToken(response.token);
        } catch (error) {
            throw new Error(error.error)
        }
        
    }
</script>

<input type="text" bind:value={password} on:keydown={handleEnter}/>

<button on:click={handleClick}>Login</button>

{#await promise}
	<Spinner />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>

</style>