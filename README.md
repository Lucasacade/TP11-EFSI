# 🎶 Sonido Sur

Aplicación realizada en React Native con Expo para la inscripción a un festival de música ficticio llamado Sonido Sur.

## Cómo correr el proyecto

Primero instalar las dependencias:

```bash
npm install
```

Después iniciar el proyecto:

```bash
npx expo start
```

Para abrirlo en Android se puede presionar `a`.

También se puede abrir en Web presionando `w` o utilizar Expo Go escaneando el código QR.

## Validaciones

Para este proyecto elegimos **React Hook Form**.

Elegimos esta opción porque permite manejar los datos del formulario y sus validaciones de forma ordenada, sin tener que crear un estado de errores separado para cada campo.

Se utilizaron `useForm`, `Controller` y `rules`.

## Campos del formulario

El formulario tiene los siguientes campos:

* Nombre completo
* Email
* Edad
* Tipo de entrada
* Teléfono

## Validaciones

### Nombre completo

Es obligatorio y tiene que tener como mínimo 3 caracteres.

Mensaje:

`Ingresá tu nombre completo`

### Email

Es obligatorio y tiene que tener un formato válido con usuario, @ y dominio.

Mensaje:

`Ingresá un email válido`

### Edad

Tiene que ser un número entre 12 y 99.

Mensaje:

`La edad tiene que ser mayor a 12`

### Tipo de entrada

Es obligatorio elegir una de las dos opciones:

* General
* VIP

Mensaje:

`Elegí un tipo de entrada`

### Teléfono

Es opcional. Si se completa, solamente se permiten números.

Mensaje:

`Solo se permiten números`

## Componentes

### CampoFormulario

Es un componente reutilizable que se utiliza para los campos de texto.

### TicketConfirmacion

Es el componente que muestra el ticket después de completar correctamente la inscripción.

Recibe los datos mediante `props`.

### InscripcionScreen

Es el componente padre. Contiene el formulario y decide si mostrar el formulario o el ticket de confirmación.

## Bonus

Se realizaron los dos bonus.

### Loading

Al confirmar la inscripción aparece un loading de 1 segundo simulando el envío de los datos a un servidor.

### AsyncStorage

Se guarda el email de la última persona inscripta utilizando AsyncStorage.

Cuando se vuelve a abrir el formulario, el email anterior aparece precargado.

## Tecnologías utilizadas

* React Native
* Expo
* React Hook Form
* AsyncStorage
* JavaScript
"# TP11-EFSI" 
