<script>
    import EChart from "$lib/graph/echarts/EChart.svelte";
    import {afterUpdate, onMount} from "svelte";
    import {ColorProvider} from "$lib/ColorProvider.js";

    export let title;
    export let description;
    export let plainArea = true;
    export let color_provider = new ColorProvider();
    export let data = [];
    export let events;

    let option = {};

    function createGraph(){
        let areaStyle = plainArea ? {opacity: 0.2} : {opacity: 0}

        option = {
            xAxis: {
                type: 'time',
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

        if (events){
            let event_series = []
            events.forEach(event => {
                if (event[0] !== 'timestamp') {
                    event_series.push({xAxis: event[0], name: event[1], label: {position: 'middle', formatter: event[1]}})
                }
            })

            option.series.push({
                name: "Events",
                type: 'line',
                smooth: true,
                data: [],
                markLine: { data: event_series},
                color: color_provider.next()
            })
        }

        if (data){
            data[0].forEach(elmt => {
                if (elmt !== 'timestamp') {
                    option.series.push( {
                        type: 'line',
                        data: data.map(row => [row[0], row[data[0].indexOf(elmt)]]),
                        name: elmt,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 2
                        },
                        areaStyle: areaStyle,
                        color: color_provider.range(data[0].length)
                    });
                }
            });
        }
    }

    onMount(() => {
        color_provider.reset();
        createGraph();
    });

    afterUpdate(() => {
        color_provider.reset();
        createGraph();
    });

    $: if (option) {
        color_provider.reset();
        createGraph();
    }
</script>

<EChart option="{option}" title="{title}" description="{description}"></EChart>