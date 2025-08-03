

export const registerUser = async ( data ) => {

    console.log( data );

  const response = await fetch(`${ process.env.API_URL }/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( data )
  });

  console.log( response.ok);

  if ( !response.ok ) {

      const error = await response.json();
      
      console.log(error);
        
      throw new Error(error.message || "Error al registrar usuario");
  }

  return response.json();
}
