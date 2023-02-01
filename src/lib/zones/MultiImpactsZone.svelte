<script>
    import SectionTitle from "$lib/zones/SectionTitle.svelte";
    import Select from 'svelte-select';

    export let impactsCriterias;

    let selected_criteria = "GWP";

    function change_criteria(e) {
        selected_criteria = e.detail.value;
    }

</script>

<div class="impact-selector-parent">
    <div class="impact-selector-child-2">
        <Select items={impactsCriterias} clearable={false} value={selected_criteria} on:change={change_criteria}></Select>
    </div>
    <div class="impact-selector-child-1">
        <SectionTitle title="impact"></SectionTitle>
    </div>
</div>

<div style="">
    <slot {selected_criteria}/>
</div>

<style>
    .impact-selector-child-2 {
        width: 10%;
        margin-left: 0.5%;
    }
    .impact-selector-child-1 {
        width: 90%;
    }
    .impact-selector-parent {
        display: flex;
    }
</style>