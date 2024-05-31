document.addEventListener("DOMContentLoaded", function() {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            let productList = document.getElementById('product-list');
            products.forEach(product => {
                let productCard = `
                    <div class="col-md-4">
                        <div class="card product-card">
                            <img src="${product.Imagen}" class="card-img-top product-image" alt="${product.Nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${product.Nombre}</h5>
                                <p class="card-text"><strong>ID:</strong> ${product.ID}</p>
                                <p class="card-text"><strong>Precio:</strong> S/. ${product.Precio.toFixed(2)}</p>
                                <p class="card-text"><strong>Stock:</strong> ${product.Stock}</p>
                                <p class="card-text"><strong>Categoría:</strong> ${product.Categoría}</p>
                                <p class="card-text"><strong>Descripción:</strong> ${product.Descripción}</p>
                                <p class="card-text"><strong>Marca:</strong> ${product.Marca}</p>
                                <p class="card-text"><strong>Disponibilidad:</strong> ${product.Disponibilidad}</p>
                                <a href="checkout.html" class="btn btn-primary">Comprar</a>
                                <button class="btn btn-secondary wishlist-btn" data-toggle="modal" data-target="#wishlistModal">
                                    <i class="far fa-heart"></i> Agregar a lista de deseos
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productList.insertAdjacentHTML('beforeend', productCard);
            });

            // Agregar evento de clic para el botón de lista de deseos
            document.querySelectorAll('.wishlist-btn').forEach(button => {
                button.addEventListener('click', () => {
                    $('#wishlistModal').modal('show');
                });

                // Cambiar estilo al pasar el mouse sobre el botón de lista de deseos
                button.addEventListener('mouseover', function() {
                    button.classList.remove('btn-secondary');
                    button.classList.add('btn-wishlist-hover');
                });

                // Restaurar estilo al dejar de pasar el mouse sobre el botón de lista de deseos
                button.addEventListener('mouseout', function() {
                    button.classList.remove('btn-wishlist-hover');
                    button.classList.add('btn-secondary');
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    // Redireccionar al hacer clic en el botón de compra en checkout.html
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            window.location.href = 'confirmation.html';
        });
    }
});

