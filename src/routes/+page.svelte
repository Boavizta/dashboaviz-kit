<script lang="ts">
import SectionTitle from "$lib/zones/SectionTitle.svelte";
import TimeSerieChart from "$lib/graph/echarts/TimeSerieChart.svelte";
import MultiImpactsZone from "$lib/zones/MultiImpactsZone.svelte";
import NumberMetric from "$lib/metrics/NumberMetric.svelte";
import {onMount} from "svelte";
import {Tabs, Tab, TabList, TabPanel} from "$lib/tabs/tabs.js";
import {
    DataHandler,
    Datatable,
    Th, ThFilter
} from '@vincjo/datatables'

let projects = [
    {"id":1,"name":"Project A","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":2,"name":"Project B","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12)},
    {"id":3,"name":"Project C","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3)},
    {"id":4,"name":"Project D","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1)},
    {"id":5,"name":"Project E","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":6,"name":"Project F","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":7,"name":"Project G","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12)},
    {"id":8,"name":"Project H","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3)},
    {"id":9,"name":"Project I","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1)},
    {"id":10,"name":"Project J","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":11,"name":"Project K","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":12,"name":"Project L","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12)},
    {"id":13,"name":"Project M","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3)},
    {"id":14,"name":"Project N","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1)},
    {"id":15,"name":"Project O","last_version":"v1.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":16,"name":"Project P","last_version":"v4.2", "last_pipeline": new Date(2020, 3, 1)},
    {"id":17,"name":"Project Q","last_version":"v0.1", "last_pipeline": new Date(2020, 2, 12)},
    {"id":18,"name":"Project R","last_version":"v2.2", "last_pipeline": new Date(2020, 6, 3)},
    {"id":19,"name":"Project S","last_version":"v3.5", "last_pipeline": new Date(2020, 1, 1)}
]


const handler = new DataHandler(projects, { rowsPerPage: 10 })
const rows = handler.getRows()

let events = [
    ["timestamp", "event"],
    [new Date(2020, 3, 1), "Something happened"],
]

let impactsCriterias;

let server_impacts = {
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

let cpu_usage = [
    ["timestamp", "cpu_usage"],
    [new Date(2020, 0, 1), 12],
    [new Date(2020, 1, 1), 23],
    [new Date(2020, 2, 1), 32],
    [new Date(2020, 3, 1), 11],
    [new Date(2020, 4, 1), 9]
]

let ram_usage = [
    ["timestamp", "ram_usage"],
    [new Date(2020, 0, 1), 9],
    [new Date(2020, 1, 1), 3],
    [new Date(2020, 2, 1), 6],
    [new Date(2020, 3, 1), 12],
    [new Date(2020, 4, 1), 3]
]

let consumption_per_source = [
    ["timestamp", "RAPL", "DCMI", "PDU"],
    [new Date(2020, 0, 1), 22, 20, 24],
    [new Date(2020, 1, 1), 23, 18, 27],
    [new Date(2020, 2, 1), 18, 19, 21],
    [new Date(2020, 3, 1), 17, 18, 19],
    [new Date(2020, 4, 1), 14, 12, 22]
]

let consumption_per_process = [
    ["timestamp", "A", "B", "C"],
    [new Date(2020, 0, 1), undefined, 2, 5],
    [new Date(2020, 1, 1), undefined, 3, 6],
    [new Date(2020, 2, 1), 9, 12, undefined],
    [new Date(2020, 3, 1), 11, 13, undefined],
    [new Date(2020, 4, 1), 7, 8, undefined]
]

onMount(() => {
    impactsCriterias = Object.keys(server_impacts).map((key) => {
        return {
            'label': key,
            'value': key
        }
    })
});

</script>

<h1>Server metrics</h1>

<MultiImpactsZone let:selected_criteria {impactsCriterias}>
    <div style="display: flex;">
        <TimeSerieChart title="Operational impacts" data={server_impacts[selected_criteria].data} events={events} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada odio sed metus volutpat, eget cursus magna tincidunt. Suspendisse tincidunt felis nunc, egestas finibus nibh lobortis id. Nunc lacinia neque leo, eu efficitur nisi sodales id. Etiam metus nisl, malesuada vitae elementum sit amet, mollis sed enim. Ut at nisl quis enim blandit tempor. Mauris egestas nec est ac cursus. Nulla sit amet ligula at mauris tincidunt elementum. Suspendisse turpis eros, iaculis quis ultricies id, semper eget justo. Curabitur cursus ex eget urna scelerisque, vel suscipit sapien eleifend. Sed egestas aliquam fermentum. Nullam euismod mattis tristique. Suspendisse vel nulla lorem. Morbi accumsan et erat id fringilla. Duis eu enim ornare, mattis mi at, sodales nisi. "></TimeSerieChart>
    </div>
    <div style="display: flex;">
        <NumberMetric title="{selected_criteria} - Average operational impact" value={0.9} unit="{server_impacts[selected_criteria].unit}/h" description="Lorem ipsum "></NumberMetric>
        <NumberMetric title="{selected_criteria} intensity" value={0.9} unit="{server_impacts[selected_criteria].unit}/kWh" description="Lorem ipsum "></NumberMetric>
        <NumberMetric title="{selected_criteria} - Embodied impact" value={0.9} unit="{server_impacts[selected_criteria].unit}" description="Lorem ipsum "></NumberMetric>
    </div>
</MultiImpactsZone>

<SectionTitle title="Ressource usage"></SectionTitle>
<div style="display: flex;">
    <TimeSerieChart title="CPU usage" data="{cpu_usage}" events="{events}"></TimeSerieChart>
    <TimeSerieChart title="RAM usage" data="{ram_usage}" events="{events}"></TimeSerieChart>
</div>

<SectionTitle title="Electrical consumption"></SectionTitle>

<div style="display: flex;flex-wrap: wrap">
    <TimeSerieChart title="Electrical consumption - per sources" data="{consumption_per_source}"  events="{events}" ></TimeSerieChart>
    <TimeSerieChart title="Electrical consumption - per process" data="{consumption_per_process}"  events="{events}" plainArea={false}></TimeSerieChart>
</div>

<Tabs>
    <TabList>
        <Tab>Projects</Tab>
        <Tab>Impacts</Tab>
        <Tab>Configuration</Tab>
    </TabList>

    <TabPanel>
        <Datatable {handler}>
            <table>
                <thead>
                <tr>
                    <Th {handler} orderBy="name">Project</Th>
                    <Th {handler} orderBy="last_version">Last version</Th>
                    <Th {handler} orderBy="last_pipeline">Last run</Th>
                    <Th {handler}></Th>
                </tr>
                <tr>
                    <ThFilter {handler} filterBy="name"/>
                    <ThFilter {handler} filterBy="last_version"/>
                    <ThFilter {handler} filterBy="last_pipeline"/>
                </tr>
                </thead>
                <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.last_version}</td>
                        <td>{row.last_pipeline.toISOString()}</td>
                        <td><a href="/project/{row.id}">🔗</a></td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </Datatable>
    </TabPanel>

    <TabPanel>
        <pre>
           {JSON.stringify(server_impacts, null, 1)}
        </pre>
    </TabPanel>

    <TabPanel>
        <pre>
           {""}
        </pre>
    </TabPanel>
</Tabs>

<style>
    thead{
        background:#fff;
        text-align: center;
        margin: auto;
    }
    tbody td{
        padding:4px;
    }
    tbody tr:nth-child(even){
        background:#fafafa;
    }
    tbody tr{
        transition:all, 0.2s;
    }
    tbody tr:hover{
        background:#f5f5f5;
    }
</style>