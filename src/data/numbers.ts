export type RitualNumberReading = {
  readonly number: number;
  readonly meaning: string;
  readonly energy: string;
  readonly challenge: string;
};

export const ritualNumbers = [
  {
    number: 1,
    meaning: "Inicio, semilla y primer paso dentro del tejido del tiempo sagrado.",
    energy: "Concentracion para abrir camino con responsabilidad.",
    challenge: "No confundir comienzo con aislamiento."
  },
  {
    number: 2,
    meaning: "Dualidad, encuentro y tension creadora entre fuerzas complementarias.",
    energy: "Escucha, espejo y acuerdo.",
    challenge: "Evitar quedar detenido por la indecision."
  },
  {
    number: 3,
    meaning: "Movimiento inicial que organiza relacion, palabra y accion.",
    energy: "Articulacion de proposito.",
    challenge: "No dispersar la fuerza en demasiadas direcciones."
  },
  {
    number: 4,
    meaning: "Base, rumbo y estabilidad en los cuatro lados del mundo.",
    energy: "Orden territorial y constancia.",
    challenge: "No volver rigida la estructura."
  },
  {
    number: 5,
    meaning: "Centro humano, cuerpo que decide y sostiene memoria.",
    energy: "Presencia encarnada y responsabilidad personal.",
    challenge: "No poner el deseo individual por encima del bien comun."
  },
  {
    number: 6,
    meaning: "Trabajo compartido, reciprocidad y tejido de comunidad.",
    energy: "Cooperacion concreta.",
    challenge: "Cuidar que el servicio no se convierta en desgaste invisible."
  },
  {
    number: 7,
    meaning: "Cruce entre profundidad y altura, pregunta y vision.",
    energy: "Reflexion, estudio y lectura de senales.",
    challenge: "No perder el contacto con la accion."
  },
  {
    number: 8,
    meaning: "Equilibrio, medida y justicia dentro del intercambio.",
    energy: "Ajuste fino y reciprocidad.",
    challenge: "No reducir la justicia a calculo frio."
  },
  {
    number: 9,
    meaning: "Memoria profunda, gestacion y fuerza que madura en silencio.",
    energy: "Paciencia, cuidado interno y continuidad.",
    challenge: "No encerrarse en lo no dicho."
  },
  {
    number: 10,
    meaning: "Manifestacion publica de lo trabajado en comunidad.",
    energy: "Responsabilidad visible.",
    challenge: "Evitar la apariencia sin base."
  },
  {
    number: 11,
    meaning: "Fuerza de ajuste, tension y aprendizaje por movimiento.",
    energy: "Correccion, flexibilidad y revision.",
    challenge: "No convertir la tension en ruptura innecesaria."
  },
  {
    number: 12,
    meaning: "Comunidad extendida, red de obligaciones y memoria compartida.",
    energy: "Organizacion colectiva.",
    challenge: "No diluir la responsabilidad personal en el grupo."
  },
  {
    number: 13,
    meaning: "Cierre alto del ciclo, elevacion y entrega de lo aprendido.",
    energy: "Culminacion, vision madura y paso hacia otro comienzo.",
    challenge: "No tratar la culminacion como destino absoluto."
  }
] as const satisfies readonly RitualNumberReading[];
