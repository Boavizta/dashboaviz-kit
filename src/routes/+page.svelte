<script lang="ts">
    import NumberMetric from "$lib/metrics/NumberMetric.svelte";
    import Gauge from "$lib/metrics/Gauge.svelte";
    import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs.js';
    import SectionTitle from "$lib/zones/SectionTitle.svelte";
    import DyGraph from "$lib/graph/DyGraph.svelte";
    import TimeSerieChart from "$lib/graph/echarts/TimeSerieChart.svelte";
    import BoaTable from "$lib/BoaTable.svelte";
    import MultiImpactsZone from "$lib/zones/MultiImpactsZone.svelte";
    import {onMount} from "svelte";
    import BarChart from "$lib/graph/echarts/BarChart.svelte";
    import MultiBar2Dimensions from "$lib/bars/MultiBar2Dimensions.svelte";

    let mutiimpactzone_barchart_data = {
        "GWP":{
            "unit":"kgCO2eq.",
            "description":"Global Warming Potential",
            "data":[
                ['version', 'operational', 'embedded'],
                ["v0.2", 2, 3],
                ["v0.3", 5, 10],
                ["v0.4", 13, 12],
                ["v0.5", 9, 11],
            ]
        },
        "PE":{
            "unit":"MJ",
            "description":"Primary Energy use",
            "data":[
                ['version', 'operational', 'embedded'],
                ["v0.2", 2, 3],
                ["v0.3", 5, 10],
                ["v0.4", 8, 12],
                ["v0.5", 9, 11],
            ]
        },
        "ADP":{
            "unit":"KgSbeq.",
            "description":"Abiotic Depletion Potential",
            "data":[
                ['version', 'operational', 'embedded'],
                ["v0.2", 2, 3],
                ["v0.3", 5, 10],
                ["v0.4", 8, 12],
                ["v0.5", 9, 11],
            ]
        }
    }

    let timeserie_data =  [
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
        ['2017-05-16', 'Low'],
        [new Date(2020, 2, 1), 'Something happened']
    ]
    let boatable_data =  [
        {"id":1,"name":"Project A","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/1" },
        {"id":2,"name":"Project B","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12), href: "/project/2"},
        {"id":3,"name":"Project C","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3), href: "/project/3"},
        {"id":4,"name":"Project D","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1), href: "/project/4"},
        {"id":5,"name":"Project E","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/5"},
        {"id":6,"name":"Project F","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/6"},
        {"id":7,"name":"Project G","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12), href: "/project/7"},
        {"id":8,"name":"Project H","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3), href: "/project/8"},
        {"id":9,"name":"Project I","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1), href: "/project/9"},
        {"id":10,"name":"Project J","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/10"},
        {"id":11,"name":"Project K","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/11"},
        {"id":12,"name":"Project L","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12), href: "/project/12"},
        {"id":13,"name":"Project M","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3), href: "/project/13"},
        {"id":14,"name":"Project N","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1), href: "/project/14"},
        {"id":15,"name":"Project O","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/15"},
        {"id":16,"name":"Project P","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1), href: "/project/16"},
        {"id":17,"name":"Project Q","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12), href: "/project/17"},
        {"id":18,"name":"Project R","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3), href: "/project/18"},
        {"id":19,"name":"Project S","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1), href: "/project/10"}
    ]

    let mutiimpactzone_timeserie_data = {
        "GWP":{
            "unit":"kgCO2eq.",
            "description":"Global Warming Potential",
            "data":[
                ["timestamp", "operational"],
                [new Date(2020, 0, 1), 1],
                [new Date(2020, 1, 1), 2],
                [new Date(2020, 2, 1), 3],
                [new Date(2020, 3, 1), 4],
                [new Date(2020, 4, 1), 5]
            ]
        },
        "PE":{
            "unit":"MJ",
            "description":"Primary Energy use",
            "data":[
                ["timestamp", "operational"],
                [new Date(2020, 0, 1), 11],
                [new Date(2020, 1, 1), 3],
                [new Date(2020, 2, 1), 6],
                [new Date(2020, 3, 1), 1],
                [new Date(2020, 4, 1), 123]
            ]
        },
        "ADP":{
            "unit":"KgSbeq.",
            "description":"Abiotic Depletion Potential",
            "data":[
                ["timestamp", "operational"],
                [new Date(2020, 0, 1), 13],
                [new Date(2020, 1, 1), 16],
                [new Date(2020, 2, 1), 15],
                [new Date(2020, 3, 1), 23],
                [new Date(2020, 4, 1), 12]
            ]
        }
    }

    let multiBar2Dimension = {
        "GWP":{
            "unit": "kg CO2e",
            "title": "Global Warming Potential",
            "description": "The Global Warming Potential (GWP) is a measure of the relative warming potential of a greenhouse gas compared to carbon dioxide (CO2).",
            "data":{
                "Usage": {
                    "": 100,
                },
                "Manufacture": {
                    "SSD": 100,
                    "HDD": 20,
                    "RAM": 30,
                    "CPU": 10,
                    "Others": 40,
                }
            }
        },
        "ADP":{
            "unit": "kgSbeq",
            "title": "Abiotic Depletion Potential",
            "description": "The Abiotic Depletion Potential (ADP) is a measure of the relative depletion potential of a material compared to copper.",
            "data": {
                "Usage": {
                    "": 100,
                },
                "Manufacture": {
                    "SSD": 100,
                    "HDD": 20,
                    "RAM": 30,
                    "CPU": 10,
                    "Others": 40,
                }
            }
        },
        "PE":{
            "unit": "MJ",
            "title": "Primary Energy",
            "description": "The Primary Energy (PE) is a measure of the energy required to produce a product.",
            "data": {
                "Usage": {
                    "": 900,
                },
                "Manufacture": {
                    "SSD": 1,
                    "HDD": 20,
                    "RAM": 30,
                    "CPU": 10,
                    "Others": 40,
                }
            }
        }
    }

    let impactsCriterias;
    onMount(() => {
        impactsCriterias = Object.keys(mutiimpactzone_timeserie_data).map((key) => {
            return {
                'label': key,
                'value': key
            }
        })
    });

</script>

<h1>DEMO</h1>
<Tabs>
    <TabList>
        <Tab>A</Tab>
        <Tab>B</Tab>
        <Tab>C</Tab>
    </TabList>

    <TabPanel>
        <BoaTable data={boatable_data}></BoaTable>
    </TabPanel>

    <TabPanel>
        <h2>Second panel</h2>
    </TabPanel>

    <TabPanel>
        <h2>Third panel</h2>
    </TabPanel>
</Tabs>

<MultiImpactsZone let:selected_criteria {impactsCriterias} name="MultiImpactsZone with time serie">
    <div style="display: flex;">
        <TimeSerieChart title="Egraph" data={mutiimpactzone_timeserie_data[selected_criteria].data} events={events} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada odio sed metus volutpat, eget cursus magna tincidunt. Suspendisse tincidunt felis nunc, egestas finibus nibh lobortis id. Nunc lacinia neque leo, eu efficitur nisi sodales id. Etiam metus nisl, malesuada vitae elementum sit amet, mollis sed enim. Ut at nisl quis enim blandit tempor. Mauris egestas nec est ac cursus. Nulla sit amet ligula at mauris tincidunt elementum. Suspendisse turpis eros, iaculis quis ultricies id, semper eget justo. Curabitur cursus ex eget urna scelerisque, vel suscipit sapien eleifend. Sed egestas aliquam fermentum. Nullam euismod mattis tristique. Suspendisse vel nulla lorem. Morbi accumsan et erat id fringilla. Duis eu enim ornare, mattis mi at, sodales nisi. "></TimeSerieChart>
    </div>
    <div style="display: flex;">
        <NumberMetric title="{selected_criteria} - Exemple" value={0.9} unit="{mutiimpactzone_timeserie_data[selected_criteria].unit}/h" description="Lorem ipsum "></NumberMetric>
        <NumberMetric title="{selected_criteria} Exemple" value={0.9} unit="{mutiimpactzone_timeserie_data[selected_criteria].unit}/kWh" description="Lorem ipsum "></NumberMetric>
        <NumberMetric title="{selected_criteria} - Exemple" value={0.9} unit="{mutiimpactzone_timeserie_data[selected_criteria].unit}" description="Lorem ipsum "></NumberMetric>
    </div>
</MultiImpactsZone>


<MultiImpactsZone let:selected_criteria {impactsCriterias} name="MultiImpactsZone with barchart">
    <div style="display: flex;">
        <BarChart title="BarChart" data={mutiimpactzone_barchart_data[selected_criteria].data} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada odio sed metus volutpat, eget cursus magna tincidunt. Suspendisse tincidunt felis nunc, egestas finibus nibh lobortis id. Nunc lacinia neque leo, eu efficitur nisi sodales id. Etiam metus nisl, malesuada vitae elementum sit amet, mollis sed enim. Ut at nisl quis enim blandit tempor. Mauris egestas nec est ac cursus. Nulla sit amet ligula at mauris tincidunt elementum. Suspendisse turpis eros, iaculis quis ultricies id, semper eget justo. Curabitur cursus ex eget urna scelerisque, vel suscipit sapien eleifend. Sed egestas aliquam fermentum. Nullam euismod mattis tristique. Suspendisse vel nulla lorem. Morbi accumsan et erat id fringilla. Duis eu enim ornare, mattis mi at, sodales nisi. "></BarChart>
    </div>
    <div style="display: flex;">
        <NumberMetric title="{selected_criteria} - Exemple" value={13} unit="{mutiimpactzone_barchart_data[selected_criteria].unit}" description="Lorem ipsum"></NumberMetric>
        <NumberMetric title="{selected_criteria} - Exemple" value={"X"}  description="Lorem ipsum"></NumberMetric>
        <NumberMetric title="{selected_criteria} - Exemple" value={"Y"} description="Lorem ipsum"></NumberMetric>
    </div>
</MultiImpactsZone>

<SectionTitle title="Gauges"></SectionTitle>
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
    <TimeSerieChart description="Lorem" data={timeserie_data} events={events}/>
</div>

<SectionTitle title="MultiBar2Dimensions"></SectionTitle>
<div style="display: flex;">
    <MultiBar2Dimensions data="{multiBar2Dimension}" description="How are the impacts assessed ? The impacts related to manufacture are assessed using the methodology detailed by Boavizta in this article. Those related to the use phase are evaluated from the average power consumption or modeled from the estimated server load. The methodology is detailed here: doc.api.boavizta.org. To go further. This page uses the BoaviztAPI. An open-source API that uses open data and methods to assess the environmental impacts of digital equipment." title="MultiBar2Dimensions"></MultiBar2Dimensions>
</div>

<style>
    h1{
        font-size: 2em;
        font-weight: 600;
        margin: 0 0 0 0.5%;
    }

</style>