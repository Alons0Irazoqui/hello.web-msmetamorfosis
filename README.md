# Metamorfosis Producciones y Eventos — Brief de Diseño y Desarrollo (Landing Page)

Este documento es el **brief oficial** para el desarrollo de la landing page de **Metamorfosis Producciones y Eventos**. Contiene toda la información de marca, negocio, estilo visual y requisitos funcionales necesarios para construir la página.

El proyecto parte de una **plantilla base en HTML** que ya recibió un prompt inicial de ajuste. A partir de aquí, el desarrollador debe seguir iterando sobre esa base (con ayuda de Claude) hasta alcanzar el resultado descrito en este documento.

---

## 1. Resumen del proyecto

- **Tipo de entregable:** Landing page (una sola página, multi-sección, con scroll).
- **Base técnica:** Plantilla HTML existente + prompt inicial ya aplicado. No se parte de cero.
- **Forma de trabajo:** Desarrollo iterativo con Claude (Claude Code). El desarrollador irá dando instrucciones sucesivas a Claude sobre esta misma base hasta lograr el resultado final.
- **Objetivo de negocio:** Presentar a Metamorfosis como una productora de eventos profesional, versátil y de alto nivel, capaz de atender tanto eventos sociales como activaciones corporativas/masivas, y generar contacto (WhatsApp/teléfono/redes) desde la landing.

---

## 2. Sobre el negocio

**Nombre comercial:** Metamorfosis Producciones y Eventos
**Slogan de marca:** *"Transformamos momentos en experiencias inolvidables"*

Somos una productora de eventos que está iniciando operaciones. Cubrimos dos grandes líneas de negocio:

### A. Eventos sociales
- Baby shower
- Revelaciones de género
- XV años / 16 años
- Bodas

### B. Eventos corporativos / masivos
- Activación de promociones para negocios y marcas
- Eventos empresariales
- Expos
- Eventos masivos

### Servicios y talento humano disponible
La empresa ofrece o coordina el siguiente talento y servicios para cualquiera de los dos tipos de evento:

- Animadores
- Gogós / Bailarinas
- Edecanes
- Zanqueros
- Botargas (mascotas)
- Performances
- DJ
- Promotores
- Volanteros
- Demostradoras
- Meseros
- Batucadas
- Payasos
- Sonido
- Iluminación
- Carpas
- Efectos visuales

> **Nota para el desarrollador:** esta lista de servicios es el contenido natural para una sección tipo "Nuestros servicios" u otra (pueden ir combinadas o separadas, a criterio de diseño).

### Contacto y redes sociales
- **Teléfono / WhatsApp:** +52 55 7006 1386
- **TikTok:** [@msmetamorfosis](https://www.tiktok.com/@msmetamorfosis)
- **Instagram:** [@Msmetamorfosis27](https://www.instagram.com/Msmetamorfosis27)
- **Facebook:** MSNetamorfosis

Estos datos deben estar visibles en el header/footer y en una sección de contacto con botones directos (click-to-call y click-to-WhatsApp).

---

## 3. Identidad de marca (análisis del logo)

El archivo `imagenes/logo.jpeg` es el logo oficial actual del negocio. Del análisis visual del logo se extrae la siguiente identidad de marca:

- **Monograma:** "MS" estilizado en forma de listón/ala, enmarcado en un círculo con textura tipo pedrería/diamantes.
- **Tipografía principal (nombre):** script/caligráfica ornamentada ("Metamorfosis").
- **Tipografía secundaria (subtítulo/slogan):** serif/sans con letter-spacing amplio en mayúsculas ("PRODUCCIONES Y EVENTOS", "TRANSFORMAMOS MOMENTOS EN EXPERIENCIAS INOLVIDABLES").
- **Acabado:** efecto metálico 3D (rosa/oro rosa), brillos, destellos tipo glitter, fondo con degradado rosa-blanco.
- **Personalidad de marca:** elegante, femenino, glamoroso, celebratorio, aspiracional/premium.

### Paleta de colores sugerida (extraída del logo)

| Color | Hex aproximado | Uso sugerido |
|---|---|---|
| Magenta / Fucsia profundo | `#B8206E` | Color primario de marca, CTAs, acentos fuertes |
| Rosa oro (rose gold) | `#D3A0A0` | Detalles, íconos, líneas decorativas, hover states |
| Rosa blush claro | `#F6D6E3` | Fondos de sección alternos, degradados suaves |
| Blanco marfil | `#FFFBF9` | Fondo base, espacios en blanco |
| Vino / ciruela oscuro | `#5C1338` | Textos de alto contraste, footer, modo oscuro |
| Dorado acento | `#D8B26B` | Detalles finos, líneas, bordes, micro-highlights |

> Estos valores son una referencia visual fiel al logo. El desarrollador puede afinar los tonos exactos usando un selector de color (color picker) directamente sobre `imagenes/logo.jpeg` para pixel-perfect accuracy, siempre respetando esta gama rosa/magenta/oro rosa como identidad cromática central.

### Importante: el logo actual necesita edición
El archivo `imagenes/logo.jpeg` **viene con fondo** (degradado rosa con brillos). Antes de usarlo en la web:

1. Quitar el fondo del logo (dejarlo en PNG con fondo transparente).

---

## 4. Dirección de estilo y diseño

El estilo visual de la landing **no debe copiar literalmente** la estética recargada/brillante del logo (glitter, texturas 3D). En su lugar, se debe **traducir esa identidad de marca (rosa, oro rosa, elegancia, celebración) a un lenguaje visual premium, corporativo y minimalista**, tipo high-tech/enterprise. En resumen:

- **Premium / Enterprise / Corporativo:** tipografía cuidada, jerarquía clara, mucho espacio en blanco, composición limpia.
- **High-tech y elegante:** gradientes sutiles, glassmorphism/blur discreto, sombras suaves, bordes finos, detalles metálicos sutiles (no saturar).
- **Minimalista:** evitar el exceso de elementos decorativos; usar la paleta de colores y tipografía como protagonistas, no el ruido visual.
- **Consistencia de marca:** los colores y el tono deben sentirse claramente ligados al logo (rosa/magenta + oro rosa), pero ejecutados de forma sobria y sofisticada, no "glitter" literal.

El resultado esperado es que la marca se perciba como una **productora de eventos de alto nivel**, confiable tanto para una boda como para una activación corporativa masiva.

---

## 5. Requisitos funcionales y visuales obligatorios

Estos elementos son **obligatorios** en la entrega final:

### 5.1 Pantalla de carga (loading screen)
- Spinner/loader de carga que se muestra antes de renderizar la página.
- Debe incluir el **logo del negocio** (versión con fondo transparente) centrado dentro o junto al spinner.
- Transición suave (fade out) hacia el contenido una vez cargado.

### 5.2 Animaciones al hacer scroll
- Elementos (secciones, tarjetas, imágenes, textos) deben animarse al entrar en el viewport (fade-in, slide-up, etc.).
- Debe sentirse fluido y sutil, no exagerado ni que ralentice la navegación.

### 5.3 Efectos en el título del Hero
En la sección principal (Hero), el título debe tener animación de texto, por ejemplo:
- Efecto **máquina de escribir** (typewriter) sobre el texto del título.
- Efecto de **cambio de color** en las letras/palabras del título (animación de gradiente o transición cromática usando la paleta de marca).
- Estos efectos pueden combinarse o alternarse; el objetivo es que el Hero se sienta dinámico e impactante desde el primer segundo.

### 5.4 Logo sin fondo
- Ya especificado en la sección 3: el logo debe procesarse para quitarle el fondo antes de integrarlo en el header, footer y loading screen.


## 6. Assets disponibles

- `imagenes/logo.jpeg` — Logo oficial actual (requiere remoción de fondo, ver sección 3).
- Cualquier archivo adicional que se agregue a la carpeta `imagenes/` debe considerarse material oficial del negocio (fotos de eventos, documentos, etc.) y usarse como referencia de contenido real.

---

## 7. Flujo de trabajo con Claude (iteración)

- El desarrollador **trabajará directamente con Claude** (Claude Code) sobre la plantilla base para construir y refinar la landing page.
- No hay límite de iteraciones: se puede seguir dando instrucciones a Claude, ajustando estilos, corrigiendo secciones o pidiendo variaciones **hasta lograr el resultado deseado** descrito en este documento.
- Este README debe usarse como contexto/base de referencia para las instrucciones que se le den a Claude, de modo que cada iteración se mantenga alineada con la marca, el estilo y los requisitos funcionales aquí descritos.
- Prioridad: calidad y fidelidad al resultado esperado por encima de la velocidad de entrega.

---

## 10. Checklist final antes de entrega

- [ ] Logo con fondo removido (PNG transparente) integrado en header, footer y loading screen.
- [ ] Loading screen con spinner + logo funcionando correctamente.
- [ ] Animaciones de scroll aplicadas de forma consistente en toda la página.
- [ ] Título del Hero con efecto typewriter y/o cambio de color implementado.
- [ ] Paleta de colores de marca (rosa/magenta + oro rosa) aplicada de forma consistente.
- [ ] Estilo general premium, corporativo, minimalista y high-tech (sin saturar con elementos decorativos).
- [ ] Todos los servicios y tipos de evento listados en la sección 2 están representados en el contenido.
- [ ] Teléfono y redes sociales visibles y funcionales (click-to-call, click-to-WhatsApp, links a redes).
- [ ] Landing responsiva (mobile, tablet, desktop).
