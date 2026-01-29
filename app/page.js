"use client";

import { useEffect, useState } from "react";

const lessons = [
  {
    id: 1,
    title: "Clases y Objetos",
    summary: "Clase = molde, objeto = instancia.",
    theory: [
      "Clase = molde.",
      "Objeto = instancia.",
      "Una clase define estructura y comportamiento.",
    ],
    breakdown: [
      "Persona define cómo es una persona.",
      "p es una persona real en memoria.",
      "p.saludar() ejecuta el método.",
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
    interview:
      "Una clase define estructura y comportamiento, un objeto es una instancia de esa clase.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué es un objeto?",
      options: ["Un archivo", "Una instancia de una clase", "Un método"],
      answerIndex: 1,
      explanation: "Un objeto es la instancia real que vive en memoria.",
    },
  },
  {
    id: 2,
    title: "Encapsulación",
    summary: "Protege datos y controla el acceso.",
    theory: [
      "Oculta estado con private.",
      "Acceso mediante getters y setters.",
      "Evita estados inválidos.",
    ],
    breakdown: [
      "private protege la variable.",
      "Solo se accede con métodos controlados.",
      "La validación evita valores incorrectos.",
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
    interview:
      "Encapsulación controla el acceso a los datos y evita estados inválidos.",
    challenge: {
      type: "Detectar error",
      question: "¿Qué principio se está rompiendo aquí?",
      code: `class Persona {
    public int edad;
}`,
      options: ["Encapsulación", "Herencia", "Polimorfismo"],
      answerIndex: 0,
      explanation: "Exponer la variable rompe la encapsulación.",
    },
  },
  {
    id: 3,
    title: "Herencia",
    summary: "Reutiliza comportamiento común.",
    theory: [
      "Una subclase hereda atributos y métodos.",
      "Reduce duplicación.",
      "Permite especializar comportamiento.",
    ],
    breakdown: [
      "Perro hereda comer() de Animal.",
      "Perro agrega ladrar().",
      "No repites código común.",
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
    interview: "La herencia permite reutilizar comportamiento común.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué método puede usar Perro sin definirlo?",
      options: ["comer()", "ladrar()", "sonido()"],
      answerIndex: 0,
      explanation: "Perro hereda comer() desde Animal.",
    },
  },
  {
    id: 4,
    title: "Polimorfismo",
    summary: "El método ejecutado depende del objeto real.",
    theory: [
      "La referencia puede ser del tipo padre.",
      "El objeto real decide el método.",
      "Se resuelve en tiempo de ejecución.",
    ],
    breakdown: [
      "El tipo es Animal.",
      "El comportamiento es de Perro.",
      "Java decide en tiempo de ejecución.",
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
    interview:
      "El método que se ejecuta depende del objeto real, no de la referencia.",
    challenge: {
      type: "Predice la salida",
      question: "¿Qué imprime este código?",
      code: `Animal a = new Perro();
a.sonido();`,
      options: ["Sonido genérico", "Guau", "Error en compilación"],
      answerIndex: 1,
      explanation: "Se ejecuta el método sobrescrito en Perro.",
    },
  },
  {
    id: 5,
    title: "Abstracción",
    summary: "Las interfaces definen contratos.",
    theory: [
      "Define qué hacer sin implementar.",
      "La clase concreta decide cómo hacerlo.",
      "Promueve desacoplamiento.",
    ],
    breakdown: [
      "Vehiculo define arrancar().",
      "Coche implementa la interfaz.",
      "Se programa contra el contrato.",
    ],
    code: `interface Vehiculo {
    void arrancar();
}

class Coche implements Vehiculo {
    public void arrancar() {
        System.out.println("Coche arrancando");
    }
}`,
    interview: "Las interfaces definen contratos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué garantiza una interfaz?",
      options: ["Un contrato de métodos", "Memoria extra", "Mayor velocidad"],
      answerIndex: 0,
      explanation: "La interfaz obliga a implementar los métodos definidos.",
    },
  },
  {
    id: 6,
    title: "Colecciones",
    summary: "List, Set y Map para datos y búsquedas eficientes.",
    theory: [
      "List mantiene orden y permite duplicados.",
      "Set elimina repetidos automáticamente.",
      "Map guarda clave y valor.",
    ],
    breakdown: [
      "List sirve para listas ordenadas.",
      "Set evita valores duplicados.",
      "Map permite búsquedas rápidas por clave.",
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
    interview: "Map se usa para búsquedas eficientes por clave.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué colección elimina duplicados automáticamente?",
      options: ["List", "Set", "Map"],
      answerIndex: 1,
      explanation: "Set no permite elementos repetidos.",
    },
  },
  {
    id: 7,
    title: "Excepciones",
    summary: "Maneja errores con try, catch y finally.",
    theory: [
      "try ejecuta código que puede fallar.",
      "catch captura la excepción.",
      "finally se ejecuta siempre.",
    ],
    breakdown: [
      "Se evita caída por división por cero.",
      "Se muestra un mensaje de error.",
      "finally corre pase lo que pase.",
    ],
    code: `try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: división por cero");
} finally {
    System.out.println("Siempre se ejecuta");
}`,
    interview: "catch maneja el error y finally se ejecuta siempre.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué bloque se ejecuta siempre?",
      options: ["catch", "finally", "throw"],
      answerIndex: 1,
      explanation: "finally siempre se ejecuta, haya error o no.",
    },
  },
  {
    id: 8,
    title: "Stack vs Heap",
    summary: "Variables locales vs objetos en memoria.",
    theory: [
      "Stack es por hilo y rápido.",
      "Heap almacena objetos.",
      "Las referencias viven en stack.",
    ],
    breakdown: [
      "x vive en el stack.",
      "Persona vive en el heap.",
      "La referencia apunta al objeto.",
    ],
    code: `void metodo() {
    int x = 10;          // STACK
    Persona p = new Persona(); // HEAP
}`,
    interview: "El Stack es por hilo, el Heap es compartido.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Dónde vive un objeto creado con new?",
      options: ["Stack", "Heap", "Registro CPU"],
      answerIndex: 1,
      explanation: "Los objetos se almacenan en el heap.",
    },
  },
  {
    id: 9,
    title: "Concurrencia",
    summary: "Ejecuta tareas en paralelo con hilos.",
    theory: [
      "Runnable separa la lógica del hilo.",
      "Thread ejecuta la tarea.",
      "start() inicia la ejecución.",
    ],
    breakdown: [
      "La clase implementa Runnable.",
      "Thread recibe la tarea.",
      "start() crea un nuevo hilo.",
    ],
    code: `class MiHilo implements Runnable {
    public void run() {
        System.out.println("Ejecutando hilo");
    }
}

Thread t = new Thread(new MiHilo());
t.start();`,
    interview: "Runnable permite desacoplar la tarea del hilo que la ejecuta.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué método inicia el hilo?",
      options: ["run()", "start()", "execute()"],
      answerIndex: 1,
      explanation: "start() crea y lanza el nuevo hilo.",
    },
  },
  {
    id: 10,
    title: "10️⃣ static (miembro de clase)",
    summary: "static pertenece a la clase, no al objeto.",
    theory: [
      "Un miembro static es compartido.",
      "Existe una sola copia por clase.",
      "Se accede sin instanciar.",
    ],
    breakdown: [
      "static pertenece a la clase, no al objeto.",
      "Se comparte entre todas las instancias.",
      "Es útil para contadores o utilidades.",
    ],
    code: `class Contador {
    static int total = 0;
}`,
    interview:
      "static se usa cuando el estado o comportamiento es común a toda la clase.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué describe correctamente a static?",
      options: [
        "Pertenece a cada objeto",
        "Pertenece a la clase y se comparte",
        "Solo funciona en main",
      ],
      answerIndex: 1,
      explanation:
        "static crea un único valor compartido por todas las instancias.",
    },
  },
  {
    id: 11,
    title: "11️⃣ Tipos primitivos vs objetos",
    summary: "Primitivos son valores directos, objetos son referencias.",
    theory: [
      "int es primitivo (stack).",
      "Integer es objeto (heap).",
      "Wrappers permiten usar colecciones.",
    ],
    breakdown: [
      "int es primitivo y vive en stack.",
      "Integer es objeto y vive en heap.",
      "Los wrappers permiten métodos y null.",
    ],
    code: `int x = 5;
Integer y = 5;`,
    interview:
      "Los primitivos son más rápidos; los wrappers permiten trabajar con colecciones.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Cuál es un wrapper?",
      options: ["int", "Integer", "double"],
      answerIndex: 1,
      explanation: "Integer es la clase envoltorio del primitivo int.",
    },
  },
  {
    id: 12,
    title: "12️⃣ Constructores",
    summary: "Inicializan el objeto al crearse.",
    theory: [
      "Se ejecutan al crear el objeto.",
      "Inicializan el estado.",
      "Pueden recibir parámetros.",
    ],
    breakdown: [
      "El constructor corre al instanciar.",
      "Asigna valores iniciales.",
      "Evita objetos incompletos.",
    ],
    code: `class Persona {
    String nombre;

    Persona(String nombre) {
        this.nombre = nombre;
    }
}`,
    interview: "Un constructor asegura que el objeto nazca válido.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Cuándo se ejecuta un constructor?",
      options: [
        "Al crear el objeto",
        "Al terminar el programa",
        "Cuando se llama un getter",
      ],
      answerIndex: 0,
      explanation: "El constructor se ejecuta justo al instanciar la clase.",
    },
  },
  {
    id: 13,
    title: "13️⃣ this",
    summary: "Referencia a la instancia actual.",
    theory: [
      "Distingue atributos de parámetros.",
      "Apunta al objeto actual.",
      "Se usa mucho en constructores.",
    ],
    breakdown: [
      "this evita confusión de nombres.",
      "Hace referencia al objeto actual.",
      "Permite encadenar métodos.",
    ],
    code: `this.nombre = nombre;`,
    interview: "this referencia la instancia actual.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué representa this?",
      options: ["La clase padre", "La instancia actual", "El paquete"],
      answerIndex: 1,
      explanation: "this siempre apunta al objeto actual.",
    },
  },
  {
    id: 14,
    title: "14️⃣ super",
    summary: "Accede a miembros de la clase padre.",
    theory: [
      "Llama métodos del padre.",
      "Accede a constructores base.",
      "Evita duplicar lógica.",
    ],
    breakdown: [
      "super llama a la clase padre.",
      "Permite reutilizar comportamiento.",
      "Se usa en herencia.",
    ],
    code: `super.comer();`,
    interview: "super permite reutilizar comportamiento del padre.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué se usa super?",
      options: [
        "Acceder a miembros del padre",
        "Crear un objeto nuevo",
        "Declarar una interfaz",
      ],
      answerIndex: 0,
      explanation: "super invoca métodos o constructores de la clase padre.",
    },
  },
  {
    id: 15,
    title: "15️⃣ Arrays",
    summary: "Estructura de tamaño fijo y acceso rápido.",
    theory: ["Tamaño fijo.", "Acceso rápido por índice.", "Es una estructura básica."],
    breakdown: [
      "Un array tiene longitud fija.",
      "Accedes por índice en O(1).",
      "Es eficiente pero poco flexible.",
    ],
    code: `int[] numeros = {1, 2, 3};`,
    interview: "Un array es eficiente pero poco flexible.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué característica define a un array?",
      options: ["Tamaño fijo", "Orden aleatorio", "Claves y valores"],
      answerIndex: 0,
      explanation: "Los arrays tienen tamaño fijo.",
    },
  },
  {
    id: 16,
    title: "16️⃣ Bucle for-each",
    summary: "Itera colecciones de forma simple.",
    theory: [
      "Itera sin índices explícitos.",
      "Más legible.",
      "Reduce errores de límites.",
    ],
    breakdown: [
      "Recorre cada elemento.",
      "No necesitas índices.",
      "Mejora legibilidad.",
    ],
    code: `for (String n : nombres) {
    System.out.println(n);
}`,
    interview: "El for-each reduce errores y mejora legibilidad.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué ventaja tiene for-each?",
      options: [
        "Evita índices manuales",
        "Permite modificar tamaño",
        "Es más lento siempre",
      ],
      answerIndex: 0,
      explanation: "for-each recorre colecciones sin índices explícitos.",
    },
  },
  {
    id: 17,
    title: "17️⃣ .equals() vs ==",
    summary: "equals compara contenido, == referencia.",
    theory: [
      "== compara referencias.",
      "equals compara contenido.",
      "equals puede sobrescribirse.",
    ],
    breakdown: [
      "== compara direcciones.",
      "equals compara valor.",
      "En objetos usa equals().",
    ],
    code: `a.equals(b); // contenido
a == b;      // referencia`,
    interview: "En objetos, siempre usar equals().",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué compara == en objetos?",
      options: ["Contenido", "Referencia", "Hash"],
      answerIndex: 1,
      explanation: "== compara si las referencias apuntan al mismo objeto.",
    },
  },
  {
    id: 18,
    title: "18️⃣ toString()",
    summary: "Convierte objetos a texto.",
    theory: [
      "Se usa al imprimir un objeto.",
      "Puede sobrescribirse.",
      "Útil para debug.",
    ],
    breakdown: [
      "System.out.println(obj) llama toString.",
      "Devuelve una representación legible.",
      "Facilita el logging.",
    ],
    code: `System.out.println(obj);`,
    interview: "toString() facilita el logging y depuración.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué sirve toString()?",
      options: ["Convertir objeto a texto", "Comparar objetos", "Crear un objeto"],
      answerIndex: 0,
      explanation: "toString devuelve una representación textual del objeto.",
    },
  },
  {
    id: 19,
    title: "19️⃣ throw",
    summary: "Lanza excepciones personalizadas.",
    theory: [
      "Lanza un error controlado.",
      "Detiene el flujo normal.",
      "Comunica estados inválidos.",
    ],
    breakdown: [
      "throw crea una excepción.",
      "Se usa para validar.",
      "Evita estados incorrectos.",
    ],
    code: `throw new IllegalArgumentException("Edad inválida");`,
    interview: "Las excepciones comunican errores de forma clara.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué hace throw?",
      options: [
        "Lanza una excepción",
        "Captura una excepción",
        "Ignora un error",
      ],
      answerIndex: 0,
      explanation: "throw lanza una excepción manualmente.",
    },
  },
  {
    id: 20,
    title: "20️⃣ throws",
    summary: "Declara excepciones que se propagan.",
    theory: [
      "Propaga la excepción.",
      "Otro método decide manejarla.",
      "Obliga a try/catch o throws.",
    ],
    breakdown: [
      "throws declara posibles errores.",
      "La llamada decide cómo manejar.",
      "Mantiene la firma clara.",
    ],
    code: `void leer() throws IOException {}`,
    interview: "throws delega el manejo del error.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué indica throws?",
      options: [
        "Que el método lanza una excepción",
        "Que siempre captura excepciones",
        "Que no puede fallar",
      ],
      answerIndex: 0,
      explanation: "throws declara que el método puede lanzar excepciones.",
    },
  },
  {
    id: 21,
    title: "21️⃣ Scanner",
    summary: "Lee datos desde consola.",
    theory: [
      "Permite leer input del usuario.",
      "Se usa con System.in.",
      "Convierte a tipos básicos.",
    ],
    breakdown: [
      "Scanner lee desde consola.",
      "Puedes leer int, String, etc.",
      "Es ideal para ejercicios.",
    ],
    code: `Scanner sc = new Scanner(System.in);
int edad = sc.nextInt();`,
    interview: "Scanner permite interacción con el usuario.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué se usa Scanner?",
      options: [
        "Leer datos de entrada",
        "Conectar a base de datos",
        "Crear archivos",
      ],
      answerIndex: 0,
      explanation: "Scanner lee datos desde System.in.",
    },
  },
  {
    id: 22,
    title: "22️⃣ File",
    summary: "Representa rutas de archivos o carpetas.",
    theory: [
      "Modela archivos o directorios.",
      "No lee contenido.",
      "Permite consultar existencia.",
    ],
    breakdown: [
      "File representa archivos o carpetas.",
      "No lee archivos, solo los representa.",
      "Se usa con streams.",
    ],
    code: `File f = new File("datos.txt");`,
    interview: "File no lee archivos, los representa.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué hace File?",
      options: [
        "Representa una ruta",
        "Lee el archivo",
        "Escribe automáticamente",
      ],
      answerIndex: 0,
      explanation: "File solo representa rutas y metadatos.",
    },
  },
  {
    id: 23,
    title: "23️⃣ BufferedReader",
    summary: "Lectura eficiente de texto.",
    theory: [
      "Lee con buffer.",
      "Ideal para archivos grandes.",
      "Trabaja con FileReader.",
    ],
    breakdown: [
      "BufferedReader mejora rendimiento.",
      "Reduce accesos al disco.",
      "Lee líneas completas.",
    ],
    code: `BufferedReader br = new BufferedReader(new FileReader("a.txt"));`,
    interview: "El buffer mejora el rendimiento de lectura.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Por qué usar BufferedReader?",
      options: ["Para leer más rápido", "Para escribir datos", "Para borrar archivos"],
      answerIndex: 0,
      explanation: "El buffer reduce accesos y mejora el rendimiento.",
    },
  },
  {
    id: 24,
    title: "24️⃣ FileWriter",
    summary: "Escritura básica en archivos.",
    theory: [
      "Escribe texto en archivos.",
      "Puede sobrescribir o anexar.",
      "Requiere cerrar el stream.",
    ],
    breakdown: [
      "FileWriter escribe en archivos.",
      "Sirve para persistir datos.",
      "Se combina con BufferedWriter.",
    ],
    code: `FileWriter fw = new FileWriter("salida.txt");`,
    interview: "FileWriter permite persistencia básica.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué sirve FileWriter?",
      options: ["Escribir en archivos", "Leer archivos", "Crear carpetas"],
      answerIndex: 0,
      explanation: "FileWriter abre un stream de escritura.",
    },
  },
  {
    id: 25,
    title: "25️⃣ Math.random()",
    summary: "Genera números entre 0 y 1.",
    theory: [
      "Devuelve double entre 0 y 1.",
      "Es pseudoaleatorio.",
      "Útil en juegos y simulaciones.",
    ],
    breakdown: [
      "Math.random() devuelve 0 a 1.",
      "Se escala para otros rangos.",
      "Útil para probabilidades.",
    ],
    code: `double r = Math.random();`,
    interview: "Se usa en juegos y simulaciones.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué rango devuelve Math.random()?",
      options: ["0 a 1", "1 a 100", "0 a 10"],
      answerIndex: 0,
      explanation: "Math.random() devuelve un double entre 0.0 y 1.0.",
    },
  },
  {
    id: 26,
    title: "26️⃣ LocalDate",
    summary: "API moderna para fechas.",
    theory: [
      "Pertenece a java.time.",
      "Es inmutable.",
      "Reemplaza Date para fechas.",
    ],
    breakdown: [
      "LocalDate maneja fechas modernas.",
      "No incluye hora.",
      "Es segura e inmutable.",
    ],
    code: `LocalDate hoy = LocalDate.now();`,
    interview: "java.time es inmutable y segura.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué ventaja tiene LocalDate?",
      options: [
        "Es inmutable y moderna",
        "Modifica Date directamente",
        "Usa timezone automático siempre",
      ],
      answerIndex: 0,
      explanation: "LocalDate es parte de java.time y es inmutable.",
    },
  },
  {
    id: 27,
    title: "27️⃣ final",
    summary: "Define constantes e inmutabilidad.",
    theory: ["No se puede reasignar.", "Clarifica intención.", "Evita errores."],
    breakdown: [
      "final evita modificaciones.",
      "Se usa para constantes.",
      "Hace el código más seguro.",
    ],
    code: `final int EDAD_MAX = 120;`,
    interview: "final previene errores y da intención.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué significa final en una variable?",
      options: ["No se puede modificar", "Se puede heredar", "Se elimina al final"],
      answerIndex: 0,
      explanation: "final impide reasignar el valor.",
    },
  },
  {
    id: 28,
    title: "28️⃣ package",
    summary: "Organiza el código en módulos.",
    theory: [
      "Define un namespace.",
      "Evita conflictos de nombres.",
      "Ordena proyectos grandes.",
    ],
    breakdown: [
      "package agrupa clases.",
      "Evita colisiones de nombres.",
      "Ayuda a estructurar.",
    ],
    code: `package com.app.modelo;`,
    interview: "Los paquetes estructuran proyectos grandes.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué se usa package?",
      options: ["Organizar código", "Crear objetos", "Definir variables"],
      answerIndex: 0,
      explanation: "package define el espacio de nombres.",
    },
  },
  {
    id: 29,
    title: "29️⃣ main",
    summary: "Punto de entrada del programa.",
    theory: ["La JVM busca main.", "Recibe args.", "Inicia la ejecución."],
    breakdown: [
      "main es el punto de entrada.",
      "Sin main no hay ejecución.",
      "args permite parámetros.",
    ],
    code: `public static void main(String[] args) {}`,
    interview: "Sin main, no hay ejecución.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué es main en Java?",
      options: ["Punto de entrada", "Constructor", "Clase abstracta"],
      answerIndex: 0,
      explanation: "main es el método que inicia la ejecución.",
    },
  },
  {
    id: 30,
    title: "30️⃣ enum (valores fijos)",
    summary: "Conjunto de valores constantes.",
    theory: ["Define valores fijos.", "Más seguro que Strings.", "Ideal para estados cerrados."],
    breakdown: [
      "Crea un conjunto de constantes.",
      "Evita errores por valores inválidos.",
      "Facilita comparaciones seguras.",
    ],
    code: `enum Dia {
    LUNES, MARTES, MIERCOLES
}`,
    interview: "enum evita errores por valores inválidos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué se usa un enum?",
      options: ["Valores fijos y seguros", "Texto libre", "Crear hilos"],
      answerIndex: 0,
      explanation: "enum define un conjunto limitado de valores.",
    },
  },
  {
    id: 31,
    title: "31️⃣ instanceof",
    summary: "Verifica el tipo real del objeto.",
    theory: ["Comprueba el tipo en runtime.", "Devuelve boolean.", "Se usa antes de casting."],
    breakdown: [
      "instanceof valida el tipo real.",
      "Evita ClassCastException.",
      "Se evalúa en tiempo de ejecución.",
    ],
    code: `if (obj instanceof Perro) { }`,
    interview: "Se usa para comprobar el tipo en tiempo de ejecución.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué devuelve instanceof?",
      options: ["boolean", "int", "Object"],
      answerIndex: 0,
      explanation: "instanceof devuelve true o false.",
    },
  },
  {
    id: 32,
    title: "32️⃣ Bloques static",
    summary: "Se ejecutan al cargar la clase.",
    theory: ["Se ejecutan una sola vez.", "Se disparan al cargar la clase.", "Sirven para inicialización."],
    breakdown: [
      "El bloque corre una vez.",
      "Se ejecuta antes de crear objetos.",
      "Útil para recursos compartidos.",
    ],
    code: `static {
    System.out.println("Carga de clase");
}`,
    interview: "Los bloques static inicializan recursos compartidos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Cuándo se ejecuta un bloque static?",
      options: ["Al cargar la clase", "En cada objeto", "Solo en main"],
      answerIndex: 0,
      explanation: "Se ejecuta una sola vez al cargar la clase.",
    },
  },
  {
    id: 33,
    title: "33️⃣ Sobrescritura (@Override)",
    summary: "Garantiza que sobrescribes bien.",
    theory: ["Verifica la firma del método.", "Evita errores silenciosos.", "Usa la anotación @Override."],
    breakdown: [
      "@Override valida la sobrescritura.",
      "Protege contra errores de firma.",
      "Facilita mantenimiento.",
    ],
    code: `@Override
void sonido() { }`,
    interview: "@Override protege contra errores silenciosos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué sirve @Override?",
      options: ["Validar sobrescritura", "Hacer el método privado", "Crear una clase"],
      answerIndex: 0,
      explanation: "@Override asegura que realmente sobrescribes un método.",
    },
  },
  {
    id: 34,
    title: "34️⃣ Sobrecarga (Overloading)",
    summary: "Mismo método con distintos parámetros.",
    theory: ["Mismo nombre, distinta firma.", "Se decide en compilación.", "Mejora legibilidad."],
    breakdown: ["Sobrecarga cambia parámetros.", "No cambia el nombre.", "Permite varias formas de uso."],
    code: `sumar(int a)
sumar(int a, int b)`,
    interview: "La sobrecarga mejora la legibilidad.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué cambia en la sobrecarga?",
      options: ["Parámetros", "Nombre", "Clase base"],
      answerIndex: 0,
      explanation: "La sobrecarga varía los parámetros del método.",
    },
  },
  {
    id: 35,
    title: "35️⃣ Inmutabilidad (String)",
    summary: "String no cambia, crea otro objeto.",
    theory: ["String es inmutable.", "concat crea un nuevo objeto.", "Mayor seguridad y rendimiento."],
    breakdown: [
      "El valor original no cambia.",
      "concat retorna un nuevo String.",
      "Evita cambios inesperados.",
    ],
    code: `String s = "Hola";
s.concat(" Mundo");`,
    interview: "String es inmutable por seguridad y rendimiento.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué pasa con s después de concat?",
      options: ["No cambia", "Se modifica", "Se vuelve null"],
      answerIndex: 0,
      explanation: "concat devuelve un nuevo String, s queda igual.",
    },
  },
  {
    id: 36,
    title: "36️⃣ Optional",
    summary: "Evita NullPointerException.",
    theory: ["Representa valor presente o ausente.", "Fuerza a manejar null.", "Reduce NPE."],
    breakdown: [
      "Optional evita null directo.",
      "Obliga a comprobar presencia.",
      "Mejora la seguridad del código.",
    ],
    code: `Optional<String> nombre;`,
    interview: "Optional fuerza a pensar en null.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué busca evitar Optional?",
      options: ["NullPointerException", "Errores de compilación", "Herencia"],
      answerIndex: 0,
      explanation: "Optional ayuda a evitar NPE al manejar ausencia.",
    },
  },
  {
    id: 37,
    title: "37️⃣ NullPointerException",
    summary: "Error por referencia no inicializada.",
    theory: ["Ocurre al usar un null.", "Es el error más común.", "Se evita con validación."],
    breakdown: [
      "obj es null.",
      "Llamar métodos lanza NPE.",
      "Se previene con null checks.",
    ],
    code: `obj.metodo();`,
    interview: "El NPE indica referencia no inicializada.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué causa un NullPointerException?",
      options: ["Usar una referencia null", "Dividir por cero", "Crear un array"],
      answerIndex: 0,
      explanation: "Llamar métodos en un null genera NPE.",
    },
  },
  {
    id: 38,
    title: "38️⃣ try-with-resources",
    summary: "Cierra recursos automáticamente.",
    theory: ["Cierra recursos al final.", "Evita fugas de memoria.", "Simplifica manejo."],
    breakdown: [
      "El recurso se cierra solo.",
      "Se evita cerrar manualmente.",
      "Reduce errores de limpieza.",
    ],
    code: `try (Scanner sc = new Scanner(System.in)) { }`,
    interview: "Evita fugas de memoria.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué ventaja tiene try-with-resources?",
      options: ["Cierra recursos automáticamente", "Evita excepciones", "Acelera el CPU"],
      answerIndex: 0,
      explanation: "Los recursos se cierran automáticamente.",
    },
  },
  {
    id: 39,
    title: "39️⃣ final en métodos",
    summary: "No se puede sobrescribir.",
    theory: ["Impide override.", "Asegura comportamiento.", "Útil en clases base."],
    breakdown: [
      "final bloquea sobrescritura.",
      "Garantiza lógica fija.",
      "Evita cambios inesperados.",
    ],
    code: `final void metodo() {}`,
    interview: "Se usa para asegurar comportamiento.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué evita final en métodos?",
      options: ["Sobrescritura", "Sobrecarga", "Compilación"],
      answerIndex: 0,
      explanation: "final impide que se sobrescriba el método.",
    },
  },
  {
    id: 40,
    title: "40️⃣ final en clases",
    summary: "No permite herencia.",
    theory: ["Evita que otras clases hereden.", "Se usa en utilidades.", "Protege la implementación."],
    breakdown: [
      "final bloquea herencia.",
      "Evita extensiones no deseadas.",
      "Se usa en clases utilitarias.",
    ],
    code: `final class Util {}`,
    interview: "Clases utilitarias suelen ser final.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué significa final en una clase?",
      options: ["No se puede heredar", "No se puede instanciar", "Es abstracta"],
      answerIndex: 0,
      explanation: "final impide que otras clases hereden.",
    },
  },
  {
    id: 41,
    title: "41️⃣ Casting (conversión)",
    summary: "Conversión explícita de tipos.",
    theory: ["Necesita casting explícito.", "Puede fallar en runtime.", "Usar con cuidado."],
    breakdown: [
      "Convierte referencia padre a hijo.",
      "Puede lanzar ClassCastException.",
      "Se valida con instanceof.",
    ],
    code: `Animal a = new Perro();
Perro p = (Perro) a;`,
    interview: "El casting debe usarse con cuidado.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué riesgo tiene el casting?",
      options: ["ClassCastException", "NullPointerException", "Overflow"],
      answerIndex: 0,
      explanation: "Un casting incorrecto lanza ClassCastException.",
    },
  },
  {
    id: 42,
    title: "42️⃣ Autoboxing / Unboxing",
    summary: "Conversión automática de primitivos y wrappers.",
    theory: [
      "Autoboxing: primitivo a wrapper.",
      "Unboxing: wrapper a primitivo.",
      "Java lo hace automáticamente.",
    ],
    breakdown: [
      "Integer x = 5 es autoboxing.",
      "int y = x es unboxing.",
      "Simplifica el código.",
    ],
    code: `Integer x = 5;
int y = x;`,
    interview: "Java convierte primitivos y wrappers.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué es unboxing?",
      options: ["Wrapper a primitivo", "Primitivo a wrapper", "Casting de clases"],
      answerIndex: 0,
      explanation: "Unboxing convierte un wrapper en primitivo.",
    },
  },
  {
    id: 43,
    title: "43️⃣ Comparable",
    summary: "Define el orden natural.",
    theory: ["Implementa compareTo.", "Define orden natural.", "Se usa en ordenamientos."],
    breakdown: [
      "Comparable vive dentro de la clase.",
      "Define cómo se ordena.",
      "Permite Collections.sort().",
    ],
    code: `class Persona implements Comparable<Persona>`,
    interview: "Comparable permite ordenar objetos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué método obliga Comparable?",
      options: ["compareTo", "equals", "hashCode"],
      answerIndex: 0,
      explanation: "Comparable requiere implementar compareTo.",
    },
  },
  {
    id: 44,
    title: "44️⃣ Comparator",
    summary: "Orden externo y flexible.",
    theory: [
      "Define orden fuera de la clase.",
      "Permite múltiples criterios.",
      "Más flexible que Comparable.",
    ],
    breakdown: [
      "Comparator vive fuera de la clase.",
      "Permite ordenar por distintos campos.",
      "Se pasa a sort().",
    ],
    code: `Comparator<Persona> porEdad;`,
    interview: "Comparator separa lógica de orden.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Dónde se define el orden en Comparator?",
      options: ["Fuera de la clase", "Dentro de la clase", "En main"],
      answerIndex: 0,
      explanation: "Comparator define el orden externamente.",
    },
  },
  {
    id: 45,
    title: "45️⃣ Streams",
    summary: "Programación funcional y declarativa.",
    theory: ["Operaciones encadenadas.", "Más expresivo.", "Procesamiento perezoso."],
    breakdown: [
      "stream() crea un flujo.",
      "filter aplica condición.",
      "Operaciones se encadenan.",
    ],
    code: `lista.stream().filter(x -> x > 5);`,
    interview: "Streams hacen el código más expresivo.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué describe a Streams?",
      options: ["Operaciones funcionales", "Variables globales", "Bloques static"],
      answerIndex: 0,
      explanation: "Streams permiten operaciones funcionales sobre colecciones.",
    },
  },
  {
    id: 46,
    title: "46️⃣ Lambdas",
    summary: "Funciones anónimas en Java.",
    theory: [
      "Sintaxis compacta.",
      "Reduce boilerplate.",
      "Útil con interfaces funcionales.",
    ],
    breakdown: [
      "Lambda es una función anónima.",
      "Simplifica el código.",
      "Se usa con Streams.",
    ],
    code: `x -> x * 2`,
    interview: "Las lambdas simplifican código.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué representan las lambdas?",
      options: ["Funciones anónimas", "Clases abstractas", "Constructores"],
      answerIndex: 0,
      explanation: "Una lambda es una función sin nombre.",
    },
  },
  {
    id: 47,
    title: "47️⃣ synchronized",
    summary: "Evita acceso concurrente.",
    theory: ["Bloquea acceso simultáneo.", "Garantiza consistencia.", "Protege secciones críticas."],
    breakdown: [
      "synchronized asegura exclusión mutua.",
      "Solo un hilo entra a la vez.",
      "Evita condiciones de carrera.",
    ],
    code: `synchronized void metodo() {}`,
    interview: "Garantiza consistencia en hilos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué garantiza synchronized?",
      options: ["Exclusión mutua", "Mayor velocidad", "Más memoria"],
      answerIndex: 0,
      explanation: "synchronized bloquea acceso concurrente.",
    },
  },
  {
    id: 48,
    title: "48️⃣ volatile",
    summary: "Visibilidad entre hilos.",
    theory: [
      "Garantiza lectura actualizada.",
      "No bloquea como synchronized.",
      "Útil para flags.",
    ],
    breakdown: [
      "volatile asegura visibilidad.",
      "Los hilos leen el último valor.",
      "No garantiza exclusión mutua.",
    ],
    code: `volatile boolean activo;`,
    interview: "volatile asegura lectura actualizada.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué garantiza volatile?",
      options: ["Visibilidad", "Exclusión mutua", "Persistencia"],
      answerIndex: 0,
      explanation: "volatile garantiza que los hilos lean el valor actualizado.",
    },
  },
  {
    id: 49,
    title: "49️⃣ transient",
    summary: "Evita serializar campos.",
    theory: ["No se serializa.", "Protege datos sensibles.", "Ignora el campo al guardar."],
    breakdown: [
      "transient excluye un campo.",
      "No se guarda en bytes.",
      "Se usa para datos sensibles.",
    ],
    code: `transient int password;`,
    interview: "Protege datos sensibles.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Qué hace transient?",
      options: ["No serializa el campo", "Lo vuelve final", "Lo hace público"],
      answerIndex: 0,
      explanation: "transient excluye el campo de la serialización.",
    },
  },
  {
    id: 50,
    title: "50️⃣ Serialización",
    summary: "Convierte objetos en bytes.",
    theory: [
      "Permite guardar o enviar objetos.",
      "Usa Serializable.",
      "Convierte a bytes.",
    ],
    breakdown: [
      "El objeto se vuelve bytes.",
      "Se puede persistir o enviar.",
      "Serializable habilita el proceso.",
    ],
    code: `implements Serializable`,
    interview: "Permite guardar o enviar objetos.",
    challenge: {
      type: "Pregunta conceptual",
      question: "¿Para qué sirve Serializable?",
      options: ["Convertir objetos en bytes", "Crear threads", "Evitar NPE"],
      answerIndex: 0,
      explanation: "Serializable habilita la serialización de objetos.",
    },
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentLesson = lessons[index];
  const total = lessons.length;
  const answerState = answers[currentLesson.id];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleAnswer = (optionIndex) => {
    setAnswers((prev) => {
      const existing = prev[currentLesson.id];
      const isCorrect =
        optionIndex === currentLesson.challenge.answerIndex;
      const awarded = existing?.awarded ?? false;

      if (!awarded && isCorrect) {
        setScore((prevScore) => prevScore + 10);
      }

      return {
        ...prev,
        [currentLesson.id]: {
          selectedIndex: optionIndex,
          isCorrect,
          awarded: awarded || isCorrect,
        },
      };
    });
  };

  const canAdvance = answerState?.isCorrect;

  return (
    <>
      <nav className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="container nav-content">
          <div className="logo">Java Interview Game</div>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#inicio" onClick={(event) => handleScroll(event, "inicio")}>
                Atrás
              </a>
            </li>
          </ul>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <header id="inicio" className="hero">
        <div className="container hero-grid">
          <div className="hero-content reveal">
            <span className="pill">Juego educativo interactivo</span>
            <h1>Entrena Java como si fuera una entrevista técnica</h1>
            <p className="hero-subtitle">
              Un recorrido por Programación Orientada a Objetos con teoría clara, retos
              prácticos y decisiones reales. Diseñado para subir de nivel mientras practicas
              conceptos clave de Java.
            </p>
            <div className="hero-actions">
              <a href="#juego" className="btn-primary" onClick={(event) => handleScroll(event, "juego")}>
                Jugar ahora
              </a>
              <a
                href="#sistema"
                className="btn-secondary"
                onClick={(event) => handleScroll(event, "sistema")}
              >
                Ver sistema
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <p className="stat-label">Niveles</p>
                <p className="stat-value">50 conceptos esenciales</p>
              </div>
              <div className="stat">
                <p className="stat-label">Formato</p>
                <p className="stat-value">Quiz + simulador + mini retos</p>
              </div>
              <div className="stat">
                <p className="stat-label">Foco</p>
                <p className="stat-value">Preguntas de entrevista</p>
              </div>
            </div>
          </div>
          <div className="hero-side reveal">
            <div className="card highlight">
              <h2>Idea central del juego</h2>
              <p>
                El jugador no solo lee: toma decisiones, completa código, detecta errores,
                elige respuestas y avanza de nivel.
              </p>
              <ul className="checklist">
                <li>Aprendizaje por niveles y desafíos cortos.</li>
                <li>Feedback inmediato y progreso visible.</li>
                <li>Entrenamiento orientado a entrevistas técnicas.</li>
              </ul>
            </div>
            <div className="card quote-card">
              <p className="quote-title">Frase final</p>
              <p className="quote">
                Este juego no enseña Java como tutorial, lo entrena como si fuera una
                entrevista técnica.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="juego" className="section">
        <div className="container">
          <div className="section-heading reveal">
            <h2>Juego paso a paso</h2>
            <p>
              Avanza nivel por nivel, responde retos y suma puntos mientras practicas
              conceptos clave.
            </p>
          </div>

          <div className="game-back">
            <a href="#inicio" className="btn-secondary" onClick={(event) => handleScroll(event, "inicio")}>
              Atrás
            </a>
          </div>

          <div className="game-shell reveal">
            <div className="game-header">
              <div className="game-progress">
                <p className="eyebrow">Progreso</p>
                <p className="lesson-count">
                  Nivel {currentLesson.id} de {total}
                </p>
                <div className="progress-track">
                  <span style={{ width: `${((index + 1) / total) * 100}%` }}></span>
                </div>
              </div>
              <div className="score-pill">
                <span>Puntaje</span>
                <strong>{score}</strong>
              </div>
            </div>

            <div className="game-body">
              <div className="lesson-info">
                <span className="badge">Nivel {currentLesson.id}</span>
                <h3>{currentLesson.title}</h3>
                <p>{currentLesson.summary}</p>
              </div>

              <div className="lesson-columns">
                <div className="lesson-column">
                  <h4>Teoría clave</h4>
                  <ul>
                    {currentLesson.theory.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4>Qué pasa aquí</h4>
                  <ul>
                    {currentLesson.breakdown.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="interview-quote">
                    <strong>Frase entrevista:</strong> {currentLesson.interview}
                  </p>
                </div>
                <div className="lesson-column">
                  <p className="code-label">Código del nivel</p>
                  <pre>
                    <code>{currentLesson.code.trim()}</code>
                  </pre>
                </div>
              </div>

              <div className="challenge-area">
                <div className="challenge-heading">
                  <span className="challenge-type">{currentLesson.challenge.type}</span>
                  <h4>{currentLesson.challenge.question}</h4>
                </div>
                {currentLesson.challenge.code ? (
                  <pre>
                    <code>{currentLesson.challenge.code.trim()}</code>
                  </pre>
                ) : null}
                <div className="challenge-options">
                  {currentLesson.challenge.options.map((option, optionIndex) => {
                    const isSelected = answerState?.selectedIndex === optionIndex;
                    const className = isSelected
                      ? answerState?.isCorrect
                        ? "option is-correct"
                        : "option is-wrong"
                      : "option";
                    return (
                      <button
                        key={option}
                        type="button"
                        className={className}
                        onClick={() => handleAnswer(optionIndex)}
                        disabled={answerState?.isCorrect}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <p
                  className={`challenge-feedback ${
                    answerState ? (answerState.isCorrect ? "is-correct" : "is-wrong") : ""
                  }`}
                >
                  {answerState
                    ? answerState.isCorrect
                      ? `Correcto. ${currentLesson.challenge.explanation}`
                      : "Incorrecto. Intenta de nuevo."
                    : ""}
                </p>
              </div>
            </div>

            <div className="game-controls">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                disabled={index === 0}
              >
                Nivel anterior
              </button>
              <div className="control-meta">
                <span>
                  Nivel {currentLesson.id} de {total}
                </span>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (index < total - 1 && canAdvance) {
                    setIndex((prev) => prev + 1);
                  }
                }}
                disabled={index === total - 1 || !canAdvance}
              >
                {index === total - 1 ? "Último nivel" : "Siguiente nivel"}
              </button>
            </div>

            {index === total - 1 && canAdvance ? (
              <div className="completion-message">
                <h3>¡Juego completado!</h3>
                <p>Ya dominas POO en Java para entrevistas.</p>
                <p className="final-score">
                  Puntaje final: <span>{score}</span>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="sistema" className="section alt">
        <div className="container">
          <div className="section-heading reveal">
            <h2>Sistema de juego</h2>
            <p>El progreso se siente como una entrevista real con logros y feedback inmediato.</p>
          </div>

          <div className="system-grid">
            <div className="system-card reveal">
              <h3>Puntos y racha</h3>
              <ul>
                <li>+10 puntos por respuesta correcta.</li>
                <li>Feedback inmediato para corregir errores.</li>
                <li>Resumen final con tu puntaje total.</li>
              </ul>
            </div>
            <div className="system-card reveal">
              <h3>Niveles desbloqueables</h3>
              <ul>
                <li>50 niveles alineados a conceptos POO.</li>
                <li>Retos variados para entrenar entrevistas.</li>
                <li>Botones de siguiente y anterior para avanzar.</li>
              </ul>
            </div>
            <div className="system-card reveal">
              <h3>Pregunta entrevista</h3>
              <p>Las frases clave quedan listas para decir en entrevistas técnicas sin dudar.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-content">
          <p>Java Interview Game · 2026 · Entrenamiento de POO para entrevistas técnicas.</p>
        </div>
      </footer>
    </>
  );
}
