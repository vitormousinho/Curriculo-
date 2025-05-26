document.addEventListener('DOMContentLoaded', function() {
    const username = 'vitormousinho';
    
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    
    const projetosContainer = document.getElementById('projetos-container');
    
    async function fetchProjetos() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Não foi possível buscar os projetos');
            }
            
            const projetos = await response.json();
            
            projetosContainer.innerHTML = '';
            
            if (projetos.length === 0) {
                projetosContainer.innerHTML = '<p>Nenhum projeto encontrado.</p>';
                return;
            }
            
            projetos.forEach(projeto => {
                const projetoCard = document.createElement('div');
                projetoCard.className = 'projeto-card';
                
                const projetoNome = document.createElement('h3');
                projetoNome.textContent = projeto.name;
                
                const projetoDescricao = document.createElement('p');
                projetoDescricao.textContent = projeto.description || 'Sem descrição disponível';
                
                const projetoLink = document.createElement('a');
                projetoLink.href = projeto.html_url;
                projetoLink.target = '_blank';
                projetoLink.textContent = 'Ver no GitHub';
                
                projetoCard.appendChild(projetoNome);
                projetoCard.appendChild(projetoDescricao);
                projetoCard.appendChild(projetoLink);
                
                projetosContainer.appendChild(projetoCard);
            });
            
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
            projetosContainer.innerHTML = `<p>Erro ao carregar projetos: ${error.message}</p>`;
        }
    }
    
    fetchProjetos();
});