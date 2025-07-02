let obternerNombreDelInput=document.getElementById("nombre")
let obternerApellidoDelInput=document.getElementById("apellido")
let obternerEmailDelInput=document.getElementById("email")
let inputSimulador=document.getElementById("monto")
let cuotasDelInput=document.getElementById("cuotas")
const DateTime= luxon.DateTime;
let fechaYhora=DateTime.now()
let datosPersonales=[]


    class Datos{
        constructor(nombre,apellido,email,monto,cuotas,valorDeCuotas,montoTotalFinal,fechaYhora){
            this.nombre=nombre,
            this.apellido=apellido,
            this.email=email,
            this.monto=monto,
            this.cuotas=cuotas,
            this.valorDeCuotas=valorDeCuotas,
            this.montoTotalFinal=montoTotalFinal,
            this.fechaYhora=fechaYhora
    }   
}

function simulador(){
    document.getElementById("botonSimular").addEventListener("click", ()=>{
        let monto=parseFloat(inputSimulador.value)
        let cuotas=parseInt(cuotasDelInput.value)
        if (isNaN(monto) || monto<=0 || isNaN(cuotas) || cuotas<=0){
            Swal.fire({
                title: "Favor de revisar",
                icon: "error"
                });
            return;
        }
        else{
            Toastify({
            text: "Prestamo Simulado",
            className: "info",
            duration:1800,
            style: {
            backgroundColor:"#337CA0"
            }
            }).showToast();
            // limpiar Cuadro de Prestamo
            document.getElementById("botonSimular").remove()
            obternerNombreDelInput.remove()
            obternerApellidoDelInput.remove()
            obternerEmailDelInput.remove()
            inputSimulador.remove()
            cuotasDelInput.remove()

            // boton eliminar
            let botonLimpiar = document.createElement("button");
            botonLimpiar.textContent = "Nuevo Prestamo";
            cuadroDePrestamo.appendChild(botonLimpiar)
            botonLimpiar.style=`
            background-color:#FF1D15;
            padding: 12px;
            font-weight:500;
            border-radius: 10px;
            `
            botonLimpiar.onclick =()=>{location.reload()
            };

            // calculo del prestamo
            let interesAnual= 0.33
            let interesMensual=interesAnual/12;
            let montoTotalConInteres=monto*(1+interesMensual*cuotas);
            let cuotasMensuales=montoTotalConInteres/cuotas

            // cuadro con datos del prestamo 
            document.getElementById("articleSimulador").innerHTML +=`
            <h2 class="text-center">Datos del Prestamo</h2>
            <div id="divDatosPrestamo">
                <p>
                Cliente: ${obternerNombreDelInput.value+ " " + obternerApellidoDelInput.value }
                </p>
                <p>
                Email: ${obternerEmailDelInput.value}
                </p>
                <p>
                Monto Inicial: $${monto}
                </p>
                <p>
                Total de Cuotas: ${cuotas}
                </p>
                <p>
                Cuotas Mensuales: $${parseFloat(cuotasMensuales).toFixed(2)}
                </p>
                <p>
                Monto final con interes: $${montoTotalConInteres.toFixed(2)}
                </p>
                <p>
                ${fechaYhora.toLocaleString(DateTime.DATETIME_MED)}
                </p>
                <button id="botonSolicitarPrestamo">
                Solicitar Prestamo
                </button>
            </div>
            `
            document.getElementById("botonSolicitarPrestamo").addEventListener("click",()=>{
                Swal.fire({
                title: "Solicitar Prestamo",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText:"Cancelar"
                
                }).then((respuesta) => {
                if (respuesta.isConfirmed) {
                    Swal.fire({
                        icon:"success",
                        title: "Prestamo Solicitado con Exito",
                        text:"A la brevedad nuestro equipo estara en contacto"
                });
                    // Array de datos y guardado en LocalStorage
                    let datos= new Datos (obternerNombreDelInput.value,obternerApellidoDelInput.value,obternerEmailDelInput.value,monto,cuotas,cuotasMensuales.toFixed(2),montoTotalConInteres,fechaYhora.toLocaleString(DateTime.DATETIME_MED))
                    datosPersonales.push(datos)
                    localStorage.setItem("Datos",JSON.stringify(datosPersonales))
                } 
                else if (respuesta.isDenied) {
                    Swal.fire("Prestamo Cancelado", "", "error",)
                }
                });
            })
            }
        }
    )
}
simulador()