import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import './styles.css';
import herosImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api.js'


export default function Logon() {
  const [id, setId] = useState('');
  const hystory = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('session', { id });
      
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      
      hystory.push('/profile');
    } catch(err) {
      alert('Falha no login')
    }
  }


  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Logo Be the Hero"/>
        
        <form onSubmit={handleLogin}>
          <h1>Faça o seu Logon</h1>

          <input  
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={herosImg} alt="Be The Hero"/>
    </div>
  );
}