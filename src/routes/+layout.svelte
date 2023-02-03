<script>
  import "../app.postcss";
  import BoaviztaLayout from "$lib/layout/BoaviztaLayout.svelte";
  let menu_items = [
      {
          name: 'DEMO',
          icon: '/icons/servers.png',
          url: '/',
          alt: 'server'
      },
  ]
</script>
<main>
    <BoaviztaLayout menu_items={menu_items}>
        <slot></slot>
    </BoaviztaLayout>
</main>

<style>
</style>