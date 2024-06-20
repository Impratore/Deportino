$(document).ready(function(){
    $('#productForm').validate({
        rules: {
            productName: {
                required: true,
                minlength: 3
            },
            productSlug: {
                required: true,
                minlength: 3
            },
            productDescription: {
                required: true,
                minlength: 5
            },
            productPrice: {
                required: true,
                number: true,
                min: 1
            },
            productCategory: {
                required: true,
                number: true
            }
        },
        messages: {
            productName: {
                required: 'Por favor, ingresa un nombre',
                minlength: 'El nombre debe tener al menos 3 caracteres'
            },
            productSlug: {
                required: 'Por favor, ingresa un slug',
                minlength: 'El slug debe tener al menos 3 caracteres'
            },
            productDescription: {
                required: 'Por favor, ingresa una descripción',
                minlength: 'La descripción debe tener al menos 5 caracteres'
            },
            productPrice: {
                required: 'Por favor, ingresa un precio',
                number: 'El precio debe ser un número',
                min: 'El precio debe ser mayor o igual a 1'
            },
            productCategory: {
                required: 'Por favor, ingresa una categoría',
                number: 'La categoría debe ser un número'
            }
        },
        submitHandler: function(form) {
            addProduct();
            form.reset();
            return false; // Previene la recarga de la página
        }
    });
    loadProducts();
});

function addProduct(){
    var productName = $('#productName').val();
    var productSlug = $('#productSlug').val();
    var productDescription = $('#productDescription').val();
    var productPrice = $('#productPrice').val();
    var productAvailable = $('#productAvailable').val();
    var productCategory = $('#productCategory').val();
    
    var product = {
        name: productName,
        slug: productSlug,
        description: productDescription,
        price: productPrice,
        available: productAvailable === 'true',
        category: productCategory
    };

    // Guardar en localStorage primero
    saveProductToStorage(product);

    // Intentar enviar al backend de Django
    fetch('http://127.0.0.1:8000/api/products/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            appendProductToTable(productName, productPrice);
        } else {
            console.error('Error:', data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function editProduct(button){
    var row = $(button).closest('tr');
    var cols = row.children('td');
    if(button.textContent === 'Editar'){
        $(cols[0]).html(`<input type="text" value="${$(cols[0]).text()}">`);
        $(cols[1]).html(`<input type="number" value="${$(cols[1]).text()}">`);
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else { // Guardar
        var newName = $(cols[0]).find('input').val();
        var newPrice = $(cols[1]).find('input').val();
        $(cols[0]).text(newName);
        $(cols[1]).text(newPrice);
        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
        updateProductInStorage(row.index(), newName, newPrice);
    }
}

function updateProductInStorage(index, newName, newPrecio){
    var products = JSON.parse(localStorage.getItem('products'));
    products[index].name = newName;
    products[index].price = newPrecio;
    localStorage.setItem('products', JSON.stringify(products));
}

function deleteProduct(button){
    var row = $(button).closest('tr');
    var cols = row.children('td');
    if(button.textContent === 'Cancelar'){
        $(cols[0]).text($(cols[0]).find('input').val());
        $(cols[1]).text($(cols[1]).find('input').val());
        $(button).prev().text('Editar').removeClass('btn-info').addClass('btn-info');
        $(button).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        removeFromStorage(row.index());
        row.remove();
    }
}

function removeFromStorage(index) {
    var products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts(){
    if(localStorage.getItem('products')){
        var products = JSON.parse(localStorage.getItem('products'));
        products.forEach(function(product){
            appendProductToTable(product.name, product.price);
        });
    }
}

function appendProductToTable(name, price){
    $('#productsTable tbody').append(`
        <tr>
            <td>${name}</td>
            <td>${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)}</td>
            <td>
                <button class="btn btn-info btn-sm edit-product" onclick="editProduct(this)">Editar</button>
                <button class="btn btn-danger btn-sm delete-product" onclick="deleteProduct(this)">Eliminar</button>
            </td>
    `);
}

function saveProductToStorage(product) {
    var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    //If Lineal > If condicion ? then algo : then otra cosa;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}
