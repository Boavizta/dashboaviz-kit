<script>
    import { onMount } from "svelte";
    import Dygraph from "dygraphs";
    import Metric from "$lib/metrics/Metric.svelte";

    export let title;
    export let description;
    export let options = {
        fullscreen: true,
        fillGraph: true,
    };
    export let data;

    let graph = null;
    let element;

    onMount(() => {
        createGraph();
    });

    $: if (element && options) {
        createGraph();
    }

    function createGraph() {
        if (graph) element.innerHTML = "";
        graph = new Dygraph(element, data, options);
    }

</script>

<Metric title={title} description={description} minWidth="600px">
     <div bind:this={element} class="graph"></div>
</Metric>

<style>
    .graph {
       width:100%;
       height: 250px;
       margin-right: 3%;
       margin-bottom: 1%;
    }

</style>