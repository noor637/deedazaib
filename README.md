# Deedazaib by Beenish — website

A one-page website for **Deedazaib by Beenish**:
intro → *How we started* (a book that opens as you scroll) → the **Lookbook** grid → *About us*.
Every order goes through WhatsApp; there is no cart or online payment.

No build tools are needed: it is plain HTML, CSS and JavaScript, ready for **GitHub Pages**.

---

## What's in the folder

```
index.html                 the page itself (intro, About text, product popup)
css/style.css              all the styling (colours, fonts, layout)
js/config.js               ← YOUR SETTINGS: WhatsApp number, Instagram, every look
js/main.js                 the behaviour (book, scrolling, lookbook, product popup)
js/vendor/page-flip…js     the page-turning library (MIT licence, included)
images/favicon.svg         the browser-tab icon (D ز monogram)
images/looks/              put your outfit photos here
.nojekyll                  tells GitHub Pages to serve the files as they are
```

---

## Put it online with GitHub Pages (about 5 minutes)

1. Sign in at **github.com** and click **New repository**.
   Name it, for example, `deedazaib`. Keep it **Public**. Click **Create repository**.
2. On the new repository page click **uploading an existing file**
   (or **Add file → Upload files**).
3. Unzip this folder on your computer, open it, select **everything inside it**
   (`index.html`, the `css`, `js` and `images` folders, `README.md`, `.nojekyll`)
   and drag it all into the upload box. Click **Commit changes**.
   > Tip: `.nojekyll` is a hidden file. On a Mac press **Cmd + Shift + .** to show it,
   > on Windows tick **View → Hidden items**. The site still works without it.
4. Go to **Settings → Pages**. Under **Build and deployment** choose
   **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, and click **Save**.
5. Wait a minute or two, then refresh that page: your link appears at the top,
   e.g. `https://your-username.github.io/deedazaib/`.

### Using your own domain (optional)
In **Settings → Pages → Custom domain** type your domain (e.g. `deedazaib.com`) and save,
then add the DNS records GitHub shows you at your domain provider.
Tick **Enforce HTTPS** once it becomes available.

---

## Updating the site

Open **`js/config.js`** on GitHub, click the ✏️ pencil, make your changes, then **Commit changes**.
The live site updates within a minute or two.

### Your WhatsApp number
```js
whatsapp: '923001234567',
```
Country code + number, no `+`, no leading `0` (0300 1234567 → `923001234567`).
Spaces and dashes are removed automatically.

### Instagram
```js
instagram: 'https://www.instagram.com/deedazaib',
```
Leave it as `''` and the Instagram button is hidden.

### Photos
Each look has a `photos:` list. The **first** photo is shown in the lookbook grid, the **second**
fades in when someone hovers over it, and **all** of them appear in the swipeable gallery when
the look is opened.
1. On GitHub open the `images/looks` folder → **Add file → Upload files** → upload e.g. `rose-1.jpg`.
2. Add it to that look in `js/config.js`:
   ```js
   photos: [
     'images/looks/rose-1.jpg',
     'images/looks/rose-2.jpg'
   ],
   ```
Resize photos before uploading: about **1100 px wide**, under ~300 KB each, so the site stays fast
on phones (straight-from-camera photos are 7 MB+). File names are case-sensitive.

### Editing a look
Each look is one block in the `looks: [ … ]` list:

| field | what it does |
|---|---|
| `no` | look number shown everywhere (`'07'`) |
| `collection` | `'semi-formal'` or `'festive'` (controls the tabs) |
| `isNew` / `soldOut` | `true` shows a **NEW** or **SOLD OUT** tag; sold-out looks ask about restock instead of ordering |
| `name`, `price` | shown in the product popup (`price: '18,500'` → "Rs 18,500"; `''` → "Price on request") |
| `fabric`, `makingTime`, `colour` | product details |
| `shirt`, `dupatta`, `trouser` | the *Product details* section |
| `craft`, `fit`, `care` | the fold-out sections |
| any field left `''` | hidden on the site (fabric, makingTime, shirt, dupatta, trouser, fit, care) |

**Add a look:** copy one whole block `{ … },` and paste it under the last one, then change its details.
**Remove a look:** delete its whole block, including the `{ }` and the comma.

### Other text
- **Intro and About us** wording → `index.html` (search for the text you want to change).
- **The story inside the book** ("Hi, I'm Beenish…", the timeline) → `js/main.js`, section *3 · the book*.
- **Delivery note** in every product → `delivery:` in `js/config.js`.
- **"The early days" photo** in the book → upload it to `images/` and set `earlyDaysPhoto:` in `js/config.js`.

---

## Try it on your computer first
Double-click `index.html` to open it in your browser. Everything works offline except the
fonts, which load from Google Fonts when you're online.

## Good to know
- Works on phones, tablets and desktops. On phones the book shows one page at a time.
- Visitors who turn on "reduce motion" on their device get the page without the gliding animations.
- Credits: page turning by [StPageFlip](https://github.com/Nodlik/StPageFlip) (MIT licence, see `js/vendor/`);
  fonts Cinzel, Jost, Gulzar and Cormorant Garamond from Google Fonts (Open Font License).
