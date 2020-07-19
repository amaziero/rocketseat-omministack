import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api.js'

export default function NewIncident() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description, 
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch(err) {
      alert('Não foi possivel cadastrar o caso, tente novamente!')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo Be the Hero"/>

          <h1>Cadstrar novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar o herói para resolver o problema!</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para os casos
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastro</button>
        </form>
      </div>
    </div>
  )
}