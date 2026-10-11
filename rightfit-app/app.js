(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var KEY = 'rf_data_v1';
  var API = 'https://api.anthropic.com/v1/messages';
  var MODEL = 'claude-sonnet-5-5';

  /* ================= languages ================= */
  /* App text */
  var UI = {
    ur: {
      install: 'انسٹال کریں', settingsBtn: 'ترتیبات', search: 'نام، نمبر یا موبائل سے تلاش کریں', addBtn: '+ نئی پرچی',
      back: '→ واپس', save: 'محفوظ کریں', share: 'شیئر کریں', shareShort: 'شیئر',
      photoTitle: 'پرچی کی تصویر', photoHint: 'ہاتھ سے لکھی ہوئی پرچی کی تصویر لگائیں۔ تصویر اسی پرچی کے ساتھ محفوظ رہے گی۔',
      photoOpen: 'تصویر بڑی کر کے دیکھیں', cam: 'کیمرے سے تصویر', gal: 'گیلری سے چنیں', scan: 'تصویر سے خود بھریں', scanning: 'پڑھا جا رہا ہے...', photoDel: 'تصویر ہٹائیں',
      delSlip: 'پرچی ڈیلیٹ کریں', delSure: 'پکا ڈیلیٹ کریں؟',
      setTitle: 'ترتیبات', langTitle: 'زبان', langUi: 'ایپ کی زبان', langSlip: 'پرچی کی زبان',
      langHint: 'پرچی کی زبان ایڈیٹر اور شیئر کی جانے والی تصویر کی ڈیفالٹ زبان ہے۔ شیئر کرتے وقت بھی بدل سکتے ہیں۔',
      shopTitleH: 'دکان کی تفصیل', shopHint: 'یہ ہر پرچی کے اوپر اور شیئر کی ہوئی تصویر میں آئے گی۔',
      sUr: 'دکان کا نام (اردو)', sEn: 'دکان کا نام (انگریزی)', sEn2: 'دوسری لائن (انگریزی)', sTag: 'ٹیگ لائن (اردو)', sTagEn: 'ٹیگ لائن (انگریزی)',
      sPh: 'نام اور فون نمبر', sHid: 'ضروری ہدایات (ہر نئی پرچی میں پہلے سے لکھی آئیں گی)',
      scanTitle: 'تصویر سے خود بھرنا',
      scanHint: 'یہ سہولت Claude (Anthropic) کی سروس سے تصویر پڑھواتی ہے۔ اس کے لیے آپ کے پاس API کی (key) ہونی چاہیے، ہر تصویر پر تھوڑا خرچ آتا ہے اور تصویر انٹرنیٹ پر بھیجی جاتی ہے۔ کی صرف اسی فون میں رہتی ہے اور بیک اپ میں شامل نہیں ہوتی۔',
      apiKey: 'API کی',
      bkTitle: 'ڈیٹا کا بیک اپ', bkHint: 'سارا ڈیٹا صرف اسی فون میں محفوظ ہوتا ہے۔ فون بدلنے یا براؤزر کا ڈیٹا صاف کرنے سے پہلے بیک اپ ضرور لیں۔ تصویریں بھی بیک اپ میں شامل ہیں۔',
      bkExport: 'بیک اپ ڈاؤن لوڈ', bkImport: 'بیک اپ بحال کریں',
      sheetTitle: 'پرچی کی جھلک', close: 'بند کریں', sheetSave: 'تصویر محفوظ کریں',
      count1: '1 پرچی', countN: '{n} پرچیاں', empty0: 'ابھی کوئی پرچی نہیں ہے۔<br>نیچے "+ نئی پرچی" دبائیں۔', emptyMatch: 'اس نام کی کوئی پرچی نہیں ملی۔',
      noName: 'نام نہیں لکھا', metaNo: 'نمبر {n}', hasPhoto: 'تصویر لگی ہے', shopFallback: 'پرچیاں',
      saved: 'پرچی محفوظ ہو گئی', saveFail: 'محفوظ نہیں ہو سکی، براؤزر اسٹوریج بند ہے', deleted: 'پرچی ڈیلیٹ ہو گئی',
      imgMaking: 'تصویر بن رہی ہے...', imgFail: 'تصویر نہیں بن سکی', imgDownloaded: 'تصویر ڈاؤن لوڈ ہو گئی',
      shareNo: 'اس براؤزر میں شیئر نہیں ہوتا، "تصویر محفوظ کریں" دبائیں', shareFail: 'شیئر نہیں ہو سکا',
      photoAdded: 'تصویر لگ گئی', photoFail: 'تصویر محفوظ نہیں ہو سکی', photoRemoved: 'تصویر ہٹا دی گئی',
      photoFirst: 'پہلے تصویر لگائیں', keyFirst: 'پہلے ترتیبات میں API کی ڈالیں',
      filled: '{n} خانے بھر گئے، چیک کر کے محفوظ کریں', nothingRead: 'تصویر میں کچھ پڑھا نہیں جا سکا',
      readFail: 'تصویر پڑھی نہیں جا سکی، دوبارہ کوشش کریں', keyBad: 'API کی غلط ہے، ترتیبات میں چیک کریں',
      rate: 'ابھی بہت درخواستیں ہیں، تھوڑی دیر بعد کوشش کریں', offline: 'انٹرنیٹ نہیں ہے',
      bkDone: 'بیک اپ فائل ڈاؤن لوڈ ہو گئی', bkBad: 'یہ بیک اپ فائل درست نہیں ہے', restored: '{n} نئی پرچیاں واپس آ گئیں',
      storageOff: 'براؤزر اسٹوریج بند ہے، ڈیٹا محفوظ نہیں ہوگا',
      bkInfo: '{c} محفوظ ہیں۔ {last}', bkLast: 'آخری بیک اپ: {d}', bkNone: 'ابھی تک بیک اپ نہیں لیا۔'
    },
    en: {
      install: 'Install', settingsBtn: 'Settings', search: 'Search by name, number or mobile', addBtn: '+ New slip',
      back: '← Back', save: 'Save', share: 'Share', shareShort: 'Share',
      photoTitle: 'Slip photo', photoHint: 'Add a photo of the handwritten slip. The photo is saved with this slip.',
      photoOpen: 'View photo full size', cam: 'Take photo', gal: 'Choose from gallery', scan: 'Fill from photo', scanning: 'Reading...', photoDel: 'Remove photo',
      delSlip: 'Delete slip', delSure: 'Really delete?',
      setTitle: 'Settings', langTitle: 'Language', langUi: 'App language', langSlip: 'Slip language',
      langHint: 'Slip language sets the editor and the default language of the shared image. You can also change it while sharing.',
      shopTitleH: 'Shop details', shopHint: 'These appear at the top of every slip and in the shared image.',
      sUr: 'Shop name (Urdu)', sEn: 'Shop name (English)', sEn2: 'Second line (English)', sTag: 'Tagline (Urdu)', sTagEn: 'Tagline (English)',
      sPh: 'Name and phone number', sHid: 'Important instructions (pre-filled on every new slip)',
      scanTitle: 'Fill from photo',
      scanHint: 'This reads the photo using Claude (Anthropic). You need your own API key, each photo costs a small amount, and the photo is sent over the internet. The key stays on this phone only and is not part of the backup.',
      apiKey: 'API key',
      bkTitle: 'Data backup', bkHint: 'All data is stored only on this phone. Take a backup before changing phones or clearing browser data. Photos are included in the backup.',
      bkExport: 'Download backup', bkImport: 'Restore backup',
      sheetTitle: 'Slip preview', close: 'Close', sheetSave: 'Save image',
      count1: '1 slip', countN: '{n} slips', empty0: 'No slips yet.<br>Tap "+ New slip" below.', emptyMatch: 'No slip found for that search.',
      noName: 'No name', metaNo: 'No. {n}', hasPhoto: 'Photo attached', shopFallback: 'Slips',
      saved: 'Slip saved', saveFail: 'Could not save, browser storage is off', deleted: 'Slip deleted',
      imgMaking: 'Making image...', imgFail: 'Could not make the image', imgDownloaded: 'Image downloaded',
      shareNo: 'Sharing is not supported here, tap "Save image"', shareFail: 'Could not share',
      photoAdded: 'Photo added', photoFail: 'Could not save the photo', photoRemoved: 'Photo removed',
      photoFirst: 'Add a photo first', keyFirst: 'Add your API key in Settings first',
      filled: '{n} fields filled, check them and save', nothingRead: 'Could not read anything from the photo',
      readFail: 'Could not read the photo, try again', keyBad: 'API key is wrong, check Settings',
      rate: 'Too many requests right now, try again shortly', offline: 'No internet connection',
      bkDone: 'Backup file downloaded', bkBad: 'This backup file is not valid', restored: '{n} new slips restored',
      storageOff: 'Browser storage is off, data will not be saved',
      bkInfo: '{c} saved. {last}', bkLast: 'Last backup: {d}', bkNone: 'No backup taken yet.'
    }
  };
  /* Slip text (editor and shared image) */
  var SL = {
    ur: { no: 'نمبر', date: 'تاریخ', cname: 'کسٹمر نام', cell: 'موبائل', style: 'اسٹائل', hid: 'ضروری ہدایات',
      note: 'نوٹ: 2 ماہ کے بعد فرم کپڑوں کی ذمہ دار نہ ہوگی۔ رسید کے بغیر کپڑے نہیں ملیں گے۔',
      note1: 'نوٹ: 2 ماہ کے بعد فرم کپڑوں کی ذمہ دار نہ ہوگی۔', note2: 'رسید کے بغیر کپڑے نہیں ملیں گے۔',
      cnamePh: 'نام لکھیں', stylePh: 'مثال: ویسٹ کوٹ، 1 بٹن', hidPh: 'یہاں ہدایات لکھیں' },
    en: { no: 'No.', date: 'Date', cname: 'Customer Name', cell: 'Mobile', style: 'Style', hid: 'Important Instructions',
      note: 'Note: The firm is not responsible for clothes after 2 months. Clothes will not be given without the receipt.',
      note1: 'Note: The firm is not responsible for clothes after 2 months.', note2: 'Clothes will not be given without the receipt.',
      cnamePh: 'Enter name', stylePh: 'e.g. Waist coat, 1 button', hidPh: 'Write instructions here' }
  };
  /* [id, Urdu label, English label, placeholder example] */
  var COAT = [['c_len','لمبائی','Length','31½'],['c_arm','بازو','Sleeve','25'],['c_tera','تیرا','Shoulder','22½'],['c_chest','چھاتی','Chest','48'],['c_waist','کمر','Waist','33'],['c_cross','کراس بیک','Cross Back',''],['c_neck','گلہ','Neck','20']];
  var PANT = [['p_waist','ویسٹ','Waist','32'],['p_len','لمبائی','Length','40'],['p_hip','ہپ','Hip','42'],['p_gaddi','گدی','Gaddi',''],['p_mori','موری','Moori',''],['p_round','گول کیرا بٹن','Round Kira',''],['p_straight','سیدھا کیرا بٹن','Straight Kira','']];
  var OPT_R = [['o_pf','ایک پاکٹ سامنے','One Pocket Front'],['o_ps','ایک پاکٹ سائیڈ','One Pocket Side'],['o_shalwar','شلوار پاکٹ','Shalwar Pocket']];
  var OPT_L = [['o_coat','کوٹ','Coat'],['o_pless','پلیٹ لیس پینٹ','Plateless Pant'],['o_dress','ڈریس پینٹ','Dress Pant'],['o_shirt','شرٹ','Shirt']];
  var META = ['no', 'date', 'cname', 'cell', 'style', 'hidayat'];
  var first = function (r) { return r[0]; };
  var FIELDS = META.concat(COAT.map(first), PANT.map(first), OPT_R.map(first), OPT_L.map(first));

  var lang = { ui: 'ur', slip: 'ur' };
  try { var sv = JSON.parse(localStorage.getItem('rf_lang')); if (sv) { if (sv.ui === 'en') lang.ui = 'en'; if (sv.slip === 'en') lang.slip = 'en'; } } catch (e) { /* default */ }
  function t(key, vars) {
    var s = (UI[lang.ui][key] != null ? UI[lang.ui][key] : UI.ur[key]) || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function labelOf(r, l) { return l === 'en' ? r[2] : r[1]; }

  /* ================= storage ================= */
  function defaultShop() {
    return { ur: 'رائٹ فٹ', en: 'Right Fit', en2: 'Pent Coat House', tag: 'پینٹ کوٹ اور ڈریس کی بہترین ورائٹی', tagEn: 'Best variety of Pent Coat & Dress', ph: 'M.Ahtsham  03034843490', hid: '' };
  }
  var storageOk = true;
  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && Array.isArray(v.slips)) {
        v.shop = Object.assign(defaultShop(), v.shop || {});
        v.nextNo = v.nextNo || 1;
        return v;
      }
    } catch (e) { /* fall through */ }
    return { shop: defaultShop(), slips: [], nextNo: 1 };
  }
  var db = load();
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); storageOk = true; return true; }
    catch (e) { storageOk = false; return false; }
  }
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* ignore */ }

  /* photos live in IndexedDB (too big for localStorage) */
  var idbP = null;
  function idb() {
    if (idbP) return idbP;
    idbP = new Promise(function (res, rej) {
      try {
        var r = indexedDB.open('rf_photos', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('p'); };
        r.onsuccess = function () { res(r.result); };
        r.onerror = function () { rej(r.error); };
      } catch (e) { rej(e); }
    });
    return idbP;
  }
  function idbPut(id, blob) {
    return idb().then(function (d) { return new Promise(function (res, rej) {
      var tx = d.transaction('p', 'readwrite'); tx.objectStore('p').put(blob, id);
      tx.oncomplete = function () { res(); }; tx.onerror = function () { rej(tx.error); };
    }); });
  }
  function idbGet(id) {
    return idb().then(function (d) { return new Promise(function (res, rej) {
      var q = d.transaction('p', 'readonly').objectStore('p').get(id);
      q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { rej(q.error); };
    }); });
  }
  function idbDel(id) {
    return idb().then(function (d) { return new Promise(function (res, rej) {
      var tx = d.transaction('p', 'readwrite'); tx.objectStore('p').delete(id);
      tx.oncomplete = function () { res(); }; tx.onerror = function () { rej(tx.error); };
    }); });
  }
  function blobToDataURL(b) {
    return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsDataURL(b); });
  }

  /* ================= helpers ================= */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function today() { var d = new Date(); return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear(); }
  function countText(n) { return n === 1 ? t('count1') : t('countN', { n: n }); }
  var toastTimer;
  function toast(msg) { var el = $('toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('on'); }, 3000); }

  /* ================= views and history ================= */
  var current = 'list', sheetOpen = false, skipPop = false;
  function show(name) {
    ['list', 'edit', 'settings'].forEach(function (v) { $('v-' + v).hidden = v !== name; });
    current = name;
    window.scrollTo(0, 0);
  }
  function push(name) { try { history.pushState({ v: name }, ''); } catch (e) { /* ignore */ } }
  function back() { if (history.length > 1) history.back(); else onPop(); }
  function onPop() {
    if (skipPop) { skipPop = false; return; }
    if (sheetOpen) { closeSheet(true); return; }
    if (current === 'edit') autosave();
    if (current !== 'list') { show('list'); renderList(); }
  }
  window.addEventListener('popstate', onPop);
  try { history.replaceState({ v: 'list' }, ''); } catch (e) { /* ignore */ }

  /* ================= slip form ================= */
  var editingId = null, dirty = false, curPhoto = '';
  function buildRows(target, list) {
    var l = lang.slip, dir = l === 'en' ? 'ltr' : 'rtl';
    $(target).innerHTML = list.map(function (r) {
      return '<div class="row"><div class="k" dir="' + dir + '">' + esc(labelOf(r, l)) + '</div><div class="v"><input id="' + r[0] + '" autocomplete="off" placeholder="' + esc(r[3]) + '" aria-label="' + esc(labelOf(r, l)) + '"></div></div>';
    }).join('');
  }
  function buildLines(target, list) {
    var l = lang.slip, dir = l === 'en' ? 'ltr' : 'rtl';
    $(target).innerHTML = list.map(function (r) {
      return '<div class="line"><label for="' + r[0] + '" dir="' + dir + '">' + esc(labelOf(r, l)) + '</label><input id="' + r[0] + '" dir="auto" autocomplete="off"></div>';
    }).join('');
  }
  function buildSlipLabels() {
    var keep = {};
    COAT.concat(PANT, OPT_R, OPT_L).forEach(function (r) { var el = $(r[0]); if (el) keep[r[0]] = el.value; });
    buildRows('colCoat', COAT); buildRows('colPant', PANT); buildLines('optsR', OPT_R); buildLines('optsL', OPT_L);
    Object.keys(keep).forEach(function (id) { $(id).value = keep[id]; });
  }
  $('v-edit').addEventListener('input', function (e) { if (e.target && e.target.type !== 'file') dirty = true; });

  function applyLang() {
    var ui = lang.ui, sl = lang.slip;
    document.documentElement.lang = ui === 'en' ? 'en' : 'ur';
    document.documentElement.dir = ui === 'en' ? 'ltr' : 'rtl';
    document.title = ui === 'en' ? 'Right Fit Slip' : 'رائٹ فٹ پرچی';
    document.querySelectorAll('[data-i]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i')); });
    document.querySelectorAll('[data-iph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-iph')); });
    document.querySelectorAll('[data-ia]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-ia'))); });
    document.querySelectorAll('[data-s]').forEach(function (el) { el.textContent = SL[sl][el.getAttribute('data-s')]; el.dir = sl === 'en' ? 'ltr' : 'rtl'; });
    document.querySelectorAll('[data-sph]').forEach(function (el) { el.placeholder = SL[sl][el.getAttribute('data-sph')]; });
    $('langBtn').textContent = ui === 'en' ? 'اردو' : 'English';
    document.querySelectorAll('[data-ui]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-ui') === ui)); });
    document.querySelectorAll('[data-sl]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-sl') === sl)); });
    document.querySelectorAll('[data-img]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-img') === sheetLang)); });
    $('slip').classList.toggle('en', sl === 'en');
    buildSlipLabels();
    $('photoThumb').alt = t('photoTitle'); $('sheetImg').alt = t('sheetTitle'); $('photoBig').alt = t('photoTitle');
    $('delBtn').textContent = t('delSlip'); delArmed = false;
    refreshBrand(); renderList(); updateBackupInfo();
  }
  function setLang(which, v) {
    lang[which] = v === 'en' ? 'en' : 'ur';
    try { localStorage.setItem('rf_lang', JSON.stringify(lang)); } catch (e) { /* ignore */ }
    if (which === 'slip') sheetLang = lang.slip;
    applyLang();
  }

  function refreshBrand() {
    var s = db.shop, tag = lang.slip === 'en' ? (s.tagEn || s.tag) : (s.tag || s.tagEn);
    $('o_ur').textContent = s.ur; $('o_en').textContent = s.en; $('o_en2').textContent = s.en2;
    $('o_tag').textContent = tag; $('o_tag').dir = lang.slip === 'en' ? 'ltr' : 'rtl'; $('o_ph').textContent = s.ph;
    $('shopTitle').textContent = (lang.ui === 'en' ? (s.en || s.ur) : (s.ur || s.en)) || t('shopFallback');
  }
  function collect() { var o = {}; FIELDS.forEach(function (id) { o[id] = $(id).value.trim(); }); o.photo = curPhoto; return o; }
  function fill(o) { FIELDS.forEach(function (id) { $(id).value = (o && o[id]) || ''; }); curPhoto = (o && o.photo) || ''; renderPhoto(); }
  function hasContent(o) { return !!o.photo || FIELDS.some(function (id) { return id !== 'no' && id !== 'date' && id !== 'hidayat' && o[id]; }); }

  function openEdit(id) {
    var s = id ? db.slips.filter(function (x) { return x.id === id; })[0] : null;
    editingId = s ? s.id : null;
    if (s) fill(s.data);
    else fill({ no: String(db.nextNo), date: today(), hidayat: db.shop.hid || '' });
    dirty = false;
    refreshBrand();
    $('delBtn').hidden = !s;
    show('edit'); push('edit');
  }
  function saveSlip(quiet) {
    var data = collect();
    if (editingId) {
      db.slips.forEach(function (s) { if (s.id === editingId) { s.data = data; s.updated = Date.now(); } });
    } else {
      editingId = Date.now();
      db.slips.push({ id: editingId, data: data, created: editingId, updated: editingId });
      var n = parseInt(data.no, 10);
      if (isNaN(n)) db.nextNo += 1; else db.nextNo = Math.max(db.nextNo, n + 1);
    }
    var ok = persist();
    dirty = false;
    $('delBtn').hidden = false;
    if (!quiet) toast(ok ? t('saved') : t('saveFail'));
    return ok;
  }
  function autosave() {
    if (!dirty) return;
    var d = collect();
    if (editingId || hasContent(d)) { saveSlip(true); toast(t('saved')); }
  }
  $('saveBtn').addEventListener('click', function () { saveSlip(false); });
  $('backBtn').addEventListener('click', back);
  $('addBtn').addEventListener('click', function () { openEdit(null); });

  var delArmed = false, delTimer;
  $('delBtn').addEventListener('click', function () {
    var b = $('delBtn');
    if (!delArmed) {
      delArmed = true; b.textContent = t('delSure');
      clearTimeout(delTimer); delTimer = setTimeout(function () { delArmed = false; b.textContent = t('delSlip'); }, 3500);
      return;
    }
    delArmed = false; b.textContent = t('delSlip');
    var gone = db.slips.filter(function (s) { return s.id === editingId; })[0];
    if (gone && gone.data.photo) idbDel(gone.data.photo).catch(function () {});
    if (!gone && curPhoto) idbDel(curPhoto).catch(function () {});
    db.slips = db.slips.filter(function (s) { return s.id !== editingId; });
    persist(); dirty = false; editingId = null; curPhoto = '';
    toast(t('deleted'));
    back();
  });

  /* ================= photo ================= */
  var thumbUrl = null;
  function renderPhoto() {
    var has = !!curPhoto;
    $('photoEmpty').hidden = has; $('photoBox').hidden = !has; $('photoDel').hidden = !has;
    if (thumbUrl) { URL.revokeObjectURL(thumbUrl); thumbUrl = null; }
    $('photoThumb').removeAttribute('src');
    if (has) {
      var wanted = curPhoto;
      idbGet(wanted).then(function (b) {
        if (b && wanted === curPhoto) { thumbUrl = URL.createObjectURL(b); $('photoThumb').src = thumbUrl; }
      }).catch(function () {});
    }
  }
  function shrink(file, maxSide, q) {
    var get = window.createImageBitmap ? createImageBitmap(file).catch(function () { return null; }) : Promise.resolve(null);
    return get.then(function (bmp) {
      if (bmp) return bmp;
      return new Promise(function (res, rej) {
        var u = URL.createObjectURL(file), im = new Image();
        im.onload = function () { URL.revokeObjectURL(u); res(im); }; im.onerror = rej; im.src = u;
      });
    }).then(function (src) {
      var k = Math.min(1, maxSide / Math.max(src.width, src.height));
      var c = document.createElement('canvas'); c.width = Math.round(src.width * k); c.height = Math.round(src.height * k);
      c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
      return new Promise(function (res) { c.toBlob(res, 'image/jpeg', q); });
    });
  }
  function attachPhoto(file) {
    if (!file) return;
    shrink(file, 1800, 0.82).then(function (blob) {
      var old = curPhoto, id = 'ph' + Date.now();
      return idbPut(id, blob).then(function () {
        curPhoto = id; dirty = true;
        if (old) idbDel(old).catch(function () {});
        renderPhoto(); toast(t('photoAdded'));
      });
    }).catch(function () { toast(t('photoFail')); });
  }
  $('camBtn').addEventListener('click', function () { $('fileCam').click(); });
  $('galBtn').addEventListener('click', function () { $('fileGal').click(); });
  ['fileCam', 'fileGal'].forEach(function (id) {
    $(id).addEventListener('change', function (e) { attachPhoto(e.target.files && e.target.files[0]); e.target.value = ''; });
  });
  $('photoDel').addEventListener('click', function () {
    if (!curPhoto) return;
    idbDel(curPhoto).catch(function () {});
    curPhoto = ''; dirty = true; renderPhoto(); toast(t('photoRemoved'));
  });
  $('photoOpen').addEventListener('click', function () {
    if (!thumbUrl) return;
    $('photoBig').src = thumbUrl; $('photoView').hidden = false;
  });
  $('photoView').addEventListener('click', function () { $('photoView').hidden = true; });

  /* auto-fill from the photo using the Claude API (needs the owner's own key) */
  var SCAN_PROMPT =
    'This is a photo of a handwritten Urdu tailor measurement slip (pent coat). The slip may be in Urdu or English. ' +
    'Read every value exactly as it is handwritten. Return ONLY one JSON object, no other text, with these string keys. ' +
    'Use an empty string for anything blank or unreadable, never guess. ' +
    'no = slip number, date = date, cname = customer name (keep the script as written), cell = mobile number, style = the style line, hidayat = any special instructions text. ' +
    'Right-hand column of the measurement grid, top to bottom: c_len (لمبائی / length), c_arm (بازو / sleeve), c_tera (تیرا / shoulder), c_chest (چھاتی / chest), c_waist (کمر / waist), c_cross (کراس بیک / cross back), c_neck (گلہ / neck). ' +
    'Left-hand column, top to bottom: p_waist (ویسٹ / waist), p_len (لمبائی / length), p_hip (ہپ / hip), p_gaddi (گدی), p_mori (موری), p_round (گول کیرا بٹن), p_straight (سیدھا کیرا بٹن). ' +
    'Lines below the grid: o_pf (ایک پاکٹ سامنے), o_ps (ایک پاکٹ سائیڈ), o_shalwar (شلوار پاکٹ), o_coat (کوٹ), o_pless (پلیٹ لیس پینٹ), o_dress (ڈریس پینٹ), o_shirt (شرٹ). ' +
    'Write fractions as 31½ or 22½. Keep Urdu text in Urdu script exactly as written, do not translate.';

  function getKey() { try { return localStorage.getItem('rf_key') || ''; } catch (e) { return ''; } }
  function scan() {
    if (!curPhoto) { toast(t('photoFirst')); return; }
    var key = getKey();
    if (!key) { toast(t('keyFirst')); return; }
    var btn = $('scanBtn'); btn.disabled = true; btn.textContent = t('scanning');
    idbGet(curPhoto).then(function (b) { if (!b) throw new Error('nophoto'); return blobToDataURL(b); }).then(function (url) {
      return fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: MODEL, max_tokens: 2000,
          messages: [{ role: 'user', content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: url.split(',')[1] } },
            { type: 'text', text: SCAN_PROMPT }
          ] }]
        })
      });
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) { var e = new Error((j && j.error && j.error.message) || ('HTTP ' + r.status)); e.status = r.status; throw e; }
        return j;
      });
    }).then(function (j) {
      var text = (j.content || []).map(function (c) { return c.text || ''; }).join('');
      var m = text.match(/\{[\s\S]*\}/);
      if (!m) throw new Error('parse');
      var o = JSON.parse(m[0]), n = 0;
      FIELDS.forEach(function (id) {
        var v = o[id];
        if (typeof v === 'number') v = String(v);
        if (typeof v === 'string' && v.trim()) { $(id).value = v.trim(); n++; }
      });
      dirty = true;
      toast(n ? t('filled', { n: n }) : t('nothingRead'));
    }).catch(function (e) {
      var msg = t('readFail');
      if (e && e.status === 401) msg = t('keyBad');
      else if (e && e.status === 429) msg = t('rate');
      else if (e && /Failed to fetch|NetworkError|Load failed/i.test(e.message || '')) msg = t('offline');
      toast(msg);
    }).then(function () { btn.disabled = false; btn.textContent = t('scan'); });
  }
  $('scanBtn').addEventListener('click', scan);

  /* ================= list ================= */
  function renderList() {
    var q = $('q').value.trim().toLowerCase();
    var items = db.slips.filter(function (s) {
      if (!q) return true;
      return [s.data.cname, s.data.cell, s.data.no].join(' ').toLowerCase().indexOf(q) > -1;
    }).sort(function (a, b) { return b.updated - a.updated; });
    $('count').textContent = countText(db.slips.length);
    var ul = $('list');
    if (!items.length) {
      ul.innerHTML = '<li class="empty">' + (db.slips.length ? t('emptyMatch') : t('empty0')) + '</li>';
      return;
    }
    ul.innerHTML = items.map(function (s) {
      var d = s.data;
      return '<li class="item"><button class="open" type="button" data-open="' + s.id + '">' +
        '<span class="nm">' + esc(d.cname || t('noName')) + '</span>' +
        '<span class="meta2"><span>' + esc(t('metaNo', { n: d.no || '-' })) + '</span><span dir="ltr">' + esc(d.date || '') + '</span>' + (d.cell ? '<span dir="ltr">' + esc(d.cell) + '</span>' : '') + (d.photo ? '<span>' + esc(t('hasPhoto')) + '</span>' : '') + '</span>' +
        '</button><button class="sh" type="button" data-share="' + s.id + '">' + esc(t('shareShort')) + '</button></li>';
    }).join('');
  }
  $('q').addEventListener('input', renderList);
  $('list').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var id = b.getAttribute('data-open') || b.getAttribute('data-share');
    var s = db.slips.filter(function (x) { return String(x.id) === id; })[0];
    if (!s) return;
    if (b.hasAttribute('data-open')) openEdit(s.id); else openSheet(s.data);
  });

  /* ================= settings ================= */
  var SHOP_IDS = { s_ur: 'ur', s_en: 'en', s_en2: 'en2', s_tag: 'tag', s_tagEn: 'tagEn', s_ph: 'ph', s_hid: 'hid' };
  function fillSettings() {
    Object.keys(SHOP_IDS).forEach(function (id) { $(id).value = db.shop[SHOP_IDS[id]] || ''; });
    $('apiKey').value = getKey();
  }
  Object.keys(SHOP_IDS).forEach(function (id) {
    $(id).addEventListener('input', function () { db.shop[SHOP_IDS[id]] = $(id).value; persist(); refreshBrand(); });
  });
  $('apiKey').addEventListener('input', function () {
    try { var v = $('apiKey').value.trim(); if (v) localStorage.setItem('rf_key', v); else localStorage.removeItem('rf_key'); } catch (e) { /* ignore */ }
  });
  $('settingsBtn').addEventListener('click', function () { fillSettings(); updateBackupInfo(); show('settings'); push('settings'); });
  $('setBackBtn').addEventListener('click', back);
  $('langBtn').addEventListener('click', function () { setLang('ui', lang.ui === 'en' ? 'ur' : 'en'); });
  document.querySelectorAll('[data-ui]').forEach(function (b) { b.addEventListener('click', function () { setLang('ui', b.getAttribute('data-ui')); }); });
  document.querySelectorAll('[data-sl]').forEach(function (b) { b.addEventListener('click', function () { setLang('slip', b.getAttribute('data-sl')); }); });

  function updateBackupInfo() {
    var last = null; try { last = localStorage.getItem('rf_last_backup'); } catch (e) { /* ignore */ }
    $('backupInfo').textContent = t('bkInfo', { c: countText(db.slips.length), last: last ? t('bkLast', { d: last }) : t('bkNone') });
  }
  function download(blob, name) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  $('exportBtn').addEventListener('click', function () {
    var out = JSON.parse(JSON.stringify(db)); out.photos = {};
    var ids = db.slips.map(function (s) { return s.data.photo; }).filter(Boolean);
    Promise.all(ids.map(function (id) {
      return idbGet(id).then(function (b) { return b ? blobToDataURL(b).then(function (u) { out.photos[id] = u; }) : null; }).catch(function () {});
    })).then(function () {
      var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
      var d = new Date(), stamp = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      download(blob, 'rightfit-backup-' + stamp + '.json');
      try { localStorage.setItem('rf_last_backup', today()); } catch (e) { /* ignore */ }
      updateBackupInfo(); toast(t('bkDone'));
    });
  });
  $('importBtn').addEventListener('click', function () { $('importFile').click(); });
  $('importFile').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var v;
      try { v = JSON.parse(r.result); if (!v || !Array.isArray(v.slips)) throw new Error('bad'); }
      catch (err) { toast(t('bkBad')); e.target.value = ''; return; }
      var have = {}; db.slips.forEach(function (s) { have[s.id] = true; });
      var added = 0;
      v.slips.forEach(function (s) { if (s && s.id && s.data && !have[s.id]) { db.slips.push(s); added++; } });
      if (v.shop) db.shop = Object.assign(db.shop, v.shop);
      db.nextNo = Math.max(db.nextNo, v.nextNo || 1);
      persist();
      var photos = v.photos || {};
      Promise.all(Object.keys(photos).map(function (id) {
        return fetch(photos[id]).then(function (x) { return x.blob(); }).then(function (b) { return idbPut(id, b); }).catch(function () {});
      })).then(function () {
        fillSettings(); refreshBrand(); updateBackupInfo(); renderList();
        toast(t('restored', { n: added }));
      });
      e.target.value = '';
    };
    r.readAsText(f);
  });

  /* ================= slip image ================= */
  var URDU = '"Noto Nastaliq Urdu","Noto Naskh Arabic","Jameel Noori Nastaleeq","Segoe UI",serif';
  var HAND = '"Caveat","Segoe Print","Comic Sans MS",cursive';
  var COND = '"Barlow Condensed","Arial Narrow",Arial,sans-serif';
  var AR = /[؀-ۿݐ-ݿ]/;
  var INK = '#141414', PEN = '#1f3fbf', MUTED = '#66655f';

  function put(ctx, text, x, cy, o) {
    text = String(text == null ? '' : text);
    if (!text.trim()) return;
    var rtl = AR.test(text), size = (rtl && o.sizeAr) || o.size;
    var fam = o.fam || (rtl ? URDU : (o.lat || COND));
    ctx.save();
    ctx.direction = rtl ? 'rtl' : 'ltr';
    ctx.textAlign = o.align || 'center';
    ctx.textBaseline = 'alphabetic';
    if (o.ls && !rtl && 'letterSpacing' in ctx) ctx.letterSpacing = o.ls;
    ctx.font = (o.w || 400) + ' ' + size + 'px ' + fam;
    if (o.maxW) {
      var w = ctx.measureText(text).width;
      if (w > o.maxW) { size = Math.max(12, Math.floor(size * o.maxW / w)); ctx.font = (o.w || 400) + ' ' + size + 'px ' + fam; }
    }
    var m = ctx.measureText(text);
    ctx.fillStyle = o.color || INK;
    ctx.fillText(text, x, cy + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
    ctx.restore();
  }
  function hline(ctx, x1, x2, y, w) { ctx.beginPath(); ctx.lineWidth = w || 3; ctx.strokeStyle = INK; ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); }

  function wrapLines(ctx, text, maxW, fontCss) {
    var out = [];
    ctx.save(); ctx.font = fontCss;
    String(text || '').split('\n').forEach(function (par) {
      var words = par.split(/\s+/).filter(Boolean), line = '';
      if (!words.length) { out.push(''); return; }
      ctx.direction = AR.test(par) ? 'rtl' : 'ltr';
      words.forEach(function (w) {
        var tt = line ? line + ' ' + w : w;
        if (line && ctx.measureText(tt).width > maxW) { out.push(line); line = w; } else line = tt;
      });
      out.push(line);
    });
    ctx.restore();
    while (out.length && !out[out.length - 1]) out.pop();
    return out;
  }

  function drawSlip(d, shop, L) {
    L = L === 'en' ? 'en' : 'ur';
    var S = SL[L], en = L === 'en';
    var labSize = en ? 42 : 34;
    var W = 1080, M = 34, rowH = 94, labW = 168, colW = (W - 2 * M - 30) / 2, optH = 84;
    var scratch = document.createElement('canvas').getContext('2d');
    var hidLines = wrapLines(scratch, d.hidayat, W - 2 * M - 60, '600 36px ' + URDU);
    var hidLineH = 64, hidTitleH = 76, hidH = hidTitleH + Math.max(2, hidLines.length) * hidLineH + 16;
    var y0 = M, y1 = y0 + 262, y2 = y1 + 176, gridY = y2 + 14, y3 = gridY + 7 * rowH;
    var styleY = y3 + 10, y4 = styleY + 90, optsY = y4 + 4, y5 = optsY + 4 * optH;
    var hidY = y5 + 16, noteY = hidY + hidH + 16, y6 = noteY + 118, H = y6 + M;
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(10, 10, W - 20, H - 20);

    /* header */
    var R = W - M - 8;
    put(ctx, shop.ur, R, y0 + 92, { align: 'right', size: 104, w: 700, maxW: 600 });
    put(ctx, shop.en, M + 8, y0 + 66, { align: 'left', size: 108, w: 700, lat: COND, maxW: 430 });
    var en2 = (shop.en2 || '').toUpperCase();
    if (en2) {
      ctx.save(); ctx.font = '700 36px ' + COND; if ('letterSpacing' in ctx) ctx.letterSpacing = '5px';
      var tw = Math.min(ctx.measureText(en2).width, 400); ctx.restore();
      ctx.fillStyle = INK; ctx.fillRect(M + 8, y0 + 110, tw + 30, 48);
      put(ctx, en2, M + 8 + 15, y0 + 134, { align: 'left', size: 36, w: 700, lat: COND, ls: '5px', color: '#ffffff', maxW: 400 });
    }
    var tag = en ? (shop.tagEn || shop.tag) : (shop.tag || shop.tagEn);
    put(ctx, tag, R, y0 + 182, { align: 'right', size: en ? 38 : 32, color: MUTED, maxW: W - 2 * M - 16 });
    put(ctx, shop.ph, R, y0 + 232, { align: 'right', size: 50, w: 600, lat: COND, ls: '3px', maxW: W - 2 * M - 16 });
    hline(ctx, M, W - M, y1 - 4, 3);

    /* meta */
    var half = (W - 2 * M - 34) / 2, mh = 86;
    function labelWidth(label, size) {
      ctx.save(); var ar = AR.test(label);
      ctx.font = '600 ' + size + 'px ' + (ar ? URDU : COND); ctx.direction = ar ? 'rtl' : 'ltr';
      var w = ctx.measureText(label).width; ctx.restore(); return w;
    }
    function metaItem(x, yy, label, val) {
      hline(ctx, x, x + half, yy + mh - 8, 3);
      var ls = en ? 40 : 36;
      put(ctx, label, x + half, yy + mh / 2 - 6, { align: 'right', size: ls, w: 600 });
      var lw = labelWidth(label, ls);
      put(ctx, val, x + half - lw - 18, yy + mh / 2 - 8, { align: 'right', size: 52, sizeAr: 42, w: 600, fam: AR.test(val || '') ? null : HAND, color: PEN, maxW: half - lw - 40 });
    }
    metaItem(M + half + 34, y1, S.no, d.no);
    metaItem(M, y1, S.date, d.date);
    metaItem(M + half + 34, y1 + mh, S.cname, d.cname);
    metaItem(M, y1 + mh, S.cell, d.cell);

    /* measurement grid */
    function column(x, list) {
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.strokeRect(x, gridY, colW, 7 * rowH);
      ctx.beginPath(); ctx.moveTo(x + colW - labW, gridY); ctx.lineTo(x + colW - labW, gridY + 7 * rowH); ctx.stroke();
      list.forEach(function (r, i) {
        var yy = gridY + i * rowH, cy = yy + rowH / 2;
        if (i > 0) hline(ctx, x, x + colW, yy, 3);
        put(ctx, labelOf(r, L), x + colW - labW / 2, cy, { size: labSize, w: 600, maxW: labW - 18 });
        put(ctx, d[r[0]], x + (colW - labW) / 2, cy, { size: 60, sizeAr: 40, w: 600, fam: AR.test(d[r[0]] || '') ? null : HAND, color: PEN, maxW: colW - labW - 24 });
      });
    }
    column(W - M - colW, COAT);
    column(M, PANT);

    /* style + options */
    function lineRow(xL, xR, yy, h, label, val) {
      hline(ctx, xL, xR, yy + h - 8, 3);
      put(ctx, label, xR, yy + h / 2 - 6, { align: 'right', size: labSize, w: 600 });
      var lw = labelWidth(label, labSize);
      put(ctx, val, xR - lw - 16, yy + h / 2 - 8, { align: 'right', size: 50, sizeAr: 40, w: 600, fam: AR.test(val || '') ? null : HAND, color: PEN, maxW: (xR - xL) - lw - 36 });
    }
    lineRow(M, W - M, styleY, 90, S.style, d.style);
    var midGap = 22, sw = (W - 2 * M - midGap) / 2;
    OPT_R.forEach(function (r, i) { lineRow(M + sw + midGap, W - M, optsY + i * optH, optH, labelOf(r, L), d[r[0]]); });
    OPT_L.forEach(function (r, i) { lineRow(M, M + sw, optsY + i * optH, optH, labelOf(r, L), d[r[0]]); });

    /* instructions box */
    ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.strokeRect(M, hidY, W - 2 * M, hidH);
    put(ctx, S.hid, W - M - 26, hidY + hidTitleH / 2 - 2, { align: 'right', size: en ? 46 : 40, w: 700 });
    hline(ctx, M, W - M, hidY + hidTitleH - 6, 3);
    hidLines.forEach(function (ln, i) {
      put(ctx, ln, W - M - 26, hidY + hidTitleH + i * hidLineH + hidLineH / 2 - 2, { align: 'right', size: 46, sizeAr: 36, w: 600, fam: AR.test(ln) ? null : HAND, color: PEN, maxW: W - 2 * M - 52 });
    });

    /* note bar */
    ctx.fillStyle = INK; ctx.fillRect(M, noteY, W - 2 * M, 118);
    var ns = en ? 36 : 30;
    put(ctx, S.note1, W / 2, noteY + 40, { size: ns, w: 600, color: '#ffffff', maxW: W - 2 * M - 30 });
    put(ctx, S.note2, W / 2, noteY + 84, { size: ns, w: 600, color: '#ffffff', maxW: W - 2 * M - 30 });
    return c;
  }

  function withTimeout(p, ms) { return Promise.race([p, new Promise(function (r) { setTimeout(r, ms); })]); }
  function loadFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return withTimeout(Promise.all([
      document.fonts.load('700 40px "Noto Nastaliq Urdu"', 'رائٹ فٹ'),
      document.fonts.load('600 40px "Noto Nastaliq Urdu"', 'نمبر'),
      document.fonts.load('600 40px "Caveat"', '31'),
      document.fonts.load('600 40px "Barlow Condensed"', 'Right'),
      document.fonts.load('700 40px "Barlow Condensed"', 'Right')
    ]).catch(function () {}), 2500);
  }

  /* ================= share sheet ================= */
  var sheetBlob = null, sheetName = 'slip.png', sheetUrl = null, sheetTitle = '', sheetData = null, sheetLang = lang.slip;
  function renderSheet(firstOpen) {
    var data = sheetData;
    return loadFonts().then(function () {
      var canvas = drawSlip(data, db.shop, sheetLang);
      return new Promise(function (res) {
        canvas.toBlob(function (blob) {
          if (!blob) { toast(t('imgFail')); res(); return; }
          if (sheetUrl) URL.revokeObjectURL(sheetUrl);
          sheetBlob = blob; sheetUrl = URL.createObjectURL(blob);
          sheetName = 'slip-' + (data.no || 'new') + (sheetLang === 'en' ? '-en' : '') + '.png';
          sheetTitle = (db.shop.en || 'Slip') + ' slip #' + (data.no || '');
          $('sheetImg').src = sheetUrl;
          document.querySelectorAll('[data-img]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-img') === sheetLang)); });
          if (firstOpen) { $('toast').classList.remove('on'); $('sheet').hidden = false; sheetOpen = true; push('sheet'); }
          res();
        }, 'image/png');
      });
    });
  }
  function openSheet(data) {
    toast(t('imgMaking'));
    sheetData = data; sheetLang = lang.slip;
    renderSheet(true);
  }
  document.querySelectorAll('[data-img]').forEach(function (b) {
    b.addEventListener('click', function () { var v = b.getAttribute('data-img'); if (v === sheetLang) return; sheetLang = v; renderSheet(false); });
  });
  function closeSheet(fromPop) {
    $('sheet').hidden = true; sheetOpen = false;
    if (!fromPop) { skipPop = true; history.back(); }
  }
  $('sheetClose').addEventListener('click', function () { closeSheet(false); });
  $('sheet').addEventListener('click', function (e) { if (e.target === $('sheet')) closeSheet(false); });
  $('sheetSave').addEventListener('click', function () { if (sheetBlob) { download(sheetBlob, sheetName); toast(t('imgDownloaded')); } });
  $('sheetShare').addEventListener('click', function () {
    if (!sheetBlob) return;
    var file;
    try { file = new File([sheetBlob], sheetName, { type: 'image/png' }); } catch (e) { file = null; }
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: sheetTitle }).catch(function (err) { if (err && err.name !== 'AbortError') toast(t('shareFail')); });
    } else {
      toast(t('shareNo'));
    }
  });
  $('shareBtn').addEventListener('click', function () {
    var data = collect();
    if (dirty && (editingId || hasContent(data))) saveSlip(true);
    openSheet(data);
  });

  /* ================= install button ================= */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; $('installBtn').hidden = false; });
  $('installBtn').addEventListener('click', function () {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(function () { deferred = null; $('installBtn').hidden = true; });
  });
  window.addEventListener('appinstalled', function () { $('installBtn').hidden = true; });

  /* ================= start ================= */
  applyLang();
  if (!persist() && !storageOk) toast(t('storageOff'));
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  window.__rf = { drawSlip: drawSlip, db: db, FIELDS: FIELDS, loadFonts: loadFonts };
})();
