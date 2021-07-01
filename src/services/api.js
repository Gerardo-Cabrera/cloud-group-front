import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default {
    login(data) {
        let controller = '/api/login';
        return axios.post(controller, data);
    },
    logout() {
        let controller = '/api/logout';
        return axios.delete(controller);
    },
    async entidades() {
        let controller = '/api/entidades';
        return axios.get(controller);
    },
    async categorias() {
        let controller = '/api/categorias';
        return axios.get(controller);
    },
    registroTrabajador(data) {
        let controller = '/api/trabajadores';
        return axios.post(controller, data);
    },
    registroPuestoLaboral(data) {
        let controller = '/api/puestos-laborales';
        return axios.post(controller, data);
    },
    datosTrabajador(data) {
        let controller = '/api/trabajadores';
        return axios.get(controller, data);
    }
}