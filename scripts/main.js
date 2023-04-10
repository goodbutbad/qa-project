
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const searchInput = form.querySelector('#projectKeywords');
    const langSelect = form.querySelector('#langChoice');
    const sortBySelect = form.querySelector('#sortBy')

  
    const searchQuery = searchInput.value.trim();
    const langChoice = langSelect.value;
    const sortBy = sortBySelect.value;
  
  
    if (searchQuery === '') {
      alert('Гений, надо сперва написать, что ищешь'); 
      return;
    }
  
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}+language:${encodeURIComponent(langChoice)}&sort=${encodeURIComponent(sortBy)}`;
    fetch(url)
      .then(response => response.json()) 
      .then(data => {
        const resultsList = document.querySelector('#resultsList');
        resultsList.innerHTML = ''; 
  
        if (data.items.length === 0) {
          resultsList.textContent = 'Не пиши фигню'; 
        } else {
          data.items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = 
              `<h2>${item.full_name}</h2>
              <p>${item.description}</p>
              <a href="${item.html_url}" target="_blank">${item.html_url}</a>
            `;
            resultsList.appendChild(resultItem);
          });
        }
      })
      .catch(error => {
        console.error(error);
        alert('Попробуй перезагрузить'); 
      });
  }
  

  window.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#githubSearchForm');
    searchForm.addEventListener('submit', handleSearchFormSubmit);
  });






