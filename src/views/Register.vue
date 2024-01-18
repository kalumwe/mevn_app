<template>
  <div class="col-md-6 mx-auto">
    <div class="card ">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40|regex:[A-Z]+.*[0-9]+.*[^A-Za-z0-9]'"
              type="password"
              class="form-control"
              name="password"
              @input="checkPasswordStrength"
            />
            <progress :value="strength" max="100" :class="progressClass"></progress>            
            <div :class="progressClass">{{ strengthText }}</div>            
            <div :class="progressClass" id="progressBar" :style="{ width: strength + '%' }"></div>

            <div
              v-if="submitted && errors.has('password')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Password</label>
            <input
              v-model="confirmPassword"
              v-validate="'required|confirmed:password'"
              type="password"
              class="form-control"
              name="confirmPassword"
            />
            <div
              v-if="submitted && errors.has('confirmPassword')"
              class="alert alert-danger"
              role="alert"
            >{{errors.first('confirmPassword')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        role="alert"
        :class="successful ? 'alert alert-success' : 'alert alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register-view',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
      confirmPassword: '',
      strength: 0,
      passwordStrengthIcon: '',
    };
  },
  computed: {

    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },

    progressClass() {
      if (this.strength < 30) {
        return 'weak';
      } else if (this.strength < 70) {
        return 'moderate';
      } else {
        return 'strong';
      }
    },

    strengthText() {
      if (this.strength == 0) {
        return '';
      } else if (this.strength < 30) {
        return 'Weak';
      } else if (this.strength < 70) {
        return 'Moderate';
      } else  {
        return 'Strong';
      }
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('signup/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },

    checkPasswordStrength() {
      //If the length of the password is less than 10, it will return the length of the password.
      // If the length of the password is greater than or equal to 10, it will return 10.
      const lengthStrength = Math.min(this.user.password.length, 10); 
      this.strength = (lengthStrength / 10) * 50 ;

      if (/[A-Z]/.test(this.user.password)) {
        this.strength += 15;
      }

      if (/[0-9]/.test(this.user.password)) {
        this.strength += 15;
     }

     if (/[^A-Za-z0-9]/.test(this.user.password)) {
        this.strength += 10;
     }

     if (/[A-Za-z0-9]{8,}/.test(this.user.password)) {
       this.strength += 15;
     }

    // return this.strength;
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

progress {
  width: 100%;
}

.weak {
  color: red;
}

.moderate {
  color: orange;
}

.strong {
  color: green;
}

.progress {
  width: 300px;
  height: 20px;
  border: 1px solid #ccc;
  margin-top: 10px;
  overflow: hidden;
}

.progress div {
  height: 100%;
  background-color: #4caf50; 
}

</style>