import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function ComponenteLogin({ type, text, id, value, onChange }) {
    return <input type={type} placeholder={text} id={id} value={value} onChange={onChange} />;
}

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:3000/api/users';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
            }
            const data = await response.json();

            const usuario = data.find(
                (user) => user.username === email && user.senha === senha
            );

            if (usuario) {
                setIsAuthenticated(true);
                

                localStorage.setItem('isAuthenticated', 'true');
                

                navigate('/dashboard');
            } else {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao autenticar:', error);
            alert('Erro ao autenticar. Tente novamente.');
        }
    };
    return (
        <div className='body-login'>
            <div id="tela-login">
                <div id="header-login">
                    <img src="https://i.ibb.co/31WR201/Thera-Sync.png" alt="Logo" />
                    <p>Insira os dados para continuar</p>
                </div>
                <div id="login-Dados">
                    <form onSubmit={handleSubmit}>
                        <ComponenteLogin
                            type="email"
                            text="Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ComponenteLogin
                            type="password"
                            text="Senha"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <label>
                            <input type="checkbox" name="Manter conectado" />
                            <span className="custom-checkbox"></span>
                            <span className="TextoConectado">Manter conectado</span>
                        </label>
                        <div id="login-parte-baixo">
                            <a href="#">Esqueci minha senha</a>
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
