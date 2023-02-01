<script>
    import EChart from "$lib/graph/echarts/EChart.svelte";
    import {afterUpdate, onMount} from "svelte";

    export let title;
    export let description;

    export let data;

    let option = {};

    function createGraph(){
        option = {
            xAxis: {
                type: 'category',
                splitLine: {show: true}
            },
            yAxis: {
                type: 'value',
                splitLine: {show: true}
            },
            series: [],
            title: {text: null},
            animation: false,
            toolbox: {
                itemSize: 20,
                right: 55,
                top: 20,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    }
                }
            },
            legend: {
                orient: 'horizontal',
                top: 'bottom',
                right:'center'
            },
            tooltip: {
                trigger: 'axis',
            }
        };

        if (data){
            option.xAxis.data = data.slice(1).map(d =>d[0]);
            for (let i = 1; i < data[0].length; i++){
                option.series.push({
                    name: data[0][i],
                    type: 'bar',
                    data: data.slice(1).map(d => d[i]),
                    smooth: true,
                    stack: "x"
                });
            }
        }
    }

    onMount(() => {
        createGraph();
    });

    afterUpdate(() => {
        createGraph();
    });

    $: if (option) {
        createGraph();
    }
</script>

<EChart option="{option}" title="{title}" description="{description}"></EChart>