import React, {useState, useEffect} from 'react'
import './style.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api.js'

// aula 3 as 59:32

export default function Profile() {
  const [insidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory()


  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId, 
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`,{
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(insidents.filter(incident => incident.id !== id))
    } catch(err) {
      alert('Erro ao tentar deletar o caso!')
    }
  }

  async function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-conteiner">
      <header>
        <img src={logoImg} alt="Be the Hero" />
  <span>Bem vindo, {ongName}</span>
 
        <Link className="button" to="/incidents/new">Cadastre novo caso</Link>
        <button onClick={handleLogout} type="button" >
          <FiPower size={18} color="#E02041" />
        </button>
 
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {insidents.map(incident => (
                  <li key={incident.id} >
                  <strong>Caso:</strong>
                  <p>{incident.title}</p>
        
                  <strong>DESCRIÇÃO:</strong>
                  <p>{incident.description}</p>
                  
                  <strong>VALOR:</strong>
                  <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
        
                  <button onClick={() => handleDeleteIncident(incident.id)}  type="button">
                    <FiTrash2 size={20} color="#a8a8b3"  />
                  </button>
                </li>
        ))}
      </ul>
    </div>
  )
}