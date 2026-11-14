/* ==========================================================================
   DEEDAZAIB — SITE SETTINGS
   This is the only file you need to edit to update the website.
   Save it, commit it to GitHub, and the site updates in a minute or two.
   ========================================================================== */

window.DEEDAZAIB = {

  /* Your WhatsApp number in international format: country code + number,
     no "+", no spaces, no leading 0. Example for 0300 1234567 → '923001234567' */
  whatsapp: '',

  /* Full link to your Instagram page, e.g. 'https://www.instagram.com/deedazaib' */
  instagram: '',

  /* Shown in every product's DELIVERY section */
  delivery: 'We deliver worldwide. Prices are in PKR; shipping is quoted on WhatsApp. Cash on delivery in Pakistan, or bank transfer.',

  /* Optional photo for "the early days" in the story pages of the book,
     e.g. 'images/early-days.jpg'. Leave '' to show the placeholder. */
  earlyDaysPhoto: '',

  /* ------------------------------------------------------------------------
     THE LOOKBOOK — one block per outfit, in the order they appear.
     collection: 'semi-formal' or 'festive' (controls the tabs)
     name:       the names below are suggestions — change them to your own
     price:      e.g. '18,500' shows "Rs 18,500"; leave '' to show "Price on request"
     photos:     files in images/looks/. The FIRST photo is the one in the grid,
                 the second fades in on hover, all of them show in the product view.
     Any field left '' (fabric, makingTime, shirt, dupatta, trouser, fit, care)
     is simply hidden on the site.
     isNew: true shows a "NEW" tag · soldOut: true shows "SOLD OUT"
     ------------------------------------------------------------------------ */
  looks: [
    {
      no: '01', collection: 'semi-formal', isNew: false, soldOut: false,
      name: 'Indigo Lotus', price: '',
      photos: [
        'images/looks/blue-1.jpg',
        'images/looks/blue-2.jpg',
        'images/looks/blue-3.jpg'
      ],
      colour: 'Indigo blue', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Indigo shirt with hand-embroidered lotus motifs on the sleeves and dupatta, finished with fine gold piping.',
      fit: '', care: ''
    },
    {
      no: '02', collection: 'semi-formal', isNew: false, soldOut: false,
      name: 'Sage Cutwork', price: '',
      photos: [
        'images/looks/green-1.jpg',
        'images/looks/green-2.jpg',
        'images/looks/green-3.jpg',
        'images/looks/green-4.jpg'
      ],
      colour: 'Sage green', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Sage shirt with cut-work embroidery on the sleeves, pin-tuck details and a soft sheer dupatta.',
      fit: '', care: ''
    },
    {
      no: '03', collection: 'semi-formal', isNew: false, soldOut: false,
      name: 'Ice Blue Gota', price: '',
      photos: [
        'images/looks/ice-blue-1.jpg',
        'images/looks/ice-blue-3.jpg',
        'images/looks/ice-blue-2.jpg',
        'images/looks/ice-blue-4.jpg'
      ],
      colour: 'Ice blue', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Ice-blue shirt with a buttoned front and gota-lace cuffs, paired with wide trousers embroidered with scattered motifs.',
      fit: '', care: ''
    },
    {
      no: '04', collection: 'semi-formal', isNew: false, soldOut: false,
      name: 'Peach Bloom', price: '',
      photos: [
        'images/looks/pink-1.jpg',
        'images/looks/pink-3.jpg',
        'images/looks/pink-2.jpg'
      ],
      colour: 'Peach', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Peach shirt with embellished organza bell cuffs, matching wide trousers and a sheer dupatta.',
      fit: '', care: ''
    },
    {
      no: '05', collection: 'semi-formal', isNew: false, soldOut: false,
      name: 'Ivory Block', price: '',
      photos: [
        'images/looks/white-3.jpg',
        'images/looks/white-2.jpg',
        'images/looks/white-1.jpg',
        'images/looks/white-4.jpg',
        'images/looks/white-5.jpg'
      ],
      colour: 'Ivory', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Ivory set with block-printed floral motifs in peach and green, and a printed border on the trousers.',
      fit: '', care: ''
    },
    {
      no: '06', collection: 'festive', isNew: false, soldOut: false,
      name: 'Lilac Pearl', price: '',
      photos: [
        'images/looks/purple-2.jpg',
        'images/looks/purple-1.jpg',
        'images/looks/purple-3.jpg',
        'images/looks/purple-5.jpg',
        'images/looks/purple-4.jpg'
      ],
      colour: 'Lilac', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Lilac shirt with a pearl-and-stone embellished neckline and cuffs, paired with a long flowing dupatta.',
      fit: '', care: ''
    },
    {
      no: '07', collection: 'festive', isNew: false, soldOut: false,
      name: 'Crimson Mirror', price: '',
      photos: [
        'images/looks/red-5.jpg',
        'images/looks/red-1.jpg',
        'images/looks/red-3.jpg',
        'images/looks/red-2.jpg',
        'images/looks/red-4.jpg'
      ],
      colour: 'Crimson', fabric: '', makingTime: '',
      shirt: '', dupatta: '', trouser: '',
      craft: 'Crimson shirt with scalloped mirror-work sleeves and hem, an organza dupatta and wide trousers.',
      fit: '', care: ''
    }
  ]
};
