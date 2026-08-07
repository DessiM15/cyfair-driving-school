/**
 * Image manifest. Every photo is Pexels-licensed (free for commercial use, no
 * attribution required); credit is recorded anyway so it can be surfaced if the
 * owner wants to, and so each file can be traced back to its source.
 *
 * IMPORTANT: none of these people are Cy Fair staff or students. Never caption a
 * stock photo with a real person's name. See REPLACE-IMAGES.md for the shortlist
 * of slots that should become real photography before launch.
 */

export type ImageAsset = {
  src: string;
  w: number;
  h: number;
  /** Average colour, used as a placeholder background while the image loads. */
  color: string;
  altEn: string;
  altEs: string;
  credit: string;
  creditUrl: string;
};

export const images = {
  "teen-focused": { src: "/images/teen-focused.jpg", w: 6000, h: 4000, color: "#959AA0", altEn: "A teenage student driver focused on the road during a behind-the-wheel lesson", altEs: "Un estudiante adolescente concentrado en la carretera durante una clase de manejo", credit: "Ron Lach", creditUrl: "https://www.pexels.com/@ron-lach" },
  "teen-learning": { src: "/images/teen-learning.jpg", w: 6000, h: 4000, color: "#5A5E61", altEn: "A teen learning to drive, hands steady on the wheel", altEs: "Un adolescente aprendiendo a manejar, con las manos firmes en el volante", credit: "Ron Lach", creditUrl: "https://www.pexels.com/@ron-lach" },
  "teen-with-parent": { src: "/images/teen-with-parent.jpg", w: 6000, h: 4000, color: "#4D4E50", altEn: "A young driver at the wheel while an adult instructs from outside the car", altEs: "Un joven conductor al volante mientras un adulto le da instrucciones desde afuera", credit: "Ron Lach", creditUrl: "https://www.pexels.com/@ron-lach" },
  "teen-driver-woman": { src: "/images/teen-driver-woman.jpg", w: 6000, h: 4000, color: "#918F8A", altEn: "A young woman driving confidently, seen from inside the car", altEs: "Una joven manejando con confianza, vista desde el interior del auto", credit: "Gustavo Fring", creditUrl: "https://www.pexels.com/@gustavo-fring" },
  "teen-positive": { src: "/images/teen-positive.jpg", w: 6000, h: 4000, color: "#877060", altEn: "A cheerful young driver behind the wheel", altEs: "Una joven conductora sonriente al volante", credit: "Gustavo Fring", creditUrl: "https://www.pexels.com/@gustavo-fring" },
  "teen-city": { src: "/images/teen-city.jpg", w: 6000, h: 4000, color: "#979FA8", altEn: "A self-assured young driver navigating city streets", altEs: "Un joven conductor seguro de sí mismo manejando por la ciudad", credit: "Trần Long", creditUrl: "https://www.pexels.com/@tr-n-long-3093985" },
  "lesson-coaching": { src: "/images/lesson-coaching.jpg", w: 7952, h: 5304, color: "#3E3F41", altEn: "An instructor coaching a driver from the passenger seat on a sunny day", altEs: "Un instructor guiando a un conductor desde el asiento del pasajero en un día soleado", credit: "Dolores Reyes", creditUrl: "https://www.pexels.com/@doloresreri" },
  "lesson-discuss": { src: "/images/lesson-discuss.jpg", w: 6000, h: 4000, color: "#918C89", altEn: "An instructor and student talking through the controls before a lesson", altEs: "Un instructor y un estudiante repasando los controles antes de una clase", credit: "Gustavo Fring", creditUrl: "https://www.pexels.com/@gustavo-fring" },
  "lesson-passenger": { src: "/images/lesson-passenger.jpg", w: 6000, h: 4000, color: "#4E4F51", altEn: "An instructor seated in the passenger seat during behind-the-wheel training", altEs: "Un instructor sentado en el asiento del pasajero durante el entrenamiento de manejo", credit: "Ron Lach", creditUrl: "https://www.pexels.com/@ron-lach" },
  "lesson-pair": { src: "/images/lesson-pair.jpg", w: 6000, h: 4000, color: "#4B5453", altEn: "A view from the passenger seat as an instructor observes a student driving", altEs: "Vista desde el asiento del pasajero mientras un instructor observa a un estudiante manejar", credit: "the Amritdev", creditUrl: "https://www.pexels.com/@theamritdev" },
  "adult-man-city": { src: "/images/adult-man-city.jpg", w: 6240, h: 4160, color: "#635A51", altEn: "An adult driver focused on the road in city traffic", altEs: "Un conductor adulto concentrado en el tráfico de la ciudad", credit: "cottonbro studio", creditUrl: "https://www.pexels.com/@cottonbro" },
  "adult-woman-smile": { src: "/images/adult-woman-smile.jpg", w: 6000, h: 4000, color: "#85827D", altEn: "An adult driver smiling confidently behind the wheel", altEs: "Una conductora adulta sonriendo con confianza al volante", credit: "Gustavo Fring", creditUrl: "https://www.pexels.com/@gustavo-fring" },
  "adult-focused": { src: "/images/adult-focused.jpg", w: 8256, h: 5504, color: "#725D5A", altEn: "An adult student driver with both hands on the wheel", altEs: "Un estudiante adulto con ambas manos en el volante", credit: "Norma Mortenson", creditUrl: "https://www.pexels.com/@norma-mortenson" },
  "adult-dashboard": { src: "/images/adult-dashboard.jpg", w: 6016, h: 4016, color: "#747378", altEn: "An adult driver checking the dashboard before pulling away", altEs: "Un conductor adulto revisando el tablero antes de arrancar", credit: "Kampus Production", creditUrl: "https://www.pexels.com/@kampus" },
  "adult-professional": { src: "/images/adult-professional.jpg", w: 6000, h: 4000, color: "#696F7D", altEn: "An adult driver confidently handling the road on a sunny day", altEs: "Una conductora adulta manejando con confianza en un día soleado", credit: "Atlantic Ambience", creditUrl: "https://www.pexels.com/@freestockpro" },
  "adult-mirror": { src: "/images/adult-mirror.jpg", w: 6000, h: 4000, color: "#896D65", altEn: "A driver adjusting the rear-view mirror before setting off", altEs: "Una conductora ajustando el espejo retrovisor antes de arrancar", credit: "Gustavo Fring", creditUrl: "https://www.pexels.com/@gustavo-fring" },
  "adult-visor": { src: "/images/adult-visor.jpg", w: 7952, h: 5304, color: "#956A62", altEn: "A driver smiling, seat belt fastened, before setting off", altEs: "Un conductor sonriendo, con el cinturón abrochado, antes de arrancar", credit: "MUHAMMAD ZACK", creditUrl: "https://www.pexels.com/@muhammad-zack-706122725" },
  "class-diverse": { src: "/images/class-diverse.jpg", w: 6000, h: 4000, color: "#B6956A", altEn: "A diverse group of students in a classroom session with their instructor", altEs: "Un grupo diverso de estudiantes en una clase con su instructor", credit: "Yan Krukau", creditUrl: "https://www.pexels.com/@yankrukov" },
  "class-helping": { src: "/images/class-helping.jpg", w: 6720, h: 4480, color: "#A78A87", altEn: "An instructor guiding a teenage student through coursework", altEs: "Un instructor guiando a un estudiante adolescente en su tarea", credit: "https://kaboompics.com/", creditUrl: "https://www.pexels.com/@karola-g" },
  "class-group": { src: "/images/class-group.jpg", w: 6589, h: 4392, color: "#AEADAD", altEn: "Students paying attention during a classroom lesson", altEs: "Estudiantes atentos durante una clase teórica", credit: "Andy Barbour", creditUrl: "https://www.pexels.com/@andy-barbour" },
  "class-lecture": { src: "/images/class-lecture.jpg", w: 6720, h: 4480, color: "#B1A297", altEn: "Students listening during a driver education lecture", altEs: "Estudiantes escuchando durante una clase de educación vial", credit: "RDNE Stock project", creditUrl: "https://www.pexels.com/@rdne" },
  "class-teacher": { src: "/images/class-teacher.jpg", w: 6016, h: 4016, color: "#948F8B", altEn: "An instructor leading a class of adult learners", altEs: "Una instructora dirigiendo una clase de estudiantes adultos", credit: "Pavel Danilyuk", creditUrl: "https://www.pexels.com/@pavel-danilyuk" },
  "class-student": { src: "/images/class-student.jpg", w: 6109, h: 4073, color: "#867969", altEn: "A student taking notes during a classroom session", altEs: "Una estudiante tomando apuntes durante la clase", credit: "cottonbro studio", creditUrl: "https://www.pexels.com/@cottonbro" },
  "detail-wheel-a": { src: "/images/detail-wheel-a.jpg", w: 6000, h: 4000, color: "#757F81", altEn: "Close-up of a driver's hand on the steering wheel", altEs: "Primer plano de la mano de un conductor en el volante", credit: "Leon Kohle", creditUrl: "https://www.pexels.com/@leon-kohle-3158283" },
  "detail-wheel-b": { src: "/images/detail-wheel-b.jpg", w: 7008, h: 4672, color: "#4C3E35", altEn: "Hands on the steering wheel in warm afternoon light", altEs: "Manos en el volante bajo la cálida luz de la tarde", credit: "Nathan J Hilton", creditUrl: "https://www.pexels.com/@nathanjhilton" },
  "detail-wheel-c": { src: "/images/detail-wheel-c.jpg", w: 6000, h: 4000, color: "#554B49", altEn: "A driver's hands positioned correctly on the wheel", altEs: "Las manos de un conductor correctamente colocadas en el volante", credit: "Joel Gundi", creditUrl: "https://www.pexels.com/@joegun" },
  "detail-interior": { src: "/images/detail-interior.jpg", w: 6000, h: 4000, color: "#686A69", altEn: "The interior of a training vehicle, steering wheel and dashboard", altEs: "El interior de un vehículo de práctica, volante y tablero", credit: "Daniel Andraski", creditUrl: "https://www.pexels.com/@daniel-andraski-197681005" },
  "detail-wheel-d": { src: "/images/detail-wheel-d.jpg", w: 7008, h: 4672, color: "#524F4A", altEn: "Hands resting on the wheel of a clean, well-kept car interior", altEs: "Manos sobre el volante en un interior limpio y bien cuidado", credit: "Luke Miller", creditUrl: "https://www.pexels.com/@bylukemiller" },
  "detail-grip": { src: "/images/detail-grip.jpg", w: 6240, h: 4160, color: "#262729", altEn: "A close view of a confident grip on the steering wheel", altEs: "Vista cercana de un agarre firme en el volante", credit: "Leszek Czyzewski", creditUrl: "https://www.pexels.com/@leszek-czyzewski-259819851" },
  "houston-heights": { src: "/images/houston-heights.jpg", w: 6720, h: 4480, color: "#C0BCB0", altEn: "Colorful homes in the Houston Heights neighborhood, Texas", altEs: "Casas coloridas en el vecindario Houston Heights, Texas", credit: "Diego Ramirez", creditUrl: "https://www.pexels.com/@diego-ramirez-67120349" },
  "texas-highway": { src: "/images/texas-highway.jpg", w: 6000, h: 4000, color: "#92928C", altEn: "Traffic moving along a Texas highway under a wide sky", altEs: "Tráfico avanzando por una autopista de Texas bajo un cielo amplio", credit: "Mizzu  Cho", creditUrl: "https://www.pexels.com/@nicetomizzu" },
  "texas-open-road": { src: "/images/texas-open-road.jpg", w: 8256, h: 5504, color: "#888892", altEn: "An open road stretching to the horizon under a wide Texas sky", altEs: "Una carretera abierta que se extiende hacia el horizonte bajo el amplio cielo de Texas", credit: "邱潼 Q", creditUrl: "https://www.pexels.com/@q-272684297" },
  "suburb-quiet": { src: "/images/suburb-quiet.jpg", w: 6240, h: 4160, color: "#5F7F8A", altEn: "A quiet suburban neighborhood street", altEs: "Una calle tranquila de un vecindario suburbano", credit: "Robert So", creditUrl: "https://www.pexels.com/@robertkso" },
  "suburb-homes": { src: "/images/suburb-homes.jpg", w: 6016, h: 4016, color: "#909495", altEn: "A quiet suburban street lined with homes and trees", altEs: "Una calle suburbana tranquila bordeada de casas y árboles", credit: "Stephen Andrews", creditUrl: "https://www.pexels.com/@stephentcandrews" },
  "suburb-flag": { src: "/images/suburb-flag.jpg", w: 6000, h: 4000, color: "#79726C", altEn: "An American flag in a quiet suburban neighborhood", altEs: "Una bandera estadounidense en un vecindario suburbano tranquilo", credit: "Charles Criscuolo", creditUrl: "https://www.pexels.com/@onetrillionpixels" },
  "road-sign": { src: "/images/road-sign.jpg", w: 6000, h: 4000, color: "#6F95BC", altEn: "A rural intersection with a stop sign under an open sky", altEs: "Un cruce rural con una señal de alto bajo un cielo despejado", credit: "Mahabub Shaariief Shaik", creditUrl: "https://www.pexels.com/@mahabub1144" },
  "traffic-lights": { src: "/images/traffic-lights.jpg", w: 9504, h: 6336, color: "#365768", altEn: "A city traffic signal and street sign in clear daylight", altEs: "Un semáforo y un letrero de calle a plena luz del día", credit: "david hou", creditUrl: "https://www.pexels.com/@david-hou-1637526441" },
  "car-white": { src: "/images/car-white.jpg", w: 6000, h: 4000, color: "#53594D", altEn: "A clean sedan parked on a sunny residential street", altEs: "Un sedán limpio estacionado en una calle residencial soleada", credit: "Mike Bird", creditUrl: "https://www.pexels.com/@mikebird" },
  "car-parked": { src: "/images/car-parked.jpg", w: 6139, h: 4071, color: "#3C3D3F", altEn: "A sedan parked at the curb, ready for a lesson", altEs: "Un sedán estacionado en la acera, listo para una clase", credit: "daydream", creditUrl: "https://www.pexels.com/@daydream-753072845" },
  "car-lot": { src: "/images/car-lot.jpg", w: 6000, h: 4000, color: "#5A5855", altEn: "A clean sedan parked and ready for a lesson", altEs: "Un sedán limpio estacionado y listo para una clase", credit: "Alex  ", creditUrl: "https://www.pexels.com/@rpm8k" },
  "keys-milestone": { src: "/images/keys-milestone.jpg", w: 6000, h: 4000, color: "#94928F", altEn: "A new driver holding her car keys after passing", altEs: "Una nueva conductora sosteniendo las llaves de su auto después de aprobar", credit: "AI25.Studio  Studio", creditUrl: "https://www.pexels.com/@ai25studioai" },
} as const satisfies Record<string, ImageAsset>;

export type ImageSlot = keyof typeof images;

export const heroVideo = {
  mp4: "/video/hero.mp4",
  mp4Mobile: "/video/hero-mobile.mp4",
  poster: "/images/hero-poster.jpg",
} as const;

/** Pick an image's alt text for the active locale. */
export function imageAlt(slot: ImageSlot, lang: "en" | "es"): string {
  const img = images[slot];
  return lang === "es" ? img.altEs : img.altEn;
}
