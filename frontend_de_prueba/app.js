document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded');
    fetch('http://localhost:8000/api/products/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const productsDiv = document.getElementById('products');
            if (data.length === 0) {
                productsDiv.innerHTML = '<p>No products found</p>';
            } else {
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');
                    productElement.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Precio: $${product.price}</p>
                    `;
                    productsDiv.appendChild(productElement);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productsDiv = document.getElementById('products');
            productsDiv.innerHTML = '<p>Error fetching products</p>';
        });
});
