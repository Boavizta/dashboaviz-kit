<script>
    import {
        DataHandler,
        Datatable,
        Th, ThFilter
    } from '@vincjo/datatables'

    export let rows_per_page = 10

    export let data = [];

    const handler = new DataHandler(data, { rowsPerPage: rows_per_page })
    const rows = handler.getRows()
    const columns = data.length > 0 ? Object.keys(data[0]) : []
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                {#each columns as column}
                    {#if column !== 'id' && column !== 'href'}
                        <Th {handler} orderBy="{column}">{column}</Th>
                    {:else if column === 'href'}
                        <Th {handler}></Th>
                    {/if}
                {/each}
            </tr>
            <tr>
                {#each columns as column}
                    {#if column !== 'id' && column !== 'href'}
                        <ThFilter {handler} filterBy={column}>{column}</ThFilter>
                    {/if}
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
            <tr>
                    {#each columns as key}
                        {#if key !== 'id' && key !== 'href'}
                            <td>{row[key]}</td>
                        {:else if key === 'href'}
                            <td><a href="{row[key]}">🔗</a></td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>
