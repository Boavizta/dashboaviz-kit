<script lang="ts">
    import NumberMetric from "$lib/metrics/NumberMetric.svelte";
    import Gauge from "$lib/metrics/Gauge.svelte";
    import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs.js';
    import SectionTitle from "$lib/zones/SectionTitle.svelte";
    import DyGraph from "$lib/graph/DyGraph.svelte";
    import TimeSerieChart from "$lib/graph/echarts/TimeSerieChart.svelte";
    let data =  [
        ['timestamp', 'amount', 'best'],
        ['2017-05-6',  58212, 35282],
        ['2017-05-11', 78254, 37284],
        ['2017-05-12', 41032, 34212],
        ['2017-05-13', 12755, 31225],
        ['2017-05-14', 20145, 32205],
        ['2017-05-15', 79146, 37296],
        ['2017-05-16', 91852, 39212],
        ['2017-05-17', 10185, 31205],
        ['2017-06-12', 20112, 32202]
    ];
    let events = [
        ['timestamp', 'event'],
        ['2017-05-8', 'High'],
        ['2017-05-16', 'Low']
    ]
</script>
    <h1>Server</h1>
    <Tabs>
        <TabList>
            <Tab>A</Tab>
            <Tab>B</Tab>
            <Tab>C</Tab>
        </TabList>

        <TabPanel>
            <h2>Lorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die oLorem Ipsum idjdoiejodjeoiĵ êzojoiezjoiezjdoiezj dezj dioezj diôez jdiẑej die o</h2>
        </TabPanel>

        <TabPanel>
            <h2>Second panel</h2>
        </TabPanel>

        <TabPanel>
            <h2>Third panel</h2>
        </TabPanel>
    </Tabs>

    <SectionTitle title="Server metrics"></SectionTitle>

    <div style="display: flex;">
        <NumberMetric value=34 description="Lorem" title="Impact"/>
        <NumberMetric value=1343 description="Lorem" title="Impact" unit="MJ"/>
        <NumberMetric value=34 description="Lorem" title="Impact" unit="%"/>
        <NumberMetric value=65 description="Lorem" title="Impact"/>
        <NumberMetric value=4 description="Lorem" title="Impact"/>
    </div>

    <SectionTitle title="Server gauges"></SectionTitle>

    <div style="display: flex;">
        <Gauge value=34 description="Lorem"/>
        <Gauge value=200 max_value="230" unit="/230" description="Lorem"/>
        <Gauge value=1 description="Lorem"/>
    </div>

    <SectionTitle title="Dygrap"></SectionTitle>
    <div style="display: flex;">
        <DyGraph description="Lorem" data="{[[1,10],[2,20],[3,50],[4,70]]}" />
        <DyGraph description="Lorem" data="{[[1,10],[2,20],[3,50],[4,70]]}" />
    </div>

    <SectionTitle title="Egraph"></SectionTitle>
    <div style="display: flex;">
        <TimeSerieChart description="Lorem" data={data} events={events}/>
    </div>


<style>
    h1{
        font-size: 2em;
        font-weight: 600;
        margin: 0 0 0 0.5%;
    }

</style>