<script>
    import SingleBar2Dimensions from "$lib/bars/SingleBar2Dimensions.svelte";
    import Metric from "$lib/metrics/Metric.svelte";

    export let description = "null";
    export let title = "Title";

    export let data;

</script>

<Metric title={title} description={description}>
    <div style="">
        {#each Object.keys(data) as key}
            <SingleBar2Dimensions metrics={data[key]["data"]} unit={data[key]["unit"]} title={data[key]["title"]} description={data[key]["description"]}  />
        {/each}
    </div>
</Metric>

<style>
    div{
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 90%;
        margin-bottom: 2%;
    }
</style>