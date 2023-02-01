<script>
    let state = "metric";

    export let title = "Title";
    export let description = "null";

    function change_view(){
        if (description === "null")  {
            return
        }
        if(state === "metric"){
            state = "description";
        }else {
            state = "metric";
        }
    }
</script>

<div id="component-box">
    <div class={state === 'metric' ? 'metric-vue-state-metric' : 'metric-vue-state-desc'}>
        <div id="info">
            <span id="title">{title}</span>
            <div id="info-box"
                 on:mouseover={() => {
                       change_view();
                     }}
                 on:mouseleave={() => {
                         change_view();
                     }}>
                ⓘ
            </div>
        </div>
        <div id="content">
            <slot />
        </div>
    </div>
    <div class={state === 'metric' ? 'description-vue-state-metric' : 'description-vue-state-desc'}>
        <p class="description-txt">{@html description}</p>
    </div>
</div>

<style>
    .description-txt{
        font-size: 1vw;
    }
    #component-box div{
        grid-row: 1;
        grid-column: 1;
    }
    #info-box{
        text-align: center;
        width: 15%;
        font-size: 1vw;
        cursor: help;
        border: solid;
        border-width: 0 0 0 1px;
    }
    #title {
        font-size: 1vw;
        font-weight: bold;
        width: 85%;
    }
    #info{
        display: flex;
        align-items: center;
        border: solid;
        border-width: 0 0 1px 0;
        padding-top: 0.1%;
        padding-bottom: 0.1%;
    }
    #content {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: auto;
    }
    #component-box {
        display: grid;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin: 0.5%;
        text-align: center;
        width: 100%;
    }
    .metric-vue-state-metric{
        opacity: 1;
        z-index: 1;
    }
    .description-vue-state-metric{
        font-size: 2vw;
        opacity: 0;
        padding: 2%;
    }
    .metric-vue-state-desc{
        opacity: 0;
        z-index: 0;
    }
    .description-vue-state-desc{
        font-size: 2vw;
        opacity: 1;
        padding: 2%;
    }
</style>