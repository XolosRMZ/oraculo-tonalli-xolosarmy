export type TonalSignReading = {
  readonly nahuatl: string;
  readonly spanish: string;
  readonly keywords: readonly string[];
  readonly shortMeaning: string;
  readonly longMeaning: string;
  readonly gifts: readonly string[];
  readonly challenges: readonly string[];
  readonly xolosArmyInterpretation: string;
};

export const tonalSigns = [
  {
    nahuatl: "Cipactli",
    spanish: "Caiman",
    keywords: ["origen", "sustento", "tierra primera"],
    shortMeaning: "Cipactli abre el suelo de la vida y recuerda el primer alimento.",
    longMeaning:
      "Como Caiman, este signo habla del comienzo material: cuerpo, territorio, memoria antigua y la base que sostiene a la comunidad.",
    gifts: ["resistencia", "instinto para iniciar", "cuidado de lo esencial"],
    challenges: ["apego al control", "reaccionar desde el hambre", "olvidar el cuidado comunal"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Cipactli llama a construir desde la raiz: infraestructura, confianza y memoria compartida."
  },
  {
    nahuatl: "Ehecatl",
    spanish: "Viento",
    keywords: ["aliento", "palabra", "direccion"],
    shortMeaning: "Ehecatl mueve la palabra y limpia el camino con aliento.",
    longMeaning:
      "Como Viento, este signo se relaciona con comunicacion, respiracion y cambio de direccion sin romper la continuidad del camino.",
    gifts: ["claridad oral", "adaptacion", "mensajeria entre personas"],
    challenges: ["dispersarse", "hablar sin responsabilidad", "moverse sin escuchar"],
    xolosArmyInterpretation:
      "Para xolosArmy, Ehecatl pide que cada mensaje fortalezca la red y no se separe de la responsabilidad colectiva."
  },
  {
    nahuatl: "Calli",
    spanish: "Casa",
    keywords: ["hogar", "resguardo", "linaje"],
    shortMeaning: "Calli guarda el fuego de la casa y la continuidad del linaje.",
    longMeaning:
      "Como Casa, este signo marca pertenencia, resguardo, organizacion interna y el trabajo cotidiano que permite permanecer.",
    gifts: ["proteccion", "memoria familiar", "orden comunitario"],
    challenges: ["cerrarse al cambio", "confundir cuidado con encierro", "cargar historias sin revisarlas"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Calli recuerda que toda red necesita casa simbolica: reglas claras, cuidado y pertenencia."
  },
  {
    nahuatl: "Cuetzpalin",
    spanish: "Lagartija",
    keywords: ["vitalidad", "agilidad", "renovacion"],
    shortMeaning: "Cuetzpalin representa cuerpo despierto, respuesta rapida y renovacion.",
    longMeaning:
      "Como Lagartija, este signo habla de energia vital, reflejos, regeneracion y capacidad de atravesar superficies dificiles.",
    gifts: ["agilidad", "curiosidad", "recuperacion"],
    challenges: ["impulsividad", "inquietud sin rumbo", "evitar profundidad"],
    xolosArmyInterpretation:
      "Para xolosArmy, Cuetzpalin invita a moverse con inteligencia tactica y a recuperar fuerza despues del desgaste."
  },
  {
    nahuatl: "Coatl",
    spanish: "Serpiente",
    keywords: ["energia vital", "transformacion", "sabiduria del cuerpo"],
    shortMeaning: "Coatl honra la fuerza vital que cambia de piel y sigue avanzando.",
    longMeaning:
      "Como Serpiente, este signo representa continuidad de vida, transformacion, sensibilidad corporal y conocimiento que se transmite por la experiencia.",
    gifts: ["renovacion profunda", "percepcion", "poder de sanar vinculos"],
    challenges: ["tension acumulada", "silencio defensivo", "usar la fuerza sin medida"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Coatl cuida la energia de la comunidad para que la transformacion no rompa la memoria ni la confianza."
  },
  {
    nahuatl: "Miquiztli",
    spanish: "Muerte",
    keywords: ["cierre", "ancestros", "transicion"],
    shortMeaning: "Miquiztli recuerda que todo cierre tambien guarda memoria.",
    longMeaning:
      "Como Muerte, este signo no anuncia fatalidad; simboliza transicion, respeto por los ancestros y capacidad de soltar lo que ya cumplio su tiempo.",
    gifts: ["sobriedad", "escucha ancestral", "fuerza para cerrar ciclos"],
    challenges: ["miedo al cambio", "melancolia inmovil", "cortar sin ceremonia"],
    xolosArmyInterpretation:
      "Para xolosArmy, Miquiztli pide honrar a quienes abrieron camino y cerrar procesos con dignidad comunitaria."
  },
  {
    nahuatl: "Mazatl",
    spanish: "Venado",
    keywords: ["sensibilidad", "camino", "cuidado"],
    shortMeaning: "Mazatl camina con atencion fina y respeto por el territorio.",
    longMeaning:
      "Como Venado, este signo relaciona sensibilidad, orientacion, nobleza del movimiento y cuidado ante los pasos que se dan.",
    gifts: ["intuicion", "delicadeza", "orientacion en lo complejo"],
    challenges: ["huir del conflicto", "fragilidad ante la presion", "aislarse"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Mazatl enseña a avanzar sin atropellar: leer el terreno, escuchar senales y proteger el paso colectivo."
  },
  {
    nahuatl: "Tochtli",
    spanish: "Conejo",
    keywords: ["fertilidad", "abundancia", "celebracion"],
    shortMeaning: "Tochtli habla de abundancia viva y alegria con responsabilidad.",
    longMeaning:
      "Como Conejo, este signo se vincula con multiplicacion, alimento, fiesta y el equilibrio necesario para que la abundancia no se desperdicie.",
    gifts: ["creatividad", "generosidad", "capacidad de reunir"],
    challenges: ["exceso", "distraccion", "prometer mas de lo que se sostiene"],
    xolosArmyInterpretation:
      "Para xolosArmy, Tochtli invita a celebrar los logros de la red sin perder disciplina ni reciprocidad."
  },
  {
    nahuatl: "Atl",
    spanish: "Agua",
    keywords: ["flujo", "memoria", "limpieza"],
    shortMeaning: "Atl conserva memoria y permite que la vida circule.",
    longMeaning:
      "Como Agua, este signo representa flujo emocional, limpieza, adaptacion y la memoria que viaja entre generaciones.",
    gifts: ["empatia", "purificacion", "flexibilidad"],
    challenges: ["desbordarse", "confundir calma con pasividad", "cargar emociones ajenas"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Atl pide canales limpios para que informacion, cuidado y recursos circulen sin estancarse."
  },
  {
    nahuatl: "Itzcuintli",
    spanish: "Perro",
    keywords: ["compania", "guia", "lealtad"],
    shortMeaning: "Itzcuintli acompaña el cruce y protege el camino compartido.",
    longMeaning:
      "Como Perro, este signo simboliza guia, lealtad, compania y capacidad de cruzar umbrales con sentido de cuidado.",
    gifts: ["lealtad", "proteccion", "orientacion afectiva"],
    challenges: ["dependencia", "defender sin discernir", "perder rumbo propio"],
    xolosArmyInterpretation:
      "Para xolosArmy, Itzcuintli es guia de red: acompanar, proteger accesos y mantener lealtad con conciencia."
  },
  {
    nahuatl: "Ozomatli",
    spanish: "Mono",
    keywords: ["arte", "juego", "ingenio"],
    shortMeaning: "Ozomatli despierta arte, humor e inteligencia creadora.",
    longMeaning:
      "Como Mono, este signo enlaza expresion, juego ritual, habilidad manual y creatividad capaz de revelar verdades sin solemnidad excesiva.",
    gifts: ["imaginacion", "destreza", "alegria inteligente"],
    challenges: ["burla hiriente", "evasividad", "convertir todo en juego"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Ozomatli abre espacio para crear herramientas, relatos y codigos que mantengan viva la identidad."
  },
  {
    nahuatl: "Malinalli",
    spanish: "Hierba",
    keywords: ["trenzado", "resistencia", "humildad"],
    shortMeaning: "Malinalli enseña fuerza humilde, trenzada desde abajo.",
    longMeaning:
      "Como Hierba, este signo habla de resistencia cotidiana, vida que vuelve a crecer y la potencia de lo que parece pequeño.",
    gifts: ["perseverancia", "servicio", "capacidad de recomponer"],
    challenges: ["enredarse", "resentimiento callado", "subestimar la propia fuerza"],
    xolosArmyInterpretation:
      "Para xolosArmy, Malinalli recuerda que la red se fortalece en tareas constantes, no solo en momentos visibles."
  },
  {
    nahuatl: "Acatl",
    spanish: "Cana",
    keywords: ["rectitud", "autoridad", "palabra firme"],
    shortMeaning: "Acatl ordena la palabra vertical y la responsabilidad publica.",
    longMeaning:
      "Como Cana, este signo representa eje, autoridad, claridad normativa y compromiso con una palabra que pueda sostenerse.",
    gifts: ["disciplina", "direccion", "capacidad de acordar"],
    challenges: ["rigidez", "autoritarismo", "confundir firmeza con dureza"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Acatl pide gobernanza clara, compromisos verificables y palabra alineada con accion."
  },
  {
    nahuatl: "Ocelotl",
    spanish: "Jaguar",
    keywords: ["noche", "valor", "territorio"],
    shortMeaning: "Ocelotl camina la noche con valor y presencia territorial.",
    longMeaning:
      "Como Jaguar, este signo se asocia con vision nocturna, defensa del territorio, silencio estrategico y fuerza interior.",
    gifts: ["coraje", "proteccion", "lectura de lo oculto"],
    challenges: ["aislamiento", "dominacion", "desconfianza excesiva"],
    xolosArmyInterpretation:
      "Para xolosArmy, Ocelotl protege el territorio cultural y digital con vigilancia, respeto y estrategia."
  },
  {
    nahuatl: "Cuauhtli",
    spanish: "Aguila",
    keywords: ["vision", "altura", "decision"],
    shortMeaning: "Cuauhtli eleva la mirada para decidir con amplitud.",
    longMeaning:
      "Como Aguila, este signo representa vision amplia, decision, ascenso de conciencia historica y capacidad de mirar el conjunto.",
    gifts: ["perspectiva", "liderazgo", "precision"],
    challenges: ["distancia emocional", "orgullo", "olvidar el suelo"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Cuauhtli ayuda a ver arquitectura, estrategia y horizonte sin desconectarse de la comunidad."
  },
  {
    nahuatl: "Cozcacuauhtli",
    spanish: "Buitre",
    keywords: ["purificacion", "reciclaje", "madurez"],
    shortMeaning: "Cozcacuauhtli transforma restos en continuidad de vida.",
    longMeaning:
      "Como Buitre, este signo enseña limpieza, madurez ante lo dificil y capacidad de convertir desgaste en aprendizaje util.",
    gifts: ["discernimiento", "paciencia", "sanacion de residuos"],
    challenges: ["cinismo", "quedarse en lo deteriorado", "mirar solo la perdida"],
    xolosArmyInterpretation:
      "Para xolosArmy, Cozcacuauhtli pide revisar errores, limpiar procesos y recuperar valor para la red."
  },
  {
    nahuatl: "Ollin",
    spanish: "Movimiento",
    keywords: ["movimiento", "cambio", "centro activo"],
    shortMeaning: "Ollin es Movimiento con centro: cambio que exige presencia.",
    longMeaning:
      "Como Movimiento, este signo representa el temblor de la vida, la transformacion historica y la necesidad de actuar sin perder el centro.",
    gifts: ["impulso transformador", "presencia", "capacidad de activar comunidad"],
    challenges: ["inestabilidad", "prisa", "moverse sin raiz"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Ollin convoca movimiento con memoria: activar la red, cuidar la identidad y caminar con proposito comunal."
  },
  {
    nahuatl: "Tecpatl",
    spanish: "Pedernal",
    keywords: ["corte", "verdad", "claridad"],
    shortMeaning: "Tecpatl corta lo confuso para revelar una verdad necesaria.",
    longMeaning:
      "Como Pedernal, este signo habla de precision, decision, sacrificio simbolico y claridad que puede incomodar pero ordena.",
    gifts: ["honestidad", "precision", "valor para decidir"],
    challenges: ["dureza", "juicio rapido", "cortar vinculos sin escucha"],
    xolosArmyInterpretation:
      "Para xolosArmy, Tecpatl pide decisiones limpias, auditoria de la palabra y cuidado al separar lo util de lo que estorba."
  },
  {
    nahuatl: "Quiahuitl",
    spanish: "Lluvia",
    keywords: ["bendicion", "tormenta", "renovacion"],
    shortMeaning: "Quiahuitl trae lluvia: prueba, alimento y renovacion.",
    longMeaning:
      "Como Lluvia, este signo representa descarga, fertilidad, cambio de clima y fuerza que puede limpiar o sacudir.",
    gifts: ["renovacion", "fertilidad de ideas", "capacidad de limpiar"],
    challenges: ["drama", "desborde", "esperar que todo llegue de fuera"],
    xolosArmyInterpretation:
      "En xolosArmy Network, Quiahuitl recuerda preparar suelo comunal para recibir recursos, crisis y oportunidades."
  },
  {
    nahuatl: "Xochitl",
    spanish: "Flor",
    keywords: ["belleza", "canto", "ofrenda"],
    shortMeaning: "Xochitl manifiesta belleza como ofrenda y memoria viva.",
    longMeaning:
      "Como Flor, este signo une canto, arte, celebracion, fragilidad y la obligacion de honrar lo bello sin poseerlo.",
    gifts: ["expresion", "ternura", "capacidad ceremonial"],
    challenges: ["vanidad", "fragilidad ante la critica", "confundir apariencia con ofrenda"],
    xolosArmyInterpretation:
      "Para xolosArmy, Xochitl invita a hacer visible la belleza de la identidad, el arte y la palabra compartida."
  }
] as const satisfies readonly TonalSignReading[];
