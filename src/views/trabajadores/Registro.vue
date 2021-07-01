<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <div class="">
                <h2><router-link to="/dashboard">Menú</router-link></h2>
            </div>
            
            <h1>Registrar Trabajador</h1>

            <form id="registro" name="registro" v-on:submit.prevent="registrar">
                <input type="text" id="nombre" class="fadeIn second style-input" name="nombre" placeholder="Nombre" v-model="nombre" v-on:keypress="alphabethicsOnly">
                <input type="text" id="apellidos" class="fadeIn third style-input" name="apellidos" placeholder="Apellidos" v-model="apellidos" v-on:keypress="alphabethicsOnly">
                <input type="text" id="dni" class="fadeIn third style-input" name="dni" placeholder="DNI (9 Dígitos)" maxlength="9" v-model="dni" v-on:keypress="numbersOnly">
                <b-form-datepicker id="fechaNacimiento" name="fechaNacimiento" v-model="fechaNacimiento" :max="maxDate" class="mb-2 style-input" placeholder="Seleccione una fecha" locale="es-MX"
                :date-format-options="{
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }"
                ></b-form-datepicker>
                <textarea name="direccion" id="direccion" v-model="direccion" class="style-input" cols="30" rows="3"></textarea>
                <b-form-file id="foto" v-model="foto" :state="Boolean(foto)" placeholder="Seleccionar archivo. Tamaño máximo 2MB" accept=".jpg, .png, .gif" class="" @change="onFileChange"></b-form-file>
                <b-form-select id="entidad" name="entidad" v-model="selected" size="sm" class="form-control b-form-select">
                    <b-form-select-option :value="null" disabled="disabled">Seleccione entidad</b-form-select-option>
                    <b-form-select-option v-for="item in items.data" v-bind:key="item.entidad_id" :value="item.entidad_id">{{item.nombre}}</b-form-select-option>
                </b-form-select>
                <input type="submit" class="fadeIn fourth" value="Registrar usuario" :disabled="btnDisabled">
            </form>
            <router-link to="/">Iniciar sesión</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Registro-Trabajador',
        data() {
            const now = new Date();
            const today =
            (now.getFullYear() - 18) +
            "-" +
            (now.getMonth() + 1 < 10 ? "0" : "") +
            (now.getMonth() + 1) +
            "-" +
            now.getDate();

            return {
                maxDate: today,
                nombre: "",
                apellidos: "",
                dni: "",
                fechaNacimiento: "",
                direccion: "",
                foto: null,
                error: false,
                message_error: "",
                enabled: false,
                field: [],
                items: null,
                selected: null,
                redirect: false
            }
        },
        computed: {
            btnDisabled: function() {
                return (
                    !this.nombre || !this.apellidos || !this.dni || this.dni.length < 9 || !this.fechaNacimiento || 
                    !this.direccion || !this.foto || !this.selected
                )
            }
        },
        methods: {
            alphabethicsOnly(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;

                if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 91 || charCode > 122)) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            numbersOnly(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;

                if ((charCode < 48 || charCode > 57)) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            showMsg() {
                this.$bvModal.msgBoxOk('Usuario registrado', {
                    title: 'Mensaje',
                    size: 'sm',
                    buttonSize: 'sm',
                    headerClass: 'p-2 ',
                    footerClass: 'p-2 ',
                    centered: true,
                })
                .then(value => {
                    console.log(value)
                    this.redirect = value
                })
            },
            clearFields() {
                this.nombre = this.apellidos = this.dni = this.fechaNacimiento = this.direccion = "";
                this.foto = this.selected = null;
            },
            onFileChange(e) {
                this.foto = e.target.files[0] || e.dataTransfer.files[0];
            },
            registrar() {
                let inputs = document.getElementById("registro").elements;
                let formData = new FormData();
                let typeInputs = ['INPUT', 'TEXTAREA', 'SELECT'];

                for (let key in inputs) {
                    for (let type in typeInputs) {
                        if (inputs[key].nodeName == typeInputs[type]) {
                            if (!(inputs[key].id in formData) || !(inputs[key].name in formData)) {
                                formData.append(inputs[key].id, inputs[key].value) || formData.append(inputs[key].name, inputs[key].value)
                            }
                        }
                    }
                }

                formData.delete('foto')
                formData.append("foto", this.foto)
                this.$Api.registroTrabajador(formData).then((response) => {
                    if (response.status == 200) {
                        this.makeToast('success');
                        this.showMsg();
                        this.clearFields();
                        setTimeout(() => {
                            this.$router.push('login');
                        }, 5000);
                    }
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
            },
            entidades() {
                this.$Api.entidades().then((response) => {
                    this.items = response;
                });
            }
        },
        created() {
            this.items = this.entidades();
        }
    }
</script>

<style scoped>
    html {
    background-color: #56baed;
    }

    body {
    font-family: "Poppins", sans-serif;
    height: 100vh;
    }

    a {
    color: #92badd;
    display:inline-block;
    text-decoration: none;
    font-weight: 400;
    }

    h1 {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    text-transform: uppercase;
    display:inline-block;
    margin: 20px 0px 10px 0px; 
    color: #cccccc;
    }

    h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display:inline-block;
    margin: 20px 8px 00px 8px; 
    color: #cccccc;
    }

    /* STRUCTURE */

    .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column; 
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
    }

    #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    text-align: center;
    }

    #formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
    }

    /* TABS */

    h2.inactive {
    color: #cccccc;
    }

    h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
    }

    /* FORM TYPOGRAPHY*/

    input[type=button], input[type=submit], input[type=reset]  {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    }

    input[type=button]:hover:enabled, input[type=submit]:hover:enabled, input[type=reset]:hover  {
    background-color: #39ace7;
    }

    input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
    }

    .style-input {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    }

    input[type=text]:focus, input[type=password]:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
    }

    input[type=text]:placeholder, input[type=password]:placeholder {
    color: #cccccc;
    }

    /* ANIMATIONS */

    /* Simple CSS3 Fade-in-down Animation */
    .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    }

    @-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
    }

    @keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
    }

    /* Simple CSS3 Fade-in Animation */
    @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    .fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;

    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    -webkit-animation-duration:1s;
    -moz-animation-duration:1s;
    animation-duration:1s;
    }

    .fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
    }

    .fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
    }

    .fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
    }

    .fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
    }

    /* Simple CSS3 Fade-in Animation */
    .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
    }

    .underlineHover:hover {
    color: #0d0d0d;
    }

    .underlineHover:hover:after{
    width: 100%;
    }

    /* OTHERS */

    *:focus {
        outline: none;
    } 

    #icon {
    width:60%;
    }

    .h-auto {
        position: absolute !important;
        left: 80px !important;
        top: 44px !important;
    }

    .b-form-datepicker {
        padding: 0 !important;
    }

    .mystyle {
        position: absolute !important;
        top: 30px !important;
        left: 80px !important;
    }

    .custom-file {
        margin: 10px 0 !important;
    }

    .b-form-select {
        width: 84% !important;
        margin: 4% 8%;
    }

    .b-toast {
        z-index: 1200;
    }

    .toast-p {
        display: initial !important;
    }

</style>