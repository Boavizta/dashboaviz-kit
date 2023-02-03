<script>
    import "../../app.postcss";
    import MenuBar from "$lib/layout/MenuBar.svelte";
    export let menu_items;
</script>
<main>
    <MenuBar menu_items={menu_items}/>
    <div id="content">
        <slot/>
    </div>
</main>

<style>
    main{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    #content{
        width: 100%;
        margin: 1%;
    }
</style>