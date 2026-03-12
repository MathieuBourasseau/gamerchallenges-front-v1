import { useState } from "react";
import { useParams } from "react-router-dom"

export default function ParticipationsByChallenge() {

    // --- Get id from params --- 
    const { id } = useParams();

    // --- States initialization --- 
    const[participations, setParticipations] = useState()

  return (
    <section>
    </section>
    
  )
}
