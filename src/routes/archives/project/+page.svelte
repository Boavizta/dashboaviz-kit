<script lang="ts">
import NumberMetric from "$lib/metrics/NumberMetric.svelte";
import SectionTitle from "$lib/zones/SectionTitle.svelte";
import MultiImpactsZone from "$lib/zones/MultiImpactsZone.svelte";
import BarChart from "$lib/graph/echarts/BarChart.svelte";
import {onMount} from "svelte";
import {Tab, TabList, TabPanel, Tabs} from "$lib/tabs/tabs.js";
import {
    DataHandler,
    Datatable,
    Th, ThFilter
} from '@vincjo/datatables'

let pipelines = [
    {"id":1, "name":"v4.2", "date": new Date(2020, 3, 1)},
    {"id":2, "name":"v4.1", "date": new Date(2020, 2, 1)},
    {"id":3, "name":"v4.0", "date": new Date(2020, 1, 1)},
    {"id":4, "name":"v3.2", "date": new Date(2020, 0, 1)},
    {"id":5, "name":"v3.1", "date": new Date(2019, 11, 1)},
    {"id":6, "name":"v3.0", "date": new Date(2019, 10, 1)},
    {"id":7, "name":"v2.2", "date": new Date(2019, 9, 1)},
    {"id":8, "name":"v2.1", "date": new Date(2019, 8, 1)},
    {"id":9, "name":"v2.0", "date": new Date(2019, 7, 1)},
    {"id":10, "name":"v1.2", "date": new Date(2019, 6, 1)},
    {"id":11, "name":"v1.1", "date": new Date(2019, 5, 1)},
    {"id":12, "name":"v1.0", "date": new Date(2019, 4, 1)},
]

const handler = new DataHandler(pipelines, { rowsPerPage: 10 })
const rows = handler.getRows()


let project_name = "Personal Portfolio";

let project_impacts = {
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

let impactsCriterias;

onMount(() => {
    impactsCriterias = Object.keys(project_impacts).map((key) => {
        return {
            'label': key,
            'value': key
        }
    })
});
</script>

<h1>Project : {project_name}</h1>

<MultiImpactsZone let:selected_criteria {impactsCriterias}>
    <div style="display: flex;">
        <BarChart title="Version impacts" data={project_impacts[selected_criteria].data} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada odio sed metus volutpat, eget cursus magna tincidunt. Suspendisse tincidunt felis nunc, egestas finibus nibh lobortis id. Nunc lacinia neque leo, eu efficitur nisi sodales id. Etiam metus nisl, malesuada vitae elementum sit amet, mollis sed enim. Ut at nisl quis enim blandit tempor. Mauris egestas nec est ac cursus. Nulla sit amet ligula at mauris tincidunt elementum. Suspendisse turpis eros, iaculis quis ultricies id, semper eget justo. Curabitur cursus ex eget urna scelerisque, vel suscipit sapien eleifend. Sed egestas aliquam fermentum. Nullam euismod mattis tristique. Suspendisse vel nulla lorem. Morbi accumsan et erat id fringilla. Duis eu enim ornare, mattis mi at, sodales nisi. "></BarChart>
    </div>
    <div style="display: flex;">
        <NumberMetric title="{selected_criteria} - Average impact" value={13} unit="{project_impacts[selected_criteria].unit}" description="Lorem ipsum"></NumberMetric>
        <NumberMetric title="{selected_criteria} - Max" value={"v2"}  description="Lorem ipsum"></NumberMetric>
        <NumberMetric title="{selected_criteria} - Min" value={"V1"} description="Lorem ipsum"></NumberMetric>
    </div>
</MultiImpactsZone>

<SectionTitle title="Stats"></SectionTitle>
<div style="display: flex;">
    <NumberMetric title="Average time per jobs" value={25} unit="seconds" description="Lorem ipsum "></NumberMetric>
    <NumberMetric title="Pipeline number" value={12}></NumberMetric>
    <NumberMetric title="Job number" value={49}></NumberMetric>
</div>
<Tabs>
    <TabList>
        <Tab>Pipeline</Tab>
        <Tab>Impacts</Tab>
        <Tab>Latest tags</Tab>
    </TabList>
    <TabPanel>
        <Datatable {handler}>
            <table>
                <thead>
                <tr>
                    <Th {handler} orderBy="name">Pipeline</Th>
                    <Th {handler} orderBy="date">Date</Th>
                    <Th {handler}></Th>
                </tr>
                <tr>
                    <ThFilter {handler} filterBy="name"/>
                    <ThFilter {handler} filterBy="date"/>
                </tr>
                </thead>
                <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.name}</td>
                        <td>{row.date.toISOString()}</td>
                        <td><a href="/pipeline/{row.id}">🔗</a></td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </Datatable>
    </TabPanel>
    <TabPanel>
        <pre>
           {JSON.stringify(project_impacts, null, 1)}
        </pre>
    </TabPanel>
    <TabPanel>
        {""}
    </TabPanel>
</Tabs>
<style>
</style>