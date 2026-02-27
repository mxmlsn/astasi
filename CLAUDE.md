# astasi — правила работы для клода

## обязательный пайплайн для любых визуальных изменений

**перед тем как что-то менять:**
1. снять скриншот оригинала (https://astasi.care/) через playwright в зоне изменения
2. снять скриншот локалки в той же зоне
3. понять разницу — только после этого писать код

**после каждого изменения:**
1. снять скриншот локалки
2. сравнить с оригиналом визуально
3. если не совпадает — найти root cause и исправить
4. повторять пока результат не совпадёт с оригиналом

**нельзя считать задачу выполненной без визуальной проверки.**
«должно работать» — не проверка. скриншот — проверка.

## как снимать скриншоты

```bash
cd /tmp
node script.js
```

шаблон скрипта:
```js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // оригинал
  await page.goto('https://astasi.care/');
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, Y)); // Y — нужная позиция
  await page.screenshot({ path: '/tmp/orig.png' });

  // локалка
  await page.goto('file:///Users/maximlyashenko/Desktop/gitmerharder/astasi/index.html');
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, Y));
  await page.screenshot({ path: '/tmp/local.png' });

  await browser.close();
})();
```

для интерактивных элементов — кликать перед скриншотом:
```js
await page.click('selector');
await page.waitForTimeout(1000);
await page.screenshot({ path: '/tmp/after-click.png' });
```

## playwright

- CLI: `playwright` (v1.58.2)
- node module: `/tmp/node_modules/playwright`
- запускать из `/tmp`

## структура проекта

```
index.html        — весь html
css/main.css      — все стили
js/main.js        — side nav + popup + CTA аккордеон
fonts/            — Gothic60-Regular.otf, Geologica_Auto-ExtraLight.ttf
images/           — все ассеты
```

## важные css-особенности

- секции approach сделаны через `position: relative` с абсолютно позиционированными детьми
- `overflow: hidden` на родителе обрезает динамически растущих детей — при аккордеонах/раскрытиях убирать
- десктоп: ширина контейнеров 1440px фиксированная
- мобайл: `@media (max-width: 900px)` — основные overrides
