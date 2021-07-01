<template>
  <div class="home">
    <b-row>
      <b-col>
        <router-link class="btn btn-primary" to="registro-puesto-laboral">Registrar Puesto Laboral</router-link>
      </b-col>
      <b-col>
        <router-link class="btn btn-primary" to="registro-trabajador">Registrar Trabajador</router-link>
      </b-col>
      <b-col>
        <router-link class="btn btn-primary" to="perfil-trabajador">Perfil Trabajador</router-link>
      </b-col>
      <b-col>
        <input class="btn btn-secondary" type="button" @click="logout" value="Logout">
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Dashboard',
    data() {
        return {}
    },
    computed: {},
    methods: {
        removeInfoLocalStorage() {
            localStorage.removeItem('email');
            localStorage.removeItem('nombres');
            localStorage.removeItem('apellidos');
        },
        logout() {
            this.$Api.logout().then((response) => {
                if (response.status == 200) {
                    this.removeInfoLocalStorage();
                    this.$router.push('login');
                }
            });
        }
    }
}
</script>
