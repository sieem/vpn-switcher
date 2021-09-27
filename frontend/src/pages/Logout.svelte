<script lang="ts">
    import { removeToken } from "../services/auth.service";

    function handleClick() {
        removeToken();
    }
</script>

<button on:click={handleClick}>Logout</button>

<style>

</style>