<script>
    import {page} from "$app/stores";

    $: activeUrl = $page.url.pathname
    let collapse = false;
    export let menu_items;
</script>

<div id='nav-parent' class:collapse-div={collapse} class:div={!collapse}>
    <nav>
        <img src="/menu.png" alt="logo" class:collapse-collapser={collapse} class:collapser={!collapse} on:click={() => collapse = !collapse}>
        <img src="/boavizta-logo.png" alt="logo" class:collapse-logo={collapse} class:logo={!collapse} >
        <ul>
            {#each menu_items as item}
                <li class:active={activeUrl === item.url}>
                    <a href={item.url}>
                        <img src={item.icon} alt={item.alt} class:collapse-img={collapse}>
                        <span class="nav-name" class:collapse-txt={collapse}>
                            {item.name}
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>

    <style>
        .collapser{
            position: absolute;
            top: 1%;
            right: 1%;
            width: 15%;
        }
        .collapse-collapser{
            position: relative;
            margin: 0 auto 20%;
            width: 40%;
            padding-top: 5%;
        }
        .collapse-txt{
            display: none;
        }
        .nav-name{
            font-size: 1.1rem;
        }
        #nav-parent{
            width: 18%;
            transition: width 0.5s ease;
        }
        #nav-parent.collapse-div{
            width: 5%;
            transition: width 0.5s ease;
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
            padding-top: 5%;
            margin: 0 auto 15%;
        }
    </style>