import React from 'react';
import '../styles/clientes.css';


const Clientes = () => {
  return (
    /*Tudo correspondente a pagina deve estar dentro de container para melhor renderização do conteúdo da pagina */
    <div className='container'>
      <p id='titulo_container'>Clientes</p>


      <div className="tabela_clientes">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Última Consulta</th>
            <th>Próxima Consulta</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ativo</td>
            <td>Maria Silva</td>
            <td>35</td>
            <td>10/10/2024</td>
            <td>10/12/2024</td>
            <td><button class="btn-more">Mais</button></td>
          </tr>
          <tr>
            <td>Inativo</td>
            <td>João Santos</td>
            <td>40</td>
            <td>20/08/2024</td>
            <td>—</td>
            <td><button class="btn-more">Mais</button></td>
          </tr>
          <tr>
            <td>Ativo</td>
            <td>Ana Costa</td>
            <td>28</td>
            <td>15/09/2024</td>
            <td>15/11/2024</td>
            <td><button class="btn-more">Mais</button></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Clientes