<script>
  import "../app.postcss";
  import BoaviztaLayout from "$lib/layout/BoaviztaLayout.svelte";
  let menu_items = [
      {
          name: 'Server',
          icon: '/icons/servers.png',
          url: '/',
          alt: 'server'
      },
      {
          name: 'Project',
          icon: '/icons/project.png',
          url: '/project',
          alt: 'project'
      },
      {
          name: 'Pipeline',
          icon: '/icons/pipeline.png',
          url: '/pipeline',
          alt: 'pipeline'
      },
      {
          name: 'Job',
          icon: '/icons/job.png',
          url: '/job',
          alt: 'job'
      }
  ]
</script>
<main>
    <BoaviztaLayout menu_items={menu_items}>
        <slot></slot>
    </BoaviztaLayout>
</main>

<style>
</style>