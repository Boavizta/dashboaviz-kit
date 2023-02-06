<script lang="ts">
    import {onMount} from "svelte";
    import {ColorProvider} from "$lib/ColorProvider";

    let color_provider = new ColorProvider();

    export let title = "";
    export let description = "";
    export let unit;
    let total = 0;

    export let metrics;

    export let computed_data = {};

    function sum_object(obj){
        let sum = 0;
        for (let key in obj){
            sum += obj[key];
        }
        return sum;
    }

    function compute_percentage(m){
        let unique_color = null;
        for (let dim1_key in m){
            total += sum_object(m[dim1_key]);
        }
        for (let dim1_key in m){
            if (Object.keys(m[dim1_key]).length ===1){
                unique_color = color_provider.next();
            }

            let total_dim1_key = sum_object(m[dim1_key]);

            computed_data[dim1_key] = {};
            computed_data[dim1_key]["TOTAL"] = {};
            computed_data[dim1_key]["TOTAL"]["percentage"] =  total_dim1_key / total * 100;
            computed_data[dim1_key]["TOTAL"]["value"] =  total_dim1_key;
            computed_data[dim1_key]["TOTAL"]["color"] = unique_color || color_provider.next();

            for (let dime2_key in m[dim1_key]){
                computed_data[dim1_key][dime2_key] = {};
                if (unique_color === null){
                    computed_data[dim1_key][dime2_key]["value"] = m[dim1_key][dime2_key];
                }else {
                    computed_data[dim1_key][dime2_key]["value"] = null;
                }
                computed_data[dim1_key][dime2_key]["percentage"] = m[dim1_key][dime2_key] / total * 100;
                computed_data[dim1_key][dime2_key]["color"] = unique_color || color_provider.next();
            }
            if (unique_color !== null){
                unique_color = null;
            }
        }
    }

    onMount(async () => {
        compute_percentage(metrics)
    });

</script>

<h2>{title} - Total : {total} {unit}</h2>
<h3>{description}</h3>

<!-- first dimension -->
<div class="stacked-bar-graph rounded-top">
    {#each Object.keys(computed_data) as dim1_key}
        <span style="width:{computed_data[dim1_key]['TOTAL']['percentage']}%;background:{computed_data[dim1_key]['TOTAL']['color']};"></span>
    {/each}
</div>

<!-- second dimension -->
<div class="stacked-bar-graph rounded-bottom">
    {#each Object.keys(computed_data) as dim1_key}
        {#each Object.keys(computed_data[dim1_key]) as dime2_key}
            {#if dime2_key !== "TOTAL"}
                <span style="width:{computed_data[dim1_key][dime2_key]['percentage']}%;background:{computed_data[dim1_key][dime2_key]['color']}"></span>
            {/if}
        {/each}
    {/each}
</div>


<div class="px-1 text-xs w-full">
    {#each Object.keys(computed_data) as dim1_key}
        <span class="bar-legend" style="margin-left: 0.5em;background:{computed_data[dim1_key]['TOTAL']['color']}"></span> {dim1_key} : {computed_data[dim1_key]['TOTAL']['value']}
    {/each}
</div>

<div class="px-1 pb-4 text-xs w-full">
    {#each Object.keys(computed_data) as dim1_key}
        {#each Object.keys(computed_data[dim1_key]) as dime2_key}
            {#if dime2_key !== "TOTAL"}
                {#if computed_data[dim1_key][dime2_key]["value"] !== null}
                    <span class="bar-legend" style="margin-left: 0.5em;background:{computed_data[dim1_key][dime2_key]['color']};"></span> {dim1_key} {dime2_key} : {computed_data[dim1_key][dime2_key]['value']}
                {/if}
            {/if}
        {/each}
    {/each}
</div>

<style>
    .stacked-bar-graph {
        width: 100%;
        height: 25px;
        overflow: hidden
    }

    .rounded-bottom {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .rounded-top {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .stacked-bar-graph span {
        display: inline-block;
        height:100%;
        box-sizing: border-box;
        float: left;
    }
    .bar-legend {
        width:10px;
        height:10px;
        display: inline-block;
    }
    h2 {
        font-size: 1em;
        font-weight: bold;
        margin-top: 2%;
    }
    h3 {
        margin-top: 0;
        font-size: 0.9em;
        font-weight: normal;
        font-style: italic;
    }
</style>