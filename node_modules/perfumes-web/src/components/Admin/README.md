# AdminPanel.jsx

## Descripción General

El componente `AdminPanel` es un panel de administración para gestionar perfumes en la tienda. Permite crear, editar, eliminar y listar perfumes, utilizando la misma paleta y estilo visual que el resto de la web.

## Funcionalidades
- **Crear Perfume:** Completa el formulario y presiona "Crear" para agregar un nuevo perfume.
- **Editar Perfume:** Haz clic en "Editar" en la tabla, modifica los datos y presiona "Actualizar".
- **Eliminar Perfume:** Haz clic en "Eliminar" y confirma la acción.
- **Lista de Perfumes:** Muestra todos los perfumes en una tabla editable.

## Estado Interno
- `perfumes`: Lista de perfumes obtenida de la API.
- `form`: Estado del formulario (nombre, marca, categoría, descripción, precio, stock, imagen).
- `editingId`: ID del perfume que se está editando (si aplica).
- `loading`, `error`, `success`: Estados para feedback visual.

## Estilos
- Usa la paleta de colores global (`App.css`) y estilos propios en `AdminPanel.css`.
- Diseño responsivo y amigable.

## Ejemplo de Uso
```jsx
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  return <AdminPanel />;
}
```

## Extensión
Puedes ampliar este panel para gestionar otras entidades (usuarios, categorías, etc.) siguiendo la misma estructura. 