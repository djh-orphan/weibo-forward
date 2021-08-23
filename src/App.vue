<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
  <header class="navbar navbar-expand-lg sticky-top navbar-light bg-light flex-md-nowrap shadow">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand" aria-current="page">
        微博
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link active" aria-current="page">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/myindex" class="nav-link" aria-current="page">
              我的
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              关于我
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="https://github.com/djh-orphan/weibo-forward" rel="noopener"
                  target="_blank">查看源码</a></li>
              <!-- <li><a class="dropdown-item" href="#">Another action</a></li> -->
              <!-- <li><hr class="dropdown-divider"></li> -->
              <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
            </ul>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </header>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-2 col-lg-1 d-md-block bg-light sidebar collapse">
        <div class="pt-5" style="position: fixed;">
          <ul class="nav flex-column">
            <li class="nav-item mb-3">
              <router-link to="/home" class="nav-link active" aria-current="page">
                首页
              </router-link>
            </li>
            <li class="nav-item md-3">
              <router-link to="/myindex" class="nav-link active" aria-current="page">
                我的
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view v-if="isRouterAlive" />
    </div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
