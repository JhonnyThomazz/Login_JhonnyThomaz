import Navbar from "@/app/components/navbar"
import "./produto.css"

export default function Produtos(){
    return(
        <div className="nav">
            <Navbar/>
            <div className="containerProd">
                <h1 className="title">Esta é a página de produtos</h1>
                <p className="content">Esta é uma área protegida</p>
            </div>
        </div>
    );
        
}