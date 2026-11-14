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
     THE LOOKBOOK — one block per look, in the order they appear.
     collection: 'semi-formal' or 'festive'
     photo:      put the photo in images/looks/ and write its path here,
                 e.g. 'images/looks/look-01.jpg'. Portrait photos work best
                 (about 800 × 1100 px). Leave '' to show the illustration.
     isNew:      true shows a "NEW" tag · soldOut: true shows "SOLD OUT"
     placeholder colours are only used while there is no photo.
     ------------------------------------------------------------------------ */
  looks: [
    {
      no: '01', collection: 'semi-formal', isNew: true, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#D9A5A0', trouser: '#C38E89', dupatta: '#EBCFC6', trim: '#B08A4A' }
    },
    {
      no: '02', collection: 'semi-formal', isNew: false, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#A8B59A', trouser: '#93A185', dupatta: '#D7DECB', trim: '#B08A4A' }
    },
    {
      no: '03', collection: 'semi-formal', isNew: false, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#A9BCC9', trouser: '#93A7B4', dupatta: '#DCE4EA', trim: '#B08A4A' }
    },
    {
      no: '04', collection: 'festive', isNew: true, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#2F5D50', trouser: '#264D42', dupatta: '#C9A24A', trim: '#E3C88E' }
    },
    {
      no: '05', collection: 'festive', isNew: false, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#B43C6E', trouser: '#963059', dupatta: '#E8B2C6', trim: '#E3C88E' }
    },
    {
      no: '06', collection: 'festive', isNew: false, soldOut: false,
      name: '[Product name]', price: 'X,XXX',
      photo: '',
      fabric: '[Fabric]', makingTime: '[X–Y weeks]', colour: '[Colour]',
      shirt: '[Fabric & work]', dupatta: '[Fabric]', trouser: '[Fabric]',
      craft: 'Designed and styled by Beenish, handcrafted by karigars in Islamabad. [Embroidery / work details]',
      fit: '[Model height] · Wearing size [S]',
      care: '[Care instructions]',
      placeholder: { body: '#E9DCC4', trouser: '#D8C8AC', dupatta: '#C9A24A', trim: '#B08A4A' }
    }
  ]
};
