import '../styles/login.css';
import React from 'react';

function Componente({ type, text }) {
    return <input type={type} placeholder={text} id="Componente" />
}


function Login() {
    return (
        <div id="login">
            <div id="header">
                <img src="https://i.ibb.co/31WR201/Thera-Sync.png" alt="Logo" />
                <p>Insira os dados para continuar</p>
            </div>
            <div id="Dados">
                <form>
                    <Componente type="email" text="Email" />
                    <Componente type="password" text="Senha" />
                </form>
                <label>
                    <input type="checkbox" name="Manter conectado" />
                    <span className="custom-checkbox"></span>
                    <span className="TextoConectado">Manter conectado</span>
                </label>
            </div>
            <div id="parte-baixo">
                <a href='#'>Esqueci minha senha</a>
                <button type="submit">Entrar</button>
            </div>
        </div>
    );
}

export default Login;