# astasi.care — pipeline

## коротко

проект завершён: vanilla HTML/CSS/JS ребилд сайта astasi.care (оригинал на Framer).
десктоп и мобайл готовы, пиксель-перфект.

структура: `index.html` + `css/main.css` + `js/main.js` + `images/` + `fonts/`

для проверки оригинала — playwright скриптом из /tmp.

---

## подробно (для будущего клода)

### что за проект
ребилд сайта психолога Анастасии (https://astasi.care/) с нуля.
оригинал собран в Framer — выгрузить код нельзя, поэтому всё переписано руками.
цель: pixel-perfect копия в чистом HTML/CSS/JS, без фреймворков.

### структура репо
```
/Users/maximlyashenko/Desktop/gitmerharder/astasi/
├── index.html          — весь html (один файл, 7 секций)
├── css/main.css        — все стили включая @media mobile
├── js/main.js          — side nav highlight + popup open/close
├── fonts/
│   ├── Gothic60-Regular.otf
│   └── Geologica_Auto-ExtraLight.ttf
└── images/             — все картинки (hero, illustrations, bullets, deco)
```

### воркфлоу проверки оригинала

**инструмент:** Playwright v1.58.2
- CLI: `playwright`
- node module: `/tmp/node_modules/playwright`

**как делать скриншот оригинала:**
```bash
cd /tmp
# написать script.js с нужным viewport/scroll
node script.js
# скриншот появится в /tmp/screenshot-*.png
```

**шаблон скрипта:**
```js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://astasi.care/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/orig-full.png', fullPage: true });
  await browser.close();
})();
```

для сравнения конкретной секции — использовать `clip: { x, y, width, height }` в screenshot().

### как смотреть локалку
открыть `index.html` прямо в браузере (file://) или запустить локальный сервер:
```bash
cd /Users/maximlyashenko/Desktop/gitmerharder/astasi
python3 -m http.server 8080
# → http://localhost:8080
```

### статус реализации
| платформа | статус | высота страницы |
|-----------|--------|-----------------|
| desktop 1440px | ✅ pixel-perfect | 7559px (ориг: 7418px, +141px) |
| mobile ≤900px  | ✅ завершён | 6833px (ориг: 6882px, -49px) |

### секции (сверху вниз)
1. **hero** — фото слева, имя/кнопка/ссылки справа, side-nav внизу-слева
2. **approach-1** — "мой подход:" (Gothic60 120px) + иллюстрации + текст
3. **approach-2** — "психодрама." (h1, Gothic60 120px) + параграфы
4. **quote** — большая цитата (Gothic60 60px) + 2 CTA кнопки
5. **child** — "помогаю детям" + фото + аккордеон-FAQ
6. **pricing** — 3 карточки (5500₽/4500₽/групповые)
7. **footer** — "дизайн mxml.sn и вёрстка partybusket"

### цвета
- фон: `#fff8f0` (warm cream)
- текст: `#2d1800` (dark brown)
- акцент/ссылки: `#c47229` (amber)
- кнопки/карточки: `#ffdfab` (light peach)
- приглушённый текст: `rgba(46,24,0,0.64)`

### шрифты
- **Gothic №60** (`GothicNo60`) — заголовки, цитата; файл: `fonts/Gothic60-Regular.otf`
- **Geologica** (`Geologica`) — всё остальное; weight 200; файл: `fonts/Geologica_Auto-ExtraLight.ttf` + Google Fonts fallback

### брейкпоинты мобайла
- `@media (max-width: 900px)` — основные переопределения
- `@media (max-width: 400px)` — маленькие телефоны
- side-deco и side-nav: `display: none` на мобайле
- approach секции: absolute positioning → flex/grid
- children секция: border-radius 380px → 50px

### известные нюансы
- bear-иллюстрации в FAQ детей недоступны (Framer CDN, нет локальных)
- bullet-иллюстрации (bullet-1..6.png) лежат в images/ но не используются в текущей верстке
- видео (video-background.mp4) не используется — заменено статичным контентом
- в headless Playwright видео-элементы иногда дают GPU-артефакт (не баг реального браузера)

### ассеты (старое расположение → текущее)
раньше хранились в `/Users/maximlyashenko/clawd/astasi-assets/` (внешняя папка).
сейчас все скопированы в `images/` и `fonts/` внутри репо.
некоторые добавились позже: `photo-child.png`, `photo-child-real.png`, `photo-child-round.png`,
`*-cdn.png` (альтернативные версии отдельных иллюстраций).

### внешние ссылки в сайте
- записаться: https://t.me/astasi
- информированное согласие: https://docs.google.com/document/d/1R2XzaYgtBaT9LcPL2IeynoeLdT1jr1Uqf8MMQknL3fQ/edit
- адрес: Кропоткинский пер., 4 → Google Maps
- групповые: child.psychodrama.tilda.ws + shalash.academy
