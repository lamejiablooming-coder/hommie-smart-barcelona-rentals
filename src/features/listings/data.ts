import { Listing, Visit } from "@/shared/types";

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: "flat-1",
    price: 1450,
    neighborhood: "Gràcia",
    origin: "Idealista",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX0n0WFBON0DCvAUzknQ55aAmT_jH-eyz6orPlDQxebWnIKaXLlox2TuV87SjXRAoBYZx8unL-paZCOiUfVdEPeUD-nru5HvVn6VXejUPBUbDrOn36a8XQFO9IqrClWwCiKlsKVwwJufP1IpEd32JraoDpLW5cIIGgv6NXaSMKn8j9AuAI7uswONNkUcuLI31CV15az91OMOj6UUIvCHZEYX3Ck90CfeJdXJkKMp22vDz0z8KyHouPjRm-Sloe1QHRc0T0145--M8",
    securityScore: 94,
    securityReasons: "Coherencia de precio perfecta con la zona de Gràcia. Propietario con identidad validada en Registro Inmobiliario de Barcelona y fianza de 1 mes depositada en INCASÒL garantizada.",
    pros: [
      "Recién reformado con materiales premium",
      "Suelos de parqué y vigas de madera vistas",
      "Mucha luz natural — orientación sur"
    ],
    cons: [
      "Finca antigua sin ascensor (segundo piso)",
      "Balcón pequeño hacia calle peatonal concurrida"
    ],
    description: "Precioso piso totalmente amueblado de 65m² en la Vila de Gràcia. Equipado con electrodomésticos eficientes A+++ y aire acondicionado.",
    isSaved: false,
    type: "Piso",
    size: 65,
    rooms: 2
  },
  {
    id: "flat-2",
    price: 2100,
    neighborhood: "Eixample Dret",
    origin: "Fotocasa",
    imageUrl: "/src/assets/images/eixample_penthouse_interior_1784582356140.jpg",
    securityScore: 89,
    securityReasons: "Agencia oficial registrada en AICAT. El precio es ligeramente superior a la media pero justificado por la terraza privativa de 20m². Contrato de 5 años LAU.",
    pros: [
      "Terraza privada de 20m² con vistas a la ciudad",
      "Suite principal con vestidor integrado",
      "Finca señorial con ascensor y conserjería"
    ],
    cons: [
      "Ruido exterior por cercanía a Gran Via",
      "Fianza de 2 meses exigida por la propiedad"
    ],
    description: "Ático exclusivo de 85m² en chaflán clásico del Eixample. Techos altos con bóveda catalana y diseño de interiores nórdico minimalista.",
    isSaved: false,
    type: "Ático",
    size: 85,
    rooms: 2
  },
  {
    id: "flat-3",
    price: 1800,
    neighborhood: "Poblenou",
    origin: "Habitaclia",
    imageUrl: "/src/assets/images/loft_interior_clean_1784493968497.jpg",
    securityScore: 91,
    securityReasons: "Suministros ya dados de alta y verificados. Sin cargas administrativas pendientes. Edificio industrial reconvertido legalmente con cédula de habitabilidad vigente.",
    pros: [
      "Diseño tipo loft industrial con techos de 4m",
      "Cocina de isla de mármol de alta gama",
      "A 5 minutos a pie de la playa del Bogatell"
    ],
    cons: [
      "Garaje no incluido en el edificio (opcional a 120€)",
      "Poca división de espacios (ideal para solteros/parejas)"
    ],
    description: "Loft de diseño industrial de 90m² diáfanos. Aire acondicionado por conductos, grandes ventanales de doble acristalamiento acústico y térmico.",
    isSaved: false,
    type: "Loft",
    size: 90,
    rooms: 1
  }
];

export const INITIAL_VISITS: Visit[] = [
  {
    id: "visit-1",
    listingId: "flat-2",
    listingTitle: "Carrer de Provença, 214",
    neighborhood: "Eixample Dret",
    date: "12 OCT",
    time: "17:30",
    status: "Confirmado",
    agent: "Marc Sala"
  },
  {
    id: "visit-2",
    listingId: "flat-3",
    listingTitle: "Carrer de Pujades, 98",
    neighborhood: "Poblenou",
    date: "14 OCT",
    time: "11:00",
    status: "Pendiente",
    agent: "Elena Bosch"
  }
];

export const VISIT_TIPS = [
  {
    title: "Comprueba la presión del agua",
    desc: "Abre los grifos de la ducha y el lavabo al mismo tiempo para verificar que no pierda presión."
  },
  {
    title: "Pregunta por los gastos de comunidad",
    desc: "Asegúrate de si el precio mensual incluye el IBI y los gastos de comunidad de vecinos."
  },
  {
    title: "Revisa la orientación solar",
    desc: "Las orientaciones Sur y Este garantizan luz natural la mayor parte del día, reduciendo calefacción."
  }
];
