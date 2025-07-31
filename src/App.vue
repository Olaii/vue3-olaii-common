<template>
  <OlaiiSidebar :links="links" />

  <main class="demo">
    <RouterView />
  </main>

  <NiceSvgs />
  <NiceToast />
  <NiceNotifications />
</template>

<script setup>
const links = [
  {
    name: "Home",
    path: "home",
    icon: "icon-home",
  },
  {
    name: "Auth store",
    path: "auth-store",
    icon: "icon-user",
  },
  {
    name: "General store",
    path: "general-store",
    icon: "icon-box",
  }
]
</script>


<script>
export default {
  name: "App",
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}


html,
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: var(--nice-font-color);
  background: var(--nice-background-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

:root {
  --nice-primary-color: #3173FF !important;
  --nice-primary-color-darker: #0857ff !important;
  --nice-primary-color-lighter: #5a8fff !important;
  --nice-primary-color-shadow: #e0eaff !important;
}

#app {
  display: flex;
  height: 100dvh;
  width: 100%;
}

.demo {
  flex-grow: 1;
}

aside {
  position: sticky;
  top: 0;
  width: 300px;
  flex-shrink: 0;
  height: 100vh;
  background: var(--nice-card-bg);
  border-right: 1px solid var(--nice-border-color);
  display: flex;
  flex-direction: column;

  .top-bar {
    background: var(--nice-primary-color);
    color: white;
    padding: 1.5rem;
    flex-shrink: 0;

    h3 {
      font-size: 0.8em;
    }
  }

  .links {
    flex-grow: 1;
    overflow: auto;
    padding: 1rem;

    .link {
      display: block;
      padding: 0.8rem;
      margin-bottom: 0.5rem;
      text-decoration: none;
      color: var(--nice-font-color);
      border-radius: var(--nice-border-radius);
      background: var(--nice-card-bg);

      &.router-link-exact-active, &:hover {
        color: white;
        background: var(--nice-primary-color);
      }
    }
  }
}
</style>