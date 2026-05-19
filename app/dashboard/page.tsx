'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importamos a biblioteca
import "./dashboard.css"
import Navbar from "../components/navbar";


export default function Dashboard() {
    const router = useRouter();
    const [nome, setNome] = useState("");


    useEffect(() => {
        const username = Cookies.get("username");
       
        if (username) {
            setNome(username);
        } else {
            // Caso o cookie suma por algum motivo, volta para o login
            router.push("/");
        }
    }, [router])

    return (
    <div className="Nav">
        <Navbar/>
    <div className="containerDash">
        <div>
            <h1 className="title">Seja bem-vindo, {nome || "Visitante"}!</h1>
            <p className="content">Esta é uma área protegida</p>
        </div>
    </div>
    </div>
    );
}
