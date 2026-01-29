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
