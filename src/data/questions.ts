export interface Question {
  id: number;
  topic: 'ataques' | 'passwords' | 'malware' | 'redes' | 'social';
  topicLabel: string;
  difficulty: 'Baja' | 'Media' | 'Alta';
  question: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
  tip: string;
  protocol: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export const TOPICS = [
  { id: 'all', label: 'Todos los temas', icon: '⚡' },
  { id: 'ataques', label: 'Ataques Web & Phishing', icon: '🌐' },
  { id: 'passwords', label: 'Contraseñas & MFA', icon: '🔑' },
  { id: 'malware', label: 'Malware & Ransomware', icon: '🛡️' },
  { id: 'redes', label: 'Seguridad en Redes & Wi-Fi', icon: '📡' },
  { id: 'social', label: 'Ingeniería Social & Privacidad', icon: '🕵️' },
] as const;

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-phishing',
    title: 'Detector de Phishing',
    description: 'Detecta ataques por correo y suplantación',
    icon: '🎣',
    unlocked: false,
  },
  {
    id: 'badge-vault',
    title: 'Bóveda Criptográfica',
    description: 'Domina contraseñas robustas y MFA',
    icon: '🛡️',
    unlocked: false,
  },
  {
    id: 'badge-streak',
    title: 'Firewall Imparable',
    description: 'Racha de 3 aciertos seguidos sin fallar',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'badge-hunter',
    title: 'Cazador de Exploits',
    description: 'Neutraliza ataques de inyección SQL y XSS',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: 'badge-flawless',
    title: 'Escudo Impenetrable',
    description: 'Termina una ronda completa con todos los escudos',
    icon: '🏆',
    unlocked: false,
  }
];

export const QUESTIONS_DB: Question[] = [
  {
    id: 1,
    topic: 'ataques',
    topicLabel: 'Ataques Web & Phishing',
    difficulty: 'Baja',
    question: '1. ¿Qué es el Phishing?',
    options: [
      'Un juego de pesca en línea',
      'Engaño por correo para robar datos',
      'Un antivirus instalado en el servidor',
      'Un tipo de monitor de alta resolución'
    ],
    correct: 1,
    hint: 'Es una técnica de ingeniería social que suplanta identidades de entidades confiables.',
    explanation: 'El Phishing es un ataque de ingeniería social diseñado para engañar a los usuarios haciéndose pasar por una entidad de confianza (bancos, servicios) y sustraer contraseñas o información confidencial.',
    tip: 'Verifica siempre el dominio del remitente y desconfía de mensajes que exigen acción urgente o amenazan con suspender tu cuenta.',
    protocol: 'MITRE ATT&CK T1566'
  },
  {
    id: 2,
    topic: 'passwords',
    topicLabel: 'Contraseñas & MFA',
    difficulty: 'Baja',
    question: '2. ¿Qué es una contraseña segura?',
    options: [
      '123456',
      'Tu nombre',
      'Combinación de letras, números y símbolos',
      'Tu fecha de nacimiento'
    ],
    correct: 2,
    hint: 'Debe tener longitud suficiente y variedad de caracteres sin patrones predecibles.',
    explanation: 'Una contraseña segura debe contener al menos 12 a 16 caracteres combinando letras mayúsculas, minúsculas, números y símbolos especiales, o una frase de contraseña ("passphrase") única y aleatoria.',
    tip: 'Nunca reutilices la misma contraseña en diferentes plataformas; si una sufre una fuga, todas tus cuentas quedan comprometidas.',
    protocol: 'NIST SP 800-63B'
  },
  {
    id: 3,
    topic: 'ataques',
    topicLabel: 'Ataques Web & Inyección',
    difficulty: 'Alta',
    question: '3. ¿En qué consiste un ataque de inyección SQL (SQLi)?',
    options: [
      'Insertar comandos maliciosos en campos de entrada para manipular consultas a la base de datos',
      'Descargar un archivo de música comprimido',
      'Cambiar el fondo de pantalla del servidor',
      'Sobrecargar la memoria RAM mediante pestañas abiertas del navegador'
    ],
    correct: 0,
    hint: 'Afecta la forma en que una aplicación interpreta las entradas de texto del usuario frente al motor de base de datos.',
    explanation: 'La inyección SQL ocurre cuando datos proporcionados por el usuario no son validados ni parametrizados, permitiendo al atacante ejecutar sentencias SQL arbitrarias para leer, modificar o borrar información privada.',
    tip: 'La defensa principal contra SQLi es el uso riguroso de Consultas Parametrizadas (Prepared Statements) y ORMs seguros.',
    protocol: 'OWASP Top 10: A03:2021-Injection'
  },
  {
    id: 4,
    topic: 'passwords',
    topicLabel: 'Contraseñas & Autenticación',
    difficulty: 'Media',
    question: '4. ¿Por qué es fundamental activar el Doble Factor de Autenticación (MFA/2FA)?',
    options: [
      'Para acelerar el inicio de sesión sin necesidad de ingresar ninguna clave',
      'Porque si tu contraseña es robada, el atacante aún requerirá el segundo factor de seguridad temporal',
      'Para que el navegador descargue actualizaciones en segundo plano',
      'Reemplaza totalmente la necesidad de tener actualizado el sistema operativo'
    ],
    correct: 1,
    hint: 'Se basa en combinar "algo que sabes" (contraseña) con "algo que tienes" (código en app o llave física).',
    explanation: 'El MFA bloquea más del 99% de los ataques automatizados de robo de credenciales, ya que una clave filtrada resulta inútil sin el token temporal o confirmación física del titular.',
    tip: 'Prioriza aplicaciones autenticadoras (TOTP como Google Authenticator) o llaves de seguridad FIDO2 antes que códigos vía SMS.',
    protocol: 'NIST SP 800-63B'
  },
  {
    id: 5,
    topic: 'malware',
    topicLabel: 'Malware & Ransomware',
    difficulty: 'Media',
    question: '5. ¿Qué es el Ransomware y cuál es su objetivo principal?',
    options: [
      'Un cable de red defectuoso que produce cortes intermitentes',
      'Malware que cifra los archivos del sistema y exige un rescate monetario para descifrarlos',
      'Una extensión para bloquear anuncios molestos',
      'Un proceso oficial de Windows para desfragmentar el disco'
    ],
    correct: 1,
    hint: 'La palabra inglesa "ransom" se traduce literalmente como "rescate".',
    explanation: 'El Ransomware infecta un dispositivo o servidor, cifra archivos esenciales mediante algoritmos criptográficos robustos y extorsiona a la víctima solicitando pagos en criptomonedas para proporcionar la clave.',
    tip: 'Aplica la regla de copias de seguridad 3-2-1 (3 copias, 2 medios distintos, 1 fuera de línea inmutable) para recuperarte sin pagar extorsiones.',
    protocol: 'CISA Ransomware Guide'
  },
  {
    id: 6,
    topic: 'redes',
    topicLabel: 'Seguridad en Redes & Wi-Fi',
    difficulty: 'Media',
    question: '6. ¿Cuál es el principal riesgo de conectarse a una red Wi-Fi pública abierta sin protección?',
    options: [
      'La batería de tu teléfono se agota en la mitad de tiempo',
      'Ataques Man-in-the-Middle (MitM) e intercepción de tráfico de red no cifrado',
      'El procesador se daña físicamente por exceso de calor',
      'Tu cámara web se enciende físicamente y no se puede apagar'
    ],
    correct: 1,
    hint: 'En una red sin aislamiento, otros usuarios en el mismo canal inalámbrico pueden capturar los paquetes que transmites.',
    explanation: 'En redes abiertas, atacantes pueden situarse entre tu dispositivo y el enrutador ("Man-in-the-Middle"), capturar credenciales no cifradas o redirigirte a páginas web falsas.',
    tip: 'Utiliza una red privada virtual (VPN) confiable si debes usar redes públicas y nunca apruebes avisos de certificados TLS inválidos.',
    protocol: 'Wi-Fi Alliance WPA3 Standard'
  },
  {
    id: 7,
    topic: 'malware',
    topicLabel: 'Malware & Troyanos',
    difficulty: 'Media',
    question: '7. ¿En qué se diferencia un Caballo de Troya (Troyano) de un Virus tradicional?',
    options: [
      'El troyano se disfraza de programa legítimo o útil para engañar al usuario y que lo ejecute',
      'El troyano solo puede infectar impresoras y teclados físicos',
      'El troyano limpia la memoria RAM automáticamente',
      'No hay ninguna diferencia, son exactamente el mismo tipo de archivo'
    ],
    correct: 0,
    hint: 'Al igual que en el relato mitológico griego, se presenta como un regalo inofensivo.',
    explanation: 'Un troyano aparenta ser software legítimo (un juego pirata, un supuesto acelerador o crack), pero al ejecutarse abre puertas traseras (backdoors) o instala ladrones de información (infostealers).',
    tip: 'Descarga software únicamente desde repositorios oficiales o tiendas verificadas y desconfía de "cracks" o ejecutables desconocidos.',
    protocol: 'MITRE ATT&CK T1204'
  },
  {
    id: 8,
    topic: 'social',
    topicLabel: 'Ingeniería Social',
    difficulty: 'Baja',
    question: '8. ¿Qué es el "Smishing"?',
    options: [
      'Un deporte acuático de invierno',
      'Phishing realizado específicamente a través de mensajes de texto (SMS) en teléfonos móviles',
      'El sonido que hace un disco duro cuando se rompe',
      'Una técnica para enfriar servidores en centros de datos'
    ],
    correct: 1,
    hint: 'Combina las siglas "SMS" y "Phishing".',
    explanation: 'El Smishing es una variante del Phishing que utiliza mensajes SMS con enlaces maliciosos simulando entregas de paquetes pendientes, alertas bancarias o premios para robar datos o instalar malware.',
    tip: 'Nunca pulses en enlaces que lleguen por SMS de números no verificados. Accede siempre directamente desde la app oficial del servicio.',
    protocol: 'NIST Special Publication'
  },
  {
    id: 9,
    topic: 'ataques',
    topicLabel: 'Ataques Web & XSS',
    difficulty: 'Alta',
    question: '9. ¿Qué es el ataque de Cross-Site Scripting (XSS)?',
    options: [
      'Inyectar scripts maliciosos de JavaScript en páginas web vistas por otros usuarios',
      'Desconectar el cable Ethernet del router',
      'Imprimir hojas en blanco desde una impresora remota',
      'Cambiar el brillo de la pantalla del cliente'
    ],
    correct: 0,
    hint: 'Permite que código JavaScript no autorizado se ejecute en el navegador de la víctima en el contexto de un sitio legítimo.',
    explanation: 'XSS permite a los atacantes inyectar código en el lado del cliente (normalmente JavaScript). Cuando otras víctimas visitan la página afectada, el script roba cookies de sesión o ejecuta acciones en su nombre.',
    tip: 'Para prevenir XSS se debe codificar/escapar rigurosamente la salida de datos y aplicar políticas Content Security Policy (CSP).',
    protocol: 'OWASP Top 10: A03:2021'
  },
  {
    id: 10,
    topic: 'redes',
    topicLabel: 'Cifrado & HTTPS',
    difficulty: 'Baja',
    question: '10. ¿Qué garantiza que un sitio web use el protocolo HTTPS y muestre el candado?',
    options: [
      'Que el sitio es 100% legal y que nunca intentará engañarte',
      'Que la comunicación entre tu navegador y el servidor viaja cifrada y autenticada mediante TLS',
      'Que el sitio fue verificado personalmente por la policía cibernética',
      'Que tu ordenador nunca podrá contagiarse de virus navegando allí'
    ],
    correct: 1,
    hint: 'La "S" en HTTPS corresponde a "Secure" y se refiere al túnel cifrado entre cliente y servidor.',
    explanation: 'HTTPS asegura confidencialidad e integridad: nadie entre tu navegador y el servidor puede leer o alterar los datos transmitidos en texto plano. No obstante, un sitio malicioso también puede tener HTTPS.',
    tip: 'El candado significa que el canal está cifrado, pero aún debes verificar que el dominio corresponda a la entidad legítima.',
    protocol: 'IETF RFC 8446 (TLS 1.3)'
  },
  {
    id: 11,
    topic: 'malware',
    topicLabel: 'Vulnerabilidades',
    difficulty: 'Alta',
    question: '11. ¿A qué se le denomina una vulnerabilidad "Zero-Day" (Día Cero)?',
    options: [
      'Un fallo de seguridad conocido por atacantes pero para el cual aún no existe un parche oficial disponible',
      'Un día al año donde todo el software es gratuito',
      'Un virus que borra el reloj del sistema',
      'Un corte de energía programado en un centro de datos'
    ],
    correct: 0,
    hint: 'Los desarrolladores tienen "cero días" de ventaja para remediarlo antes de que pueda ser explotado.',
    explanation: 'Una vulnerabilidad de día cero es un fallo de seguridad desconocido para el fabricante o para el cual todavía no se ha publicado una actualización de seguridad.',
    tip: 'Mantén todos tus sistemas operativos y aplicaciones actualizados para reducir la ventana de exposición a fallos recién descubiertos.',
    protocol: 'MITRE CVE & CWE'
  },
  {
    id: 12,
    topic: 'social',
    topicLabel: 'Privacidad & Huella Digital',
    difficulty: 'Media',
    question: '12. ¿Por qué compartir fotos de billetes de avión o tarjetas de embarque en redes sociales es un grave riesgo?',
    options: [
      'Porque la aerolínea cancela tu vuelo por derechos de autor',
      'Porque los códigos de barras y datos del billete permiten acceder a tu reserva, pasaporte y datos personales',
      'Porque ocupa demasiado espacio en el servidor de la red social',
      'No supone ningún riesgo si la foto tiene buena resolución'
    ],
    correct: 1,
    hint: 'Los códigos QR y códigos de barras impresos contienen tu código de reserva (PNR) y datos biográficos.',
    explanation: 'Los códigos de barras de las tarjetas de embarque contienen el localizador PNR y datos con los que un atacante puede acceder a la gestión de tu vuelo, ver números de pasaporte o cancelar reservas.',
    tip: 'Nunca publiques imágenes de documentos de viaje, carnets de conducir o tarjetas bancarias, ni siquiera tapando parte del número.',
    protocol: 'OSINT & Privacidad Personal'
  }
];

export function getRankByScore(score: number): { title: string; color: string; level: number } {
  if (score >= 600) return { title: 'CISO Defensor Supremo', color: 'text-amber-400', level: 5 };
  if (score >= 400) return { title: 'Hacker Ético Elite', color: 'text-emerald-400', level: 4 };
  if (score >= 250) return { title: 'Analista SOC II', color: 'text-cyan-400', level: 3 };
  if (score >= 120) return { title: 'Analista SOC Jr', color: 'text-blue-400', level: 2 };
  return { title: 'Novato SOC', color: 'text-slate-300', level: 1 };
}
