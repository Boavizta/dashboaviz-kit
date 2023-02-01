<script>
    import {afterUpdate, onMount} from "svelte";
    import Metric from "$lib/metrics/Metric.svelte";
    import * as echarts from 'echarts';

    export let title;
    export let description;
    export let option;

    let graph = null;
    let element;

    onMount(() => {
        createGraph();
    });

    afterUpdate(() => {
        createGraph();
    });

    $: if (element) {
        createGraph();
    }

    function createGraph() {
        if (graph) element.innerHTML = "";
        var chart = echarts.init(element);

        window.addEventListener('resize', function () {
            chart.resize();
        });

        chart.setOption(option);
    }

</script>

<Metric title={title} description={description}>
    <div bind:this={element} class="graph"></div>
</Metric>

<style>
    .graph {
        position: relative;
        height: 300px;
        width: 100%;
    }
</style>