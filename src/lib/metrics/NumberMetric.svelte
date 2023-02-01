<script>
    import {afterUpdate} from "svelte";
    import Metric from "$lib/metrics/Metric.svelte";

    export let title = "Title";
    export let value = "000";
    export let unit = "";
    export let description = "null";

    afterUpdate(async () => {
        if (unit === "null")  {
            document.getElementById("unit").hidden = true;
        }
    });

</script>

<Metric title={title} description={description}>
    <div id="metric">
        <span id="value">{value}</span>
        <span id="unit">{unit}</span>
    </div>
</Metric>

<style>
    #metric{
        padding: 2%;
        vertical-align: middle;
        text-align: center;
    }
    #value {
        font-size: 2vw;
        font-weight: bold;
    }
    #unit {
        font-size: 1vw;
        font-weight: bold;
    }
</style>