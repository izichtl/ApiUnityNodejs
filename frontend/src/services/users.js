import {http} from './config';

export default {
    listar: () => {
        return http.get('user')
    },
    cadastrar: (usuario) => {
        return http.post('user', usuario)

    },
    deletar: (usuario) => {
        return http.delete(`user/${usuario.user_id}`)

    },
    atualizar:(usuario) => {
        console.log(usuario)
        return http.put(`user/${usuario.user_id}`, usuario)
    }
}