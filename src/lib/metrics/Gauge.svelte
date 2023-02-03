<script>
    import {afterUpdate, onMount} from "svelte";
    import Metric from "$lib/metrics/Metric.svelte";

    export let title = "Title";
    export let value = 0;
    export let unit = "%";
    export let description = "null";
    export let max_value = 100;
    export let min_value = 0;
    export let color = "#686464";

    let target;
    let txt_field;

    var opts = {
        angle: 0.12,
        lineWidth: 0.25,
        radiusScale: 1,
        pointer: {
            length: 0.4,
            strokeWidth: 0.03,
            color: '#000000'
        },
        colorStop: color,
        fontSize: 30
    };

    onMount(async () => {
        await import("../gaugejs/gauge.min.js");
        let gauge = createGauge();
        gauge.setOptions(opts);
        gauge.maxValue = max_value;
        gauge.setMinValue(min_value);
        gauge.set(value)
    });

    afterUpdate(async () => {
        if (unit === "null")  {
            document.getElementById("unit").hidden = true;
        }
    });

    function createGauge() {
        if (target) target.innerHTML = "";
        let gauge = new Gauge(target);
        gauge.setTextField(txt_field);
        return gauge;
    }
</script>

<Metric title={title} description={description}>
    <canvas bind:this={target} class="gauge"></canvas>
    <div class="label"><span bind:this={txt_field} class="value"></span><span class="unit">{" " + unit}</span></div>
</Metric>

<style>
    .value {
        font-size: 2vw;
        font-weight: bold;
    }
    .unit {
        font-size: 1vw;
        font-weight: bold;
    }
    .label{
        display: flex;
    }
</style>