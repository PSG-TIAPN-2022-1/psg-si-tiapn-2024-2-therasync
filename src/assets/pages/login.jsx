import React, { useState, useEffect } from 'react';
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
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }),
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados da API.');
                }
                
                const autenticado = await response.json();            
                // Verifica se existe um usuário com as credenciais fornecida
                if (autenticado.auth) {
                    // Autenticação bem-sucedida
                    setIsAuthenticated(true);
                    localStorage.setItem('token', autenticado.token);
                    alert('Bem-vindo(a)!');
                    navigate('/dashboard');
                } else {
                    alert('E-mail ou senha incorretos. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao autenticar:', error);
                alert('Erro ao autenticar. Verifique sua conexão e tente novamente.');
            }
        };

    return (
        <div className="body-login">
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
