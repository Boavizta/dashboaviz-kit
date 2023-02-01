<script>
  import "../app.postcss";
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname
  let collapse = false;
</script>
<main class:collapse-main={collapse} class:main={!collapse}>
    <nav>
        <img src="/menu.png" alt="logo" class:collapse-collapser={collapse} class:collapser={!collapse} on:click={() => collapse = !collapse}>

        <img src="/boavizta-logo.png" alt="logo" class:collapse-logo={collapse} class:logo={!collapse} >
        <ul>
            <li class:active={activeUrl === '/'}>
                <a href="/">
                    <img src="/icons/servers.png" alt="server" class:collapse-img={collapse}>
                    <span class="nav-name" class:collapse-txt={collapse}>
                        Server
                    </span>
                </a>
            </li>
            <li class:active={activeUrl === '/project'}>
                <a href="/project">
                    <img src="/icons/project.png" alt="server" class:collapse-img={collapse}>
                    <span class="nav-name" class:collapse-txt={collapse}>
                        Project
                    </span>
                </a>
            </li>
            <li class:active={activeUrl === '/pipeline'}>
                <a href="/pipeline">
                    <img src="/icons/pipeline.png" alt="server" class:collapse-img={collapse}>
                    <span class="nav-name" class:collapse-txt={collapse}>
                        Pipeline
                    </span>
                </a>
            </li>
            <li class:active={activeUrl === '/job'}>
                <a href="/job">
                    <img src="/icons/job.png" alt="server" class:collapse-img={collapse}>
                    <span class="nav-name" class:collapse-txt={collapse}>
                        Job
                    </span>
                </a>
            </li>
        </ul>
    </nav>
    <div id="content">
        <slot />
    </div>
</main>

<style>
    .collapser{
        position: absolute;
        top: 1%;
        right: 1%;
        width: 15%;
    }
    .collapse-collapser{
        position: relative;
        margin: 5% auto 20%;
        width: 60%;
    }
    .collapse-txt{
        display: none;
    }
    .nav-name{
        font-size: 1.1rem;
    }
    #content{
        padding: 1%;
        margin: 0.5%;
    }
    main{
        display: grid;
        grid-template-columns: 15% 85%;
        transition: grid-template-columns 0.5s ease;

    }
    main.collapse-main{
        grid-template-columns: 5% 95%;
        transition: grid-template-columns 0.5s ease;
    }
    nav{
        background-color: #006062;
        height: 100vh;
        position: sticky;
        top: 0;
    }
    nav ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    nav li{
        padding: 8px 16px;
        color: white;
        margin: 5%;
        border-radius: 10px;
    }
    nav li:hover{
        background-color: white;
        color: black;
        transition: background-color 0.5s ease;
    }
    .active{
        background-color: white;
        color: black;
    }
    nav a{
        text-decoration: none;
        display: flex;
        align-items: center;
    }
    nav img{
        margin-right: 10px;
        width: 15%;
    }
    .collapse-img{
        width: 70%;
        margin: auto;
        transition: width;
    }
    .collapse-logo {
        display: none;
    }
    .logo{
        width: 15%;
        margin: 5% auto 15%;
    }
</style>