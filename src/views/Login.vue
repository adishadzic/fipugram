<template>
  <div class="about">
    <h1>Login</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm"></div>
        <div class="col-sm" v-on:keyup.enter="login()">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input v-model="email" type="email" class="form-control"
                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="password" type="password" class="form-control"
                id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="button" @click="login()" class="btn btn-primary">Login</button>
            <br>
            <div class="mt-3">
							<p style="color: gray">or you can</p>
							<button type="button"	@click="logInWithGoogle()"	class="btn btn-dark">
								Sign in with Google
							</button>
						</div><br>
						<p class="forgot-password">
							You don't have an account?
							<router-link :to="{ name: 'Signup' }">Register</router-link>
						</p>
						<div v-show="errorMessage" class="alert alert-danger" role="alert">
							{{ errorMessage }}
						</div>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { firebase } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
        email: "",
        password: "",
        errorMessage: "",
    };
  },
  methods: {
    login() {
      console.log("login..." + this.email);
      firebase    
              .auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then((result) => {
                if (firebase.auth().currentUser.emailVerified) {
                  store.currentUser = firebase.auth().currentUser.email;
                } else {
                    console.log("email has not been verified");
                    firebase 
                            .auth()
                            .signOut()
                            .then(() => {
                              this.$router.push({ name: "Login"});
                            });
                }
              })
              .catch((e) => {
                console.error(e.message);
                this.errorMessage = e.message;
              });
    },


    logInWithGoogle() {
        console.log("Login with Google");
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase     
                .auth()
                .signInWithPopup(provider)
                .then((result) => {
                      store.currentUser = result.additionalUserInfo.profile.email;
                      this.$router.replace ({ name: "Home" });
                      store.token = result.credntial.accessToken;
                })
                .catch(function (error) {
                  this.errorMessage = error.message;
                });
    },
  },
};
</script>