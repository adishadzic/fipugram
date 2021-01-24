<template>
  <div>
    <h1>Signup</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="emailField">Full Name</label>
              <input type="email" v-model="fullName" class="form-control" id="nameField" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="emailField">Email address</label>
              <input type="email" v-model="email" class="form-control" id="emailField" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input type="password" v-model="password" class="form-control" id="passwordField" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input type="password" v-model="passwordConfirm" class="form-control" id="confirmPasswordField" placeholder="Confirm password">
            </div>
            <button type="button" @click="signup()" class="btn btn-primary mt-5">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { firebase } from '@/firebase';

export default {
  name: 'Signup',
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    signup() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(function() {
            console.log('Uspješna registracija');
        })
      .then((user) => {
        firebase 
          .auth()
          .currentUser.updateProfile({ displayName: this.fullName });
        this.verifyEmail();
      })
      .then(() => {
        this.fullName = "";
        this.email = "";
        this.password = "";
        firebase
          .auth()
          .signout()
          .then(() => {
            alert("Potrebno je verificirati e-mail prije korištenja aplikacije pomoću poslanog linka.")
            this.$router.push({ name: "Login" });
          });
      })
      .catch(function() {
          console.error('Došlo je do greške: ', error);
          if (error.message) {
            alert(error.message);
          }
        });
      console.log('Nastavak');
    },

    verifyEmail() {
      firebase  
        .auth()
        .currentUser.sendEmailVerification()
        .then(function () {
          //verification email sent
          console.log("Verification email sent");
        })
        .catch(function (error) {
          //Error occured. Inspect error.code.
          console.error("verifyError " + error);
        });
    },
  },

};
</script>