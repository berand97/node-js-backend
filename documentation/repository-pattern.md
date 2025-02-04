# Documentación del Patrón Repositorio

## Descripción General
El patrón repositorio implementado en este proyecto proporciona una forma estandarizada de manejar operaciones de base de datos para diferentes entidades. El patrón está construido usando una clase base de repositorio que implementa operaciones CRUD comunes, la cual puede ser extendida para requerimientos específicos de cada entidad.

## Repositorio Base
La clase `BaseRepository` proporciona operaciones fundamentales de base de datos que pueden ser heredadas por repositorios de entidades específicas.

### Constructor
```javascript
constructor(model) {
    this.model = model;
}
```
- `model`: El modelo de Sequelize sobre el cual operará el repositorio

### Métodos Disponibles

#### Obtener Todos los Registros
```javascript
async getAll(options = {})
```
- **Propósito**: Recupera todos los registros de la entidad
- **Parámetros**: 
  - `options` (opcional): Opciones de consulta de Sequelize (includes, where, etc.)
- **Retorna**: Promise<Array> de instancias del modelo
- **Ejemplo**:
```javascript
const userRepository = new UserRepository();
const usuarios = await userRepository.getAll({
    where: { roleId: 1 },
    include: ['roles']
});
```

#### Buscar por ID
```javascript
async findById(id, options = {})
```
- **Propósito**: Recupera un único registro por su clave primaria
- **Parámetros**:
  - `id`: El valor de la clave primaria
  - `options` (opcional): Opciones adicionales de consulta de Sequelize
- **Retorna**: Promise<Model> o null si no se encuentra
- **Ejemplo**:
```javascript
const usuario = await userRepository.findById(1, {
    include: ['department']
});
```

#### Crear Registro
```javascript
async create(data)
```
- **Propósito**: Crea un nuevo registro en la base de datos
- **Parámetros**:
  - `data`: Objeto que contiene las propiedades del modelo
- **Retorna**: Promise<Model> de la instancia creada
- **Ejemplo**:
```javascript
const nuevoUsuario = await userRepository.create({
    name: "Juan",
    lastName: "Pérez",
    email: "juan@ejemplo.com",
    password: "contraseñaEncriptada",
    roleId: 2
});
```

#### Actualizar Registro
```javascript
async update(id, data)
```
- **Propósito**: Actualiza un registro existente
- **Parámetros**:
  - `id`: La clave primaria del registro a actualizar
  - `data`: Objeto que contiene las propiedades a actualizar
- **Retorna**: Promise<Model> de la instancia actualizada o null si no se encuentra
- **Ejemplo**:
```javascript
const usuarioActualizado = await userRepository.update(1, {
    email: "nuevoemail@ejemplo.com"
});
```

#### Eliminar Registro
```javascript
async delete(id)
```
- **Propósito**: Elimina un registro de la base de datos
- **Parámetros**:
  - `id`: La clave primaria del registro a eliminar
- **Retorna**: Promise<boolean> indicando éxito o null si no se encuentra
- **Ejemplo**:
```javascript
const resultado = await userRepository.delete(1);
```

## Creando Repositorios Específicos para Entidades

Para crear un repositorio para una entidad específica, extender la clase BaseRepository:

```javascript
import { BaseRepository } from "./base.repository.js";
import { User } from "../schemas/user.scheme.js";

export class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    // Agregar métodos personalizados específicos para la entidad Usuario
    async findByEmail(email) {
        return await this.model.findOne({
            where: { email }
        });
    }
}
```

## Usando Repositorios en Controladores

Ejemplo de uso de un repositorio en un controlador:

```javascript
export class UserController {
    static userRepository = new UserRepository();

    static async getAllUsers(request, response) {
        try {
            const usuarios = await this.userRepository.getAll({
                include: ['roles', 'department']
            });
            return response.status(200).json({
                message: "Lista de usuarios recuperada exitosamente",
                users: usuarios
            });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    static async createUser(request, response) {
        try {
            const datosUsuario = request.body;
            const nuevoUsuario = await this.userRepository.create(datosUsuario);
            return response.status(201).json({
                message: "Usuario creado exitosamente",
                user: nuevoUsuario
            });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}
```

## Mejores Prácticas

1. **Manejo de Errores**: Siempre implementar bloques try-catch en controladores cuando se usen métodos del repositorio.

2. **Seguridad de Tipos**: Considerar agregar validación en los métodos del repositorio antes de las operaciones de base de datos.

3. **Métodos Personalizados**: Al agregar métodos personalizados a los repositorios de entidades, mantener el mismo patrón de manejo de errores y respuestas que los métodos base.

4. **Soporte de Transacciones**: Para operaciones que requieren múltiples cambios en la base de datos, usar transacciones:

```javascript
async crearUsuarioConRol(datosUsuario, rolId) {
    const transaction = await this.model.sequelize.transaction();
    try {
        const usuario = await this.create(datosUsuario, { transaction });
        await UserRole.create({
            userId: usuario.id,
            roleId: rolId
        }, { transaction });
        
        await transaction.commit();
        return usuario;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
```

5. **Optimización de Consultas**: Usar includes y where clauses apropiados para minimizar llamadas a la base de datos:
```javascript
async getUsuarioConDetalles(userId) {
    return await this.findById(userId, {
        include: [
            { model: Role, attributes: ['role', 'description'] },
            { model: Department, attributes: ['name'] }
        ],
        attributes: { exclude: ['password'] }
    });
}
```

## Patrones Comunes

### Filtrado
```javascript
async buscarConFiltros(filtros) {
    const whereClause = {};
    if (filtros.rol) whereClause.roleId = filtros.rol;
    if (filtros.email) whereClause.email = filtros.email;
    
    return await this.getAll({
        where: whereClause
    });
}
```

### Paginación
```javascript
async obtenerPaginado(pagina = 1, limite = 10) {
    return await this.getAll({
        offset: (pagina - 1) * limite,
        limit: limite
    });
}
```

### Eliminación Suave
```javascript
async eliminacionSuave(id) {
    return await this.update(id, {
        deletedAt: new Date()
    });
}
```
