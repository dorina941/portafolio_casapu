const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

const navbar = document.querySelector('.navbar');
const updateNavbar = () => {
    if (!navbar) {
        return;
    }

    if (window.scrollY > 10) {
        navbar.classList.add('is-scrolled');
    } else {
        navbar.classList.remove('is-scrolled');
    }
};

updateNavbar();
window.addEventListener('scroll', updateNavbar);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 10 : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}

const lessons = [
    {
        id: 1,
        title: 'Clases y Objetos',
        summary: 'Clase = molde, objeto = instancia.',
        theory: [
            'Clase = molde.',
            'Objeto = instancia.',
            'Una clase define estructura y comportamiento.'
        ],
        breakdown: [
            'Persona define cómo es una persona.',
            'p es una persona real en memoria.',
            'p.saludar() ejecuta el método.'
        ],
        code: `// CLASE
class Persona {
    String nombre;
    int edad;

    void saludar() {
        System.out.println("Hola, me llamo " + nombre);
    }
}

// USO
public class Main {
    public static void main(String[] args) {
        Persona p = new Persona();
        p.nombre = "Juan";
        p.edad = 30;

        p.saludar();
    }
}`,
        interview: 'Una clase define estructura y comportamiento, un objeto es una instancia de esa clase.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué es un objeto?',
            options: ['Un archivo', 'Una instancia de una clase', 'Un método'],
            answerIndex: 1,
            explanation: 'Un objeto es la instancia real que vive en memoria.'
        }
    },
    {
        id: 2,
        title: 'Encapsulación',
        summary: 'Protege datos y controla el acceso.',
        theory: [
            'Oculta estado con private.',
            'Acceso mediante getters y setters.',
            'Evita estados inválidos.'
        ],
        breakdown: [
            'private protege la variable.',
            'Solo se accede con métodos controlados.',
            'La validación evita valores incorrectos.'
        ],
        code: `// Mal (datos expuestos)
class Persona {
    public int edad;
}

// Bien (encapsulado)
class Persona {
    private int edad;

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        if (edad > 0) {
            this.edad = edad;
        }
    }
}`,
        interview: 'Encapsulación controla el acceso a los datos y evita estados inválidos.',
        challenge: {
            type: 'Detectar error',
            question: '¿Qué principio se está rompiendo aquí?',
            code: `class Persona {
    public int edad;
}`,
            options: ['Encapsulación', 'Herencia', 'Polimorfismo'],
            answerIndex: 0,
            explanation: 'Exponer la variable rompe la encapsulación.'
        }
    },
    {
        id: 3,
        title: 'Herencia',
        summary: 'Reutiliza comportamiento común.',
        theory: [
            'Una subclase hereda atributos y métodos.',
            'Reduce duplicación.',
            'Permite especializar comportamiento.'
        ],
        breakdown: [
            'Perro hereda comer() de Animal.',
            'Perro agrega ladrar().',
            'No repites código común.'
        ],
        code: `class Animal {
    void comer() {
        System.out.println("El animal come");
    }
}

class Perro extends Animal {
    void ladrar() {
        System.out.println("Guau");
    }
}

Perro p = new Perro();
p.comer();
p.ladrar();`,
        interview: 'La herencia permite reutilizar comportamiento común.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué método puede usar Perro sin definirlo?',
            options: ['comer()', 'ladrar()', 'sonido()'],
            answerIndex: 0,
            explanation: 'Perro hereda comer() desde Animal.'
        }
    },
    {
        id: 4,
        title: 'Polimorfismo',
        summary: 'El método ejecutado depende del objeto real.',
        theory: [
            'La referencia puede ser del tipo padre.',
            'El objeto real decide el método.',
            'Se resuelve en tiempo de ejecución.'
        ],
        breakdown: [
            'El tipo es Animal.',
            'El comportamiento es de Perro.',
            'Java decide en tiempo de ejecución.'
        ],
        code: `class Animal {
    void sonido() {
        System.out.println("Sonido genérico");
    }
}

class Perro extends Animal {
    void sonido() {
        System.out.println("Guau");
    }
}

Animal a = new Perro();
a.sonido();`,
        interview: 'El método que se ejecuta depende del objeto real, no de la referencia.',
        challenge: {
            type: 'Predice la salida',
            question: '¿Qué imprime este código?',
            code: `Animal a = new Perro();
a.sonido();`,
            options: ['Sonido genérico', 'Guau', 'Error en compilación'],
            answerIndex: 1,
            explanation: 'Se ejecuta el método sobrescrito en Perro.'
        }
    },
    {
        id: 5,
        title: 'Abstracción',
        summary: 'Las interfaces definen contratos.',
        theory: [
            'Define qué hacer sin implementar.',
            'La clase concreta decide cómo hacerlo.',
            'Promueve desacoplamiento.'
        ],
        breakdown: [
            'Vehiculo define arrancar().',
            'Coche implementa la interfaz.',
            'Se programa contra el contrato.'
        ],
        code: `interface Vehiculo {
    void arrancar();
}

class Coche implements Vehiculo {
    public void arrancar() {
        System.out.println("Coche arrancando");
    }
}`,
        interview: 'Las interfaces definen contratos.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué garantiza una interfaz?',
            options: ['Un contrato de métodos', 'Memoria extra', 'Mayor velocidad'],
            answerIndex: 0,
            explanation: 'La interfaz obliga a implementar los métodos definidos.'
        }
    },
    {
        id: 6,
        title: 'Colecciones',
        summary: 'List, Set y Map para datos y búsquedas eficientes.',
        theory: [
            'List mantiene orden y permite duplicados.',
            'Set elimina repetidos automáticamente.',
            'Map guarda clave y valor.'
        ],
        breakdown: [
            'List sirve para listas ordenadas.',
            'Set evita valores duplicados.',
            'Map permite búsquedas rápidas por clave.'
        ],
        code: `List<String> nombres = new ArrayList<>();
nombres.add("Ana");
nombres.add("Juan");
nombres.add("Ana");

Set<String> sinRepetidos = new HashSet<>();
sinRepetidos.add("Ana");
sinRepetidos.add("Juan");
sinRepetidos.add("Ana");

Map<Integer, String> usuarios = new HashMap<>();
usuarios.put(1, "Juan");
usuarios.put(2, "Ana");`,
        interview: 'Map se usa para búsquedas eficientes por clave.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué colección elimina duplicados automáticamente?',
            options: ['List', 'Set', 'Map'],
            answerIndex: 1,
            explanation: 'Set no permite elementos repetidos.'
        }
    },
    {
        id: 7,
        title: 'Excepciones',
        summary: 'Maneja errores con try, catch y finally.',
        theory: [
            'try ejecuta código que puede fallar.',
            'catch captura la excepción.',
            'finally se ejecuta siempre.'
        ],
        breakdown: [
            'Se evita caída por división por cero.',
            'Se muestra un mensaje de error.',
            'finally corre pase lo que pase.'
        ],
        code: `try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: división por cero");
} finally {
    System.out.println("Siempre se ejecuta");
}`,
        interview: 'catch maneja el error y finally se ejecuta siempre.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué bloque se ejecuta siempre?',
            options: ['catch', 'finally', 'throw'],
            answerIndex: 1,
            explanation: 'finally siempre se ejecuta, haya error o no.'
        }
    },
    {
        id: 8,
        title: 'Stack vs Heap',
        summary: 'Variables locales vs objetos en memoria.',
        theory: [
            'Stack es por hilo y rápido.',
            'Heap almacena objetos.',
            'Las referencias viven en stack.'
        ],
        breakdown: [
            'x vive en el stack.',
            'Persona vive en el heap.',
            'La referencia apunta al objeto.'
        ],
        code: `void metodo() {
    int x = 10;          // STACK
    Persona p = new Persona(); // HEAP
}`,
        interview: 'El Stack es por hilo, el Heap es compartido.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Dónde vive un objeto creado con new?',
            options: ['Stack', 'Heap', 'Registro CPU'],
            answerIndex: 1,
            explanation: 'Los objetos se almacenan en el heap.'
        }
    },
    {
        id: 9,
        title: 'Concurrencia',
        summary: 'Ejecuta tareas en paralelo con hilos.',
        theory: [
            'Runnable separa la lógica del hilo.',
            'Thread ejecuta la tarea.',
            'start() inicia la ejecución.'
        ],
        breakdown: [
            'La clase implementa Runnable.',
            'Thread recibe la tarea.',
            'start() crea un nuevo hilo.'
        ],
        code: `class MiHilo implements Runnable {
    public void run() {
        System.out.println("Ejecutando hilo");
    }
}

Thread t = new Thread(new MiHilo());
t.start();`,
        interview: 'Runnable permite desacoplar la tarea del hilo que la ejecuta.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué método inicia el hilo?',
            options: ['run()', 'start()', 'execute()'],
            answerIndex: 1,
            explanation: 'start() crea y lanza el nuevo hilo.'
        }
    },
    {
        id: 10,
        title: '10️⃣ static (miembro de clase)',
        summary: 'static pertenece a la clase, no al objeto.',
        theory: [
            'Un miembro static es compartido.',
            'Existe una sola copia por clase.',
            'Se accede sin instanciar.'
        ],
        breakdown: [
            'static pertenece a la clase, no al objeto.',
            'Se comparte entre todas las instancias.',
            'Es útil para contadores o utilidades.'
        ],
        code: `class Contador {
    static int total = 0;
}`,
        interview: 'static se usa cuando el estado o comportamiento es común a toda la clase.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué describe correctamente a static?',
            options: ['Pertenece a cada objeto', 'Pertenece a la clase y se comparte', 'Solo funciona en main'],
            answerIndex: 1,
            explanation: 'static crea un único valor compartido por todas las instancias.'
        }
    },
    {
        id: 11,
        title: '11️⃣ Tipos primitivos vs objetos',
        summary: 'Primitivos son valores directos, objetos son referencias.',
        theory: [
            'int es primitivo (stack).',
            'Integer es objeto (heap).',
            'Wrappers permiten usar colecciones.'
        ],
        breakdown: [
            'int es primitivo y vive en stack.',
            'Integer es objeto y vive en heap.',
            'Los wrappers permiten métodos y null.'
        ],
        code: `int x = 5;
Integer y = 5;`,
        interview: 'Los primitivos son más rápidos; los wrappers permiten trabajar con colecciones.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Cuál es un wrapper?',
            options: ['int', 'Integer', 'double'],
            answerIndex: 1,
            explanation: 'Integer es la clase envoltorio del primitivo int.'
        }
    },
    {
        id: 12,
        title: '12️⃣ Constructores',
        summary: 'Inicializan el objeto al crearse.',
        theory: [
            'Se ejecutan al crear el objeto.',
            'Inicializan el estado.',
            'Pueden recibir parámetros.'
        ],
        breakdown: [
            'El constructor corre al instanciar.',
            'Asigna valores iniciales.',
            'Evita objetos incompletos.'
        ],
        code: `class Persona {
    String nombre;

    Persona(String nombre) {
        this.nombre = nombre;
    }
}`,
        interview: 'Un constructor asegura que el objeto nazca válido.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Cuándo se ejecuta un constructor?',
            options: ['Al crear el objeto', 'Al terminar el programa', 'Cuando se llama un getter'],
            answerIndex: 0,
            explanation: 'El constructor se ejecuta justo al instanciar la clase.'
        }
    },
    {
        id: 13,
        title: '13️⃣ this',
        summary: 'Referencia a la instancia actual.',
        theory: [
            'Distingue atributos de parámetros.',
            'Apunta al objeto actual.',
            'Se usa mucho en constructores.'
        ],
        breakdown: [
            'this evita confusión de nombres.',
            'Hace referencia al objeto actual.',
            'Permite encadenar métodos.'
        ],
        code: `this.nombre = nombre;`,
        interview: 'this referencia la instancia actual.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué representa this?',
            options: ['La clase padre', 'La instancia actual', 'El paquete'],
            answerIndex: 1,
            explanation: 'this siempre apunta al objeto actual.'
        }
    },
    {
        id: 14,
        title: '14️⃣ super',
        summary: 'Accede a miembros de la clase padre.',
        theory: [
            'Llama métodos del padre.',
            'Accede a constructores base.',
            'Evita duplicar lógica.'
        ],
        breakdown: [
            'super llama a la clase padre.',
            'Permite reutilizar comportamiento.',
            'Se usa en herencia.'
        ],
        code: `super.comer();`,
        interview: 'super permite reutilizar comportamiento del padre.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Para qué se usa super?',
            options: ['Acceder a miembros del padre', 'Crear un objeto nuevo', 'Declarar una interfaz'],
            answerIndex: 0,
            explanation: 'super invoca métodos o constructores de la clase padre.'
        }
    },
    {
        id: 15,
        title: '15️⃣ Arrays',
        summary: 'Estructura de tamaño fijo y acceso rápido.',
        theory: [
            'Tamaño fijo.',
            'Acceso rápido por índice.',
            'Es una estructura básica.'
        ],
        breakdown: [
            'Un array tiene longitud fija.',
            'Accedes por índice en O(1).',
            'Es eficiente pero poco flexible.'
        ],
        code: `int[] numeros = {1, 2, 3};`,
        interview: 'Un array es eficiente pero poco flexible.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué característica define a un array?',
            options: ['Tamaño fijo', 'Orden aleatorio', 'Claves y valores'],
            answerIndex: 0,
            explanation: 'Los arrays tienen tamaño fijo.'
        }
    },
    {
        id: 16,
        title: '16️⃣ Bucle for-each',
        summary: 'Itera colecciones de forma simple.',
        theory: [
            'Itera sin índices explícitos.',
            'Más legible.',
            'Reduce errores de límites.'
        ],
        breakdown: [
            'Recorre cada elemento.',
            'No necesitas índices.',
            'Mejora legibilidad.'
        ],
        code: `for (String n : nombres) {
    System.out.println(n);
}`,
        interview: 'El for-each reduce errores y mejora legibilidad.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué ventaja tiene for-each?',
            options: ['Evita índices manuales', 'Permite modificar tamaño', 'Es más lento siempre'],
            answerIndex: 0,
            explanation: 'for-each recorre colecciones sin índices explícitos.'
        }
    },
    {
        id: 17,
        title: '17️⃣ .equals() vs ==',
        summary: 'equals compara contenido, == referencia.',
        theory: [
            '== compara referencias.',
            'equals compara contenido.',
            'equals puede sobrescribirse.'
        ],
        breakdown: [
            '== compara direcciones.',
            'equals compara valor.',
            'En objetos usa equals().'
        ],
        code: `a.equals(b); // contenido
a == b;      // referencia`,
        interview: 'En objetos, siempre usar equals().',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué compara == en objetos?',
            options: ['Contenido', 'Referencia', 'Hash'],
            answerIndex: 1,
            explanation: '== compara si las referencias apuntan al mismo objeto.'
        }
    },
    {
        id: 18,
        title: '18️⃣ toString()',
        summary: 'Convierte objetos a texto.',
        theory: [
            'Se usa al imprimir un objeto.',
            'Puede sobrescribirse.',
            'Útil para debug.'
        ],
        breakdown: [
            'System.out.println(obj) llama toString.',
            'Devuelve una representación legible.',
            'Facilita el logging.'
        ],
        code: `System.out.println(obj);`,
        interview: 'toString() facilita el logging y depuración.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Para qué sirve toString()?',
            options: ['Convertir objeto a texto', 'Comparar objetos', 'Crear un objeto'],
            answerIndex: 0,
            explanation: 'toString devuelve una representación textual del objeto.'
        }
    },
    {
        id: 19,
        title: '19️⃣ throw',
        summary: 'Lanza excepciones personalizadas.',
        theory: [
            'Lanza un error controlado.',
            'Detiene el flujo normal.',
            'Comunica estados inválidos.'
        ],
        breakdown: [
            'throw crea una excepción.',
            'Se usa para validar.',
            'Evita estados incorrectos.'
        ],
        code: `throw new IllegalArgumentException("Edad inválida");`,
        interview: 'Las excepciones comunican errores de forma clara.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué hace throw?',
            options: ['Lanza una excepción', 'Captura una excepción', 'Ignora un error'],
            answerIndex: 0,
            explanation: 'throw lanza una excepción manualmente.'
        }
    },
    {
        id: 20,
        title: '20️⃣ throws',
        summary: 'Declara excepciones que se propagan.',
        theory: [
            'Propaga la excepción.',
            'Otro método decide manejarla.',
            'Obliga a try/catch o throws.'
        ],
        breakdown: [
            'throws declara posibles errores.',
            'La llamada decide cómo manejar.',
            'Mantiene la firma clara.'
        ],
        code: `void leer() throws IOException {}`,
        interview: 'throws delega el manejo del error.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué indica throws?',
            options: ['Que el método lanza una excepción', 'Que siempre captura excepciones', 'Que no puede fallar'],
            answerIndex: 0,
            explanation: 'throws declara que el método puede lanzar excepciones.'
        }
    },
    {
        id: 21,
        title: '21️⃣ Scanner',
        summary: 'Lee datos desde consola.',
        theory: [
            'Permite leer input del usuario.',
            'Se usa con System.in.',
            'Convierte a tipos básicos.'
        ],
        breakdown: [
            'Scanner lee desde consola.',
            'Puedes leer int, String, etc.',
            'Es ideal para ejercicios.'
        ],
        code: `Scanner sc = new Scanner(System.in);
int edad = sc.nextInt();`,
        interview: 'Scanner permite interacción con el usuario.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Para qué se usa Scanner?',
            options: ['Leer datos de entrada', 'Conectar a base de datos', 'Crear archivos'],
            answerIndex: 0,
            explanation: 'Scanner lee datos desde System.in.'
        }
    },
    {
        id: 22,
        title: '22️⃣ File',
        summary: 'Representa rutas de archivos o carpetas.',
        theory: [
            'Modela archivos o directorios.',
            'No lee contenido.',
            'Permite consultar existencia.'
        ],
        breakdown: [
            'File representa archivos o carpetas.',
            'No lee archivos, solo los representa.',
            'Se usa con streams.'
        ],
        code: `File f = new File("datos.txt");`,
        interview: 'File no lee archivos, los representa.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué hace File?',
            options: ['Representa una ruta', 'Lee el archivo', 'Escribe automáticamente'],
            answerIndex: 0,
            explanation: 'File solo representa rutas y metadatos.'
        }
    },
    {
        id: 23,
        title: '23️⃣ BufferedReader',
        summary: 'Lectura eficiente de texto.',
        theory: [
            'Lee con buffer.',
            'Ideal para archivos grandes.',
            'Trabaja con FileReader.'
        ],
        breakdown: [
            'BufferedReader mejora rendimiento.',
            'Reduce accesos al disco.',
            'Lee líneas completas.'
        ],
        code: `BufferedReader br = new BufferedReader(new FileReader("a.txt"));`,
        interview: 'El buffer mejora el rendimiento de lectura.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Por qué usar BufferedReader?',
            options: ['Para leer más rápido', 'Para escribir datos', 'Para borrar archivos'],
            answerIndex: 0,
            explanation: 'El buffer reduce accesos y mejora el rendimiento.'
        }
    },
    {
        id: 24,
        title: '24️⃣ FileWriter',
        summary: 'Escritura básica en archivos.',
        theory: [
            'Escribe texto en archivos.',
            'Puede sobrescribir o anexar.',
            'Requiere cerrar el stream.'
        ],
        breakdown: [
            'FileWriter escribe en archivos.',
            'Sirve para persistir datos.',
            'Se combina con BufferedWriter.'
        ],
        code: `FileWriter fw = new FileWriter("salida.txt");`,
        interview: 'FileWriter permite persistencia básica.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Para qué sirve FileWriter?',
            options: ['Escribir en archivos', 'Leer archivos', 'Crear carpetas'],
            answerIndex: 0,
            explanation: 'FileWriter abre un stream de escritura.'
        }
    },
    {
        id: 25,
        title: '25️⃣ Math.random()',
        summary: 'Genera números entre 0 y 1.',
        theory: [
            'Devuelve double entre 0 y 1.',
            'Es pseudoaleatorio.',
            'Útil en juegos y simulaciones.'
        ],
        breakdown: [
            'Math.random() devuelve 0 a 1.',
            'Se escala para otros rangos.',
            'Útil para probabilidades.'
        ],
        code: `double r = Math.random();`,
        interview: 'Se usa en juegos y simulaciones.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué rango devuelve Math.random()?',
            options: ['0 a 1', '1 a 100', '0 a 10'],
            answerIndex: 0,
            explanation: 'Math.random() devuelve un double entre 0.0 y 1.0.'
        }
    },
    {
        id: 26,
        title: '26️⃣ LocalDate',
        summary: 'API moderna para fechas.',
        theory: [
            'Pertenece a java.time.',
            'Es inmutable.',
            'Reemplaza Date para fechas.'
        ],
        breakdown: [
            'LocalDate maneja fechas modernas.',
            'No incluye hora.',
            'Es segura e inmutable.'
        ],
        code: `LocalDate hoy = LocalDate.now();`,
        interview: 'java.time es inmutable y segura.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué ventaja tiene LocalDate?',
            options: ['Es inmutable y moderna', 'Modifica Date directamente', 'Usa timezone automático siempre'],
            answerIndex: 0,
            explanation: 'LocalDate es parte de java.time y es inmutable.'
        }
    },
    {
        id: 27,
        title: '27️⃣ final',
        summary: 'Define constantes e inmutabilidad.',
        theory: [
            'No se puede reasignar.',
            'Clarifica intención.',
            'Evita errores.'
        ],
        breakdown: [
            'final evita modificaciones.',
            'Se usa para constantes.',
            'Hace el código más seguro.'
        ],
        code: `final int EDAD_MAX = 120;`,
        interview: 'final previene errores y da intención.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué significa final en una variable?',
            options: ['No se puede modificar', 'Se puede heredar', 'Se elimina al final'],
            answerIndex: 0,
            explanation: 'final impide reasignar el valor.'
        }
    },
    {
        id: 28,
        title: '28️⃣ package',
        summary: 'Organiza el código en módulos.',
        theory: [
            'Define un namespace.',
            'Evita conflictos de nombres.',
            'Ordena proyectos grandes.'
        ],
        breakdown: [
            'package agrupa clases.',
            'Evita colisiones de nombres.',
            'Ayuda a estructurar.'
        ],
        code: `package com.app.modelo;`,
        interview: 'Los paquetes estructuran proyectos grandes.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Para qué se usa package?',
            options: ['Organizar código', 'Crear objetos', 'Definir variables'],
            answerIndex: 0,
            explanation: 'package define el espacio de nombres.'
        }
    },
    {
        id: 29,
        title: '29️⃣ main',
        summary: 'Punto de entrada del programa.',
        theory: [
            'La JVM busca main.',
            'Recibe args.',
            'Inicia la ejecución.'
        ],
        breakdown: [
            'main es el punto de entrada.',
            'Sin main no hay ejecución.',
            'args permite parámetros.'
        ],
        code: `public static void main(String[] args) {}`,
        interview: 'Sin main, no hay ejecución.',
        challenge: {
            type: 'Pregunta conceptual',
            question: '¿Qué es main en Java?',
            options: ['Punto de entrada', 'Constructor', 'Clase abstracta'],
            answerIndex: 0,
            explanation: 'main es el método que inicia la ejecución.'
        }
    }
];

const lessonCount = document.getElementById('lesson-count');
const progressBar = document.getElementById('progress-bar');
const scoreOutput = document.getElementById('score');
const lessonBadge = document.getElementById('lesson-badge');
const lessonTitle = document.getElementById('lesson-title');
const lessonSummary = document.getElementById('lesson-summary');
const lessonTheory = document.getElementById('lesson-theory');
const lessonBreakdown = document.getElementById('lesson-breakdown');
const lessonInterview = document.getElementById('lesson-interview');
const lessonCode = document.getElementById('lesson-code');
const challengeType = document.getElementById('challenge-type');
const challengeQuestion = document.getElementById('challenge-question');
const challengeCodeBlock = document.getElementById('challenge-code-block');
const challengeCode = document.getElementById('challenge-code');
const challengeOptions = document.getElementById('challenge-options');
const challengeFeedback = document.getElementById('challenge-feedback');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressText = document.getElementById('progress-text');
const completionMessage = document.getElementById('completion-message');
const finalScore = document.getElementById('final-score');

const state = {
    index: 0,
    score: 0,
    answers: {}
};

const renderList = (container, items) => {
    container.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        container.appendChild(li);
    });
};

const updateScore = () => {
    if (scoreOutput) {
        scoreOutput.textContent = state.score;
    }
};

const renderLesson = () => {
    const lesson = lessons[state.index];
    const total = lessons.length;

    if (!lesson) {
        return;
    }

    if (lessonCount) {
        lessonCount.textContent = `Nivel ${lesson.id} de ${total}`;
    }

    if (progressText) {
        progressText.textContent = `Nivel ${lesson.id} de ${total}`;
    }

    if (progressBar) {
        const progress = ((state.index + 1) / total) * 100;
        progressBar.style.width = `${progress}%`;
    }

    if (lessonBadge) {
        lessonBadge.textContent = `Nivel ${lesson.id}`;
    }

    if (lessonTitle) {
        lessonTitle.textContent = lesson.title;
    }

    if (lessonSummary) {
        lessonSummary.textContent = lesson.summary;
    }

    if (lessonTheory) {
        renderList(lessonTheory, lesson.theory);
    }

    if (lessonBreakdown) {
        renderList(lessonBreakdown, lesson.breakdown);
    }

    if (lessonInterview) {
        lessonInterview.innerHTML = `<strong>Frase entrevista:</strong> ${lesson.interview}`;
    }

    if (lessonCode) {
        lessonCode.textContent = lesson.code.trim();
    }

    if (challengeType) {
        challengeType.textContent = lesson.challenge.type;
    }

    if (challengeQuestion) {
        challengeQuestion.textContent = lesson.challenge.question;
    }

    if (challengeCode && challengeCodeBlock) {
        if (lesson.challenge.code) {
            challengeCode.textContent = lesson.challenge.code.trim();
            challengeCodeBlock.hidden = false;
        } else {
            challengeCode.textContent = '';
            challengeCodeBlock.hidden = true;
        }
    }

    if (challengeOptions) {
        challengeOptions.innerHTML = '';
        lesson.challenge.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(index));
            challengeOptions.appendChild(button);
        });
    }

    const answerState = state.answers[lesson.id];
    if (answerState && challengeOptions) {
        const buttons = challengeOptions.querySelectorAll('button');
        buttons.forEach((button, index) => {
            if (index === answerState.selectedIndex) {
                button.classList.add(answerState.isCorrect ? 'is-correct' : 'is-wrong');
            }

            if (answerState.isCorrect) {
                button.disabled = true;
            }
        });
    }

    if (challengeFeedback) {
        challengeFeedback.classList.remove('is-correct', 'is-wrong');
        if (answerState) {
            challengeFeedback.textContent = answerState.isCorrect
                ? `Correcto. ${lesson.challenge.explanation}`
                : 'Incorrecto. Intenta de nuevo.';
            challengeFeedback.classList.add(answerState.isCorrect ? 'is-correct' : 'is-wrong');
        } else {
            challengeFeedback.textContent = '';
        }
    }

    if (prevButton) {
        prevButton.disabled = state.index === 0;
    }

    if (nextButton) {
        const isLast = state.index === total - 1;
        const canAdvance = answerState?.isCorrect;
        nextButton.disabled = isLast || !canAdvance;
        nextButton.textContent = isLast ? 'Último nivel' : 'Siguiente nivel';
    }

    if (completionMessage && finalScore) {
        const isLast = state.index === total - 1;
        if (isLast && answerState?.isCorrect) {
            completionMessage.hidden = false;
            finalScore.textContent = state.score;
        } else {
            completionMessage.hidden = true;
        }
    }
};

const handleAnswer = (optionIndex) => {
    const lesson = lessons[state.index];
    if (!lesson) {
        return;
    }

    const isCorrect = optionIndex === lesson.challenge.answerIndex;
    const existing = state.answers[lesson.id];

    if (!existing) {
        state.answers[lesson.id] = {
            selectedIndex: optionIndex,
            isCorrect,
            awarded: isCorrect
        };
        if (isCorrect) {
            state.score += 10;
        }
    } else {
        if (!existing.awarded && isCorrect) {
            state.score += 10;
            existing.awarded = true;
        }
        existing.selectedIndex = optionIndex;
        existing.isCorrect = isCorrect;
    }

    updateScore();
    renderLesson();
};

if (prevButton) {
    prevButton.addEventListener('click', () => {
        if (state.index > 0) {
            state.index -= 1;
            renderLesson();
        }
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        const lesson = lessons[state.index];
        const answerState = lesson ? state.answers[lesson.id] : null;

        if (!answerState?.isCorrect) {
            if (challengeFeedback) {
                challengeFeedback.textContent = 'Responde correctamente para avanzar al siguiente nivel.';
                challengeFeedback.classList.remove('is-correct');
                challengeFeedback.classList.add('is-wrong');
            }
            return;
        }

        if (state.index < lessons.length - 1) {
            state.index += 1;
            renderLesson();
        }
    });
}

updateScore();
renderLesson();
