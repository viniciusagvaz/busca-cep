const input = document.querySelector("input");
const btn = document.querySelector("button");
const h4 = document.querySelector("h4");

btn.addEventListener("click", () => {
   const cep = input.value.replace(/[^0-9]/g, '')
   h4.innerHTML = ''

   const getCep = (url) =>
      new Promise((resolve, reject) => {
         {
            const request = new XMLHttpRequest();

            request.addEventListener("readystatechange", () => {
               const isRequestOk = request.readyState === 4 && request.status === 200;
               const isRequestNotOk = request.readyState === 4;

               if (isRequestOk) {
                  const data = JSON.parse(request.responseText);

                  resolve(`                           
                  <p>Logradouro: ${data["logradouro"]}, ${data["bairro"]}</p>
                  <p>Complemento: ${data["complemento"]}</p>
                  <p>Cidade: ${data["localidade"]} - ${data["uf"]}</p>
                  <p>DDD: ${data["ddd"]}</p>
                   `
                  );
               }

               if (isRequestNotOk) {
                  reject(`<span  class="text-danger">Cep Inválido!</span>`);
               }
            });

            request.open("GET", url);
            request.send();
         }
      });

   getCep(`https://viacep.com.br/ws/${cep}/json/`)
      .then((sucess) => (h4.innerHTML = sucess))
      .catch((error) => (h4.innerHTML = error))
})




// const getCep = async (cep) => {
// 	const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

// 	return response.json();
// };

// const logCep = async (cep) => console.log(await getCep(cep));

// logCep("27511000");