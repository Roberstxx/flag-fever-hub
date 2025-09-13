import { useState } from "react";
import Bubble from "../components/Bubble.jsx";
import OptionItem from "../components/OptionItem.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

export default function Quiz(){
  // Datos dummy por ahora; luego se reemplazan con la API
  const [questions] = useState([
    { id: 1, prompt: "¿A qué país pertenece esta bandera? 🇫🇮", options: ["Suecia","Vietnam","Finlandia","Austria"], answer: "Finlandia" },
    { id: 2, prompt: "¿Cuál es la capital de Francia? 🇫🇷", options: ["Lyon","París","Marsella","Niza"], answer: "París" },
    { id: 3, prompt: "¿Qué país tiene esta bandera? 🇯🇵", options: ["China","Corea del Sur","Japón","Tailandia"], answer: "Japón" },
    { id: 4, prompt: "¿Cuál es la capital de Australia? 🇦🇺", options: ["Sydney","Melbourne","Canberra","Perth"], answer: "Canberra" },
    { id: 5, prompt: "¿A qué país pertenece esta bandera? 🇧🇷", options: ["Argentina","Brasil","Colombia","Venezuela"], answer: "Brasil" },
    { id: 6, prompt: "¿Cuál es la capital de Canadá? 🇨🇦", options: ["Toronto","Vancouver","Ottawa","Montreal"], answer: "Ottawa" },
    { id: 7, prompt: "¿Qué país tiene esta bandera? 🇮🇳", options: ["Pakistán","Bangladesh","India","Sri Lanka"], answer: "India" },
    { id: 8, prompt: "¿Cuál es la capital de Egipto? 🇪🇬", options: ["Alejandría","El Cairo","Luxor","Asuán"], answer: "El Cairo" },
    { id: 9, prompt: "¿A qué país pertenece esta bandera? 🇷🇺", options: ["Polonia","Rusia","República Checa","Eslovaquia"], answer: "Rusia" },
    { id: 10, prompt: "¿Cuál es la capital de Sudáfrica? 🇿🇦", options: ["Johannesburgo","Durban","Ciudad del Cabo","Pretoria"], answer: "Pretoria" }
  ]);
  const [idx, setIdx] = useState(0);
  const [locked, setLocked] = useState(false);
  const [choice, setChoice] = useState(null);
  const [answers, setAnswers] = useState({});
  
  const q = questions[idx];

  function pick(opt){
    if(locked) return;
    setChoice(opt);
    setLocked(true);
    
    // Guardar respuesta
    const isCorrect = opt === q.answer;
    setAnswers(prev => ({
      ...prev,
      [q.id]: { choice: opt, correct: isCorrect }
    }));
  }

  function goToQuestion(newIdx) {
    if(newIdx === idx) return;
    setIdx(newIdx);
    setLocked(false);
    setChoice(null);
    
    // Si ya respondió esta pregunta, mostrar el estado
    const existingAnswer = answers[questions[newIdx].id];
    if(existingAnswer) {
      setChoice(existingAnswer.choice);
      setLocked(true);
    }
  }

  const stateFor = (opt) => {
    if(!locked) return (opt === choice ? "selected" : "idle");
    if(opt === q.answer) return "correct";
    if(opt === choice && opt !== q.answer) return "wrong";
    return "idle";
  };

  const correctAnswers = Object.values(answers).filter(a => a.correct).length;

  return (
    <section className="section">
      <div className="row space-between center" style={{marginBottom: "16px"}}>
        <h2 className="subtitle" style={{margin:0}}>Pregunta {idx+1}/10</h2>
        <div className="score-pill">🏆 {correctAnswers}/10 Points</div>
      </div>

      <div className="card">
        <div className="bubbles" aria-label="Navegación de preguntas">
          {Array.from({length:10}).map((_,i)=>(
            <Bubble 
              key={i} 
              number={i+1} 
              active={i===idx} 
              onClick={()=> goToQuestion(i)} 
            />
          ))}
        </div>

        <h2 className="subtitle" style={{textAlign:"center", marginBottom:"20px"}}>{q.prompt}</h2>

        <div className="options" role="radiogroup" aria-label="Opciones de respuesta">
          {q.options.map((opt)=>(
            <OptionItem key={opt} text={opt} state={stateFor(opt)} disabled={locked} onClick={()=> pick(opt)} />
          ))}
        </div>

        <div style={{marginTop: "20px"}}>
          <ProgressBar value={idx + 1} max={10} />
        </div>
      </div>

      <div className="row" style={{marginTop:"16px"}}>
        <button 
          className="btn" 
          onClick={()=> goToQuestion(Math.max(0, idx-1))}
          disabled={idx === 0}
        >
          Anterior
        </button>
        <button 
          className="btn" 
          onClick={()=> goToQuestion(Math.min(9, idx+1))}
          disabled={idx === 9}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}