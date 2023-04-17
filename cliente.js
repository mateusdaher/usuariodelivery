const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        nome: form.elements.nome.value,
        email: form.elements.email.value,
        telefone: form.elements.telefone.value,
    };
    
    try {
        const response = await fetch("http://localhost:4090/registrar", {
            method: "post",
            body: JSON.stringify(data),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status == 201) {
            alert("Pedido confirmado com sucesso!");
            form.reset();
        } else {
            const {mensagem} = await response.json();
            alert(`Não conseguimos processar seu pedido: "${mensagem}"`);
        }
    } catch (error) {
        alert("Não foi possivel comunicar-se com o servidor!")
        console.error(error);
    }

})