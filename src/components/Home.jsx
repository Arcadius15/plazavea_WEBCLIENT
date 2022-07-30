import React, { useState, useEffect } from "react";
import ProductoService from "../services/service/Producto.service"
import ModalGeneric from "../utils/ModalGeneric"

const Home = () => {
  const[headers,setHeaders]=useState([])
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const get = async()=>{
      await ProductoService.getProductos().then(
        response => {
          console.log(response)
          setHeaders(Object.keys(response.data.content[0]))
          setProductos(response.data.content);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    get()
    
  }, []);
  return (
    <>
      <h3>Listado de Productos</h3>
      <div className="container">
        <table className="table w-auto">
          <thead>
            <tr>
            {headers.map((header,key) => (<th key={key}>{header}</th>))}
            </tr>
          </thead>
          <tbody>
            {productos.map((producto,key)=>(
              <tr key={key}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombre}</td>
                <td><img width={"150px"} height={"150px"} src={producto.imagenUrl} alt="..."></img></td>
                <td>{producto.precioRegular}</td>
                <td>{producto.precioOferta}</td>
                <td><input type={"checkbox"} checked={producto.oferta} readOnly={true}></input></td>
                <td>
                  <ModalGeneric titulo={"Promociones"} lista={producto.promociones}/>
                </td>
                <td>
                  <ModalGeneric titulo={"Especificaciones"} lista={producto.especificaciones}/>
                </td>
                <td>
                  <ModalGeneric titulo={"Descripcion"} lista={producto.descripciones}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
    </>
    
  );
};

export default Home;
