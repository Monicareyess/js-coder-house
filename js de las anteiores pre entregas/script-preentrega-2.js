
  const productos = [
    { nombre: 'Diseño web', precio: 100000 },
    { nombre: 'Marketing digital', precio: 20000 },
    { nombre: 'Desarrollo de aplicaciones', precio: 30000 }
];

function buscarProducto(nombre) {
    const resultado = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    return resultado;
}

const productosSeleccionados = [];
let continuar = true;
while (continuar) {
    const nombreProducto = prompt('Escribe el producto de tu interés (recuerda que las opciones son: Diseño web, Marketing digital, Desarrollo de aplicaciones) Cuando termines, escribe "fin":');
    if (nombreProducto.toLowerCase() === 'fin') {
        continuar = false;
    } else {
        const productoEncontrado = buscarProducto(nombreProducto);
        if (productoEncontrado) {
            productosSeleccionados.push(productoEncontrado);
        } else {
            alert('Producto no encontrado. Inténtalo de nuevo :)');
        }
    }
}

let sumaPrecios = 0;
productosSeleccionados.forEach(producto => {
    sumaPrecios += producto.precio;
});

if (productosSeleccionados.length > 0) {
    let mensaje = 'Productos seleccionados:\n';
    productosSeleccionados.forEach(producto => {
        mensaje += `* ${producto.nombre}, Precio: $${producto.precio}\n`;
    });
    mensaje += `El total es: $${sumaPrecios}`;
    alert(mensaje);
} else {
    alert('Esos productos aún no existen :(');
}