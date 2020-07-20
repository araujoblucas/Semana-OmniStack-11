import React, {useState} from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    const history = useHistory();

    async function CreateIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try {
            api.post('/incidents', data, { 
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Caso criado!');
            history.push('/profile');

        } catch (err) {
            alert("Não foi possivel cadastrar, tente novamente");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={CreateIncident}>
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
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>

    
    );
}