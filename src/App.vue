<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light">
      <!-- Image and text -->
          <a class="navbar-brand" href="#">
            <img src="@/assets/fipugram.png" alt="" height="40" class="d-inline-block align-top">
          </a>
      <button class="navbar-toggler"
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
              
              <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Signup</router-link>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
           <input class="form-control mr-sm2" type="search" placeholder="Pretraga" aria-label="Search">
        </form>
      </div>
 </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: white !important;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
