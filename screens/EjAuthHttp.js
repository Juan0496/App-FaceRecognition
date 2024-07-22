/* EJEMPLO AUTH HTTP
    const handleActivar = async() =>{
        setEst(!est);
        est ? setBut("Encendido") : setBut("Apagado")
        try{          
              
                     
          const response = await fetch('http://10.0.3.2:8000/proces', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({uid:uid,estado:est   })
          })   
          const json = await response.json();   
         
          }
        catch(error){
          Alert.alert(error.message)
        }
      }
   */