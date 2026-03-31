/* ============================================================
   STEM Made Easy — Interactive Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initParallax();
  initMobileDropdowns();
  highlightActiveNav();
  initFarsiTooltips();
});

/* --- Sticky Navbar with Scroll Effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (!navbar) return;

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a:not(.nav-link-label)').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && 
          !links.contains(e.target) && 
          !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* --- Scroll Reveal Animations via IntersectionObserver --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Parallax Effect on Hero Background --- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
    if (scrollY < heroHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    }
  }, { passive: true });
}

/* --- Mobile Dropdown Toggle --- */
function initMobileDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dd => {
    const label = dd.querySelector('.nav-link-label');
    if (label) {
      label.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other dropdowns first
          dropdowns.forEach(other => {
            if (other !== dd) other.classList.remove('open');
          });
          dd.classList.toggle('open');
        }
        // On desktop, let the <a> tag navigate normally
      });
    }
  });
}

/* --- Highlight Active Nav Link --- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const links = document.querySelectorAll('.nav-links a, .dropdown-menu a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      // Resolve the href to a full URL, then compare pathnames
      const resolved = new URL(href, window.location.href).pathname.toLowerCase();
      if (resolved === currentPath) {
        link.classList.add('active');
        // Also highlight parent dropdown if exists
        const dd = link.closest('.nav-dropdown');
        if (dd) {
          const parentLabel = dd.querySelector('.nav-link-label');
          if (parentLabel) parentLabel.classList.add('active');
        }
      }
    }
  });
}

/* --- Farsi Translations for Vocabulary Terms --- */
const farsiDictionary = {
  "Rotation": "چرخش",
  "Revolution": "گردش مداری",
  "Axis tilt": "انحراف محوری",
  "Solstice": "انقلابین",
  "Equinox": "اعتدالین",
  "Tide": "جزر و مد",
  "Eclipse": "گرفتگی (خسوف/کسوف)",
  "Spring tides": "جزر و مد بهاری (مهکشند)",
  "Neap tides": "جزر و مد کهکشند",
  "Watershed": "حوضه آبریز",
  "Water table": "سطح ایستابی",
  "Aquifer": "سفره آب زیرزمینی",
  "Groundwater": "آب زیرزمینی",
  "Runoff": "رواناب",
  "Karst topography": "توپوگرافی کارست",
  "Erosion": "فرسایش",
  "Deposition": "رسوب‌گذاری",
  "Tributary": "شاخه رود / ریزابه",
  "Mineral": "کانی / معدنی",
  "Luster": "جلا",
  "Hardness": "سختی",
  "Streak": "رنگ خاکه",
  "Cleavage": "رخ (کلیواژ)",
  "Fracture": "شکستگی",
  "Crystal structure": "ساختار بلوری",
  "Ore": "سنگ معدن",
  "Quartz": "کوارتز (دُرّ کوهی)",
  "Feldspar": "فلدسپات",
  "Calcite": "کلسیت",
  "Hematite": "هماتیت",
  "Galena": "گالِنا",
  "Talc": "تالک",
  "Diamond": "الماس",
  "Halite": "هالیت (سنگ نمک)",
  "Salinity": "شوری",
  "Ocean current": "جریان اقیانوسی",
  "Thermohaline circulation": "گردش ترموهالین",
  "Upwelling": "فراچاهش",
  "Continental shelf": "فلات قاره",
  "Mid-ocean ridge": "پشته میانی اقیانوس",
  "Ocean trench": "درازگودال اقیانوسی",
  "Estuary": "خور (مصب)",
  "Tectonic plate": "صفحه تکتونیکی",
  "Convection current": "جریان همرفتی",
  "Convergent boundary": "مرز همگرا",
  "Divergent boundary": "مرز واگرا",
  "Transform boundary": "مرز گسل تبدیل",
  "Subduction": "فرورانش",
  "Pangaea": "پنجیا (ابر قاره)",
  "Fault": "گسل",
  "Natural resource": "منبع طبیعی",
  "Renewable resource": "منبع تجدیدپذیر",
  "Nonrenewable resource": "منبع تجدیدناپذیر",
  "Fossil fuel": "سوخت فسیلی",
  "Sustainability": "پایداری",
  "Reclamation": "احیای زمین",
  "Igneous rock": "سنگ آذرین",
  "Sedimentary rock": "سنگ رسوبی",
  "Metamorphic rock": "سنگ دگرگونی",
  "Rock cycle": "چرخه سنگ",
  "Weathering": "هوازدگی",
  "Compaction & Cementation": "تراکم و سیمانی شدن",
  "Crust": "پوسته",
  "Mantle": "گوشته",
  "Outer core": "هسته خارجی",
  "Inner core": "هسته داخلی",
  "Fossil": "فسیل",
  "Superposition": "اصل رویهم‌گذاری",
  "Cross-cutting relationships": "روابط متقاطع",
  "Index fossil": "فسیل شاخص",
  "Relative dating": "تاریخ‌گذاری نسبی",
  "Absolute (radiometric) dating": "تاریخ‌گذاری مطلق (رادیومتریک)",
  "Radioactive decay": "واپاشی پرتوزا",
  "Half-life": "نیمه‌عمر",
  "Geologic time scale": "مقیاس زمانی زمین‌شناسی",
  "Atmosphere": "جو (اتمسفر)",
  "Troposphere": "تروپوسفر",
  "Stratosphere": "استراتوسفر",
  "Ozone layer": "لایه ازن",
  "Greenhouse effect": "اثر گلخانه‌ای",
  "Greenhouse gases": "گازهای گلخانه‌ای",
  "Air pressure": "فشار هوا",
  "Nitrogen (N₂)": "نیتروژن",
  "Oxygen (O₂)": "اکسیژن",
  "Argon": "آرگون",
  "Carbon dioxide (CO₂)": "دی‌اکسید کربن",
  "Water vapor, methane, ozone": "بخار آب، متان، ازن",
  "Big Bang theory": "نظریه مهبانگ",
  "Galaxy": "کهکشان",
  "Light-year": "سال نوری",
  "Nebula": "سحابی",
  "Star": "ستاره",
  "Solar system": "منظومه شمسی",
  "Asteroid": "سیارک",
  "Comet": "دنباله‌دار",
  "Meteor": "شهاب",
  "Dwarf planet": "سیاره کوتوله",
  "Weather": "آب و هوا",
  "Climate": "اقلیم",
  "Air mass": "توده هوا",
  "Front": "جبهه هوا",
  "Convection": "همرفت",
  "Coriolis effect": "اثر کوریولیس",
  "Jet stream": "رودباد (جت استریم)",
  "Climate change": "تغییر اقلیم",
  "Adaptation": "سازگاری",
  "Physical (structural) adaptation": "سازگاری فیزیکی (ساختاری)",
  "Behavioral adaptation": "سازگاری رفتاری",
  "Camouflage": "استتار",
  "Mimicry": "تقلید (میمیکری)",
  "Habitat": "زیستگاه",
  "Biome": "زیست‌بوم",
  "Thick fur or blubber": "خز یا چربی ضخیم",
  "Large ears": "گوش‌های بزرگ",
  "Webbed feet": "پاهای پره‌دار",
  "Sharp claws or teeth": "چنگال یا دندان‌های تیز",
  "Thorns or spines": "خارها",
  "Succession": "توالی",
  "Primary succession": "توالی اولیه",
  "Secondary succession": "توالی ثانویه",
  "Pioneer species": "گونه‌های پیشگام",
  "Climax community": "جامعه اوج",
  "Eutrophication": "تغذیه‌گرایی (اتریفیکاسیون)",
  "Limiting factor": "عامل محدودکننده",
  "Carrying capacity": "ظرفیت برد",
  "Ecosystem": "اکوسیستم",
  "Biotic factor": "عامل زیستی",
  "Abiotic factor": "عامل غیرزیستی",
  "Producer (Autotroph)": "تولیدکننده (اتوتروف)",
  "Consumer (Heterotroph)": "مصرف‌کننده (هتروتروف)",
  "Decomposer": "تجزیه‌کننده",
  "Food chain": "زنجیره غذایی",
  "Food web": "شبکه غذایی",
  "Energy pyramid": "هرم انرژی",
  "Evolution": "فرگشت (تکامل)",
  "Natural selection": "انتخاب طبیعی",
  "Mutation": "جهش",
  "Extinction": "انقراض",
  "Variation": "تنوع",
  "Homologous structures": "ساختارهای همتا",
  "Vestigial structures": "ساختارهای تحلیل‌رفته",
  "DNA (deoxyribonucleic acid)": "اسید دئوکسی ریبونوکلئیک (DNA)",
  "Gene": "ژن",
  "Chromosome": "کروموزوم",
  "Trait": "صفت",
  "Allele": "آلل",
  "Dominant allele": "آلل غالب",
  "Recessive allele": "آلل مغلوب",
  "Genotype": "ژنوتیپ",
  "Phenotype": "فنوتیپ",
  "Homozygous": "هموزیگوت",
  "Heterozygous": "هتروزیگوت",
  "Mitosis": "میتوز",
  "Meiosis": "میوز",
  "Habitat destruction": "تخریب زیستگاه",
  "Deforestation": "جنگل‌زدایی",
  "Pollution": "آلودگی",
  "Invasive species": "گونه‌های مهاجم",
  "Endangered species": "گونه‌های در معرض خطر",
  "Conservation": "حفاظت",
  "Cell": "سلول",
  "Tissue": "بافت",
  "Organ": "اندام",
  "Organ System": "دستگاه",
  "Organism": "موجود زنده",
  "Photosynthesis": "فتوسنتز",
  "Cellular respiration": "تنفس سلولی",
  "Chloroplast": "کلروپلاست",
  "Chlorophyll": "کلروفیل",
  "Mitochondria": "میتوکندری",
  "Glucose": "گلوکز",
  "ATP (adenosine triphosphate)": "آدنوزین تری‌فسفات (ATP)",
  "Autotroph (Producer)": "اتوتروف (تولیدکننده)",
  "Heterotroph (Consumer)": "هتروتروف (مصرف‌کننده)",
  "Population": "جمعیت",
  "Community": "جامعه زیستی",
  "Predator": "شکارچی",
  "Prey": "شکار",
  "Competition": "رقابت",
  "Cooperation": "همکاری",
  "Symbiosis": "هم‌زیستی",
  "Niche": "کنام (نیچ)",
  "Compound": "ترکیب",
  "Chemical bond": "پیوند شیمیایی",
  "Molecule": "مولکول",
  "Chemical formula": "فرمول شیمیایی",
  "Chemical equation": "معادله شیمیایی",
  "Electric charge": "بار الکتریکی",
  "Static electricity": "الکتریسیته ساکن",
  "Like charges repel": "بارهای همنام یکدیگر را دفع می‌کنند",
  "opposite charges attract": "بارهای ناهمنام یکدیگر را جذب می‌کنند",
  "Charging by friction": "باردار شدن به روش مالش",
  "Electric discharge": "تخلیه الکتریکی",
  "Electric current": "جریان الکتریکی",
  "Voltage": "ولتاژ",
  "Resistance": "مقاومت",
  "Conductor": "رسانا",
  "Insulator": "عایق",
  "Magnet": "آهنربا",
  "Magnetic field": "میدان مغناطیسی",
  "Magnetic poles": "قطب‌های مغناطیسی",
  "Electromagnet": "آهنربای الکتریکی",
  "Electromagnetic wave": "موج الکترومغناطیسی",
  "Electromagnetic spectrum": "طیف الکترومغناطیسی",
  "Wavelength": "طول موج",
  "Frequency": "فرکانس",
  "Speed of light": "سرعت نور",
  "Energy": "انرژی",
  "Stored energy": "انرژی ذخیره‌شده",
  "Potential energy": "انرژی پتانسیل",
  "Gravitational potential energy": "انرژی پتانسیل گرانشی",
  "Elastic potential energy": "انرژی پتانسیل کشسانی",
  "Chemical energy": "انرژی شیمیایی",
  "Kinetic energy": "انرژی جنبشی",
  "Mechanical energy": "انرژی مکانیکی",
  "Thermal energy (heat)": "انرژی گرمایی (حرارتی)",
  "Light energy": "انرژی نورانی",
  "Sound energy": "انرژی صوتی",
  "Atom": "اتم",
  "Element": "عنصر",
  "Proton": "پروتون",
  "Neutron": "نوترون",
  "Electron": "الکترون",
  "Nucleus": "هسته",
  "Atomic number": "عدد اتمی",
  "Mass number": "عدد جرمی",
  "Solid": "جامد",
  "Liquid": "مایع",
  "Gas": "گاز",
  "Atomic mass": "جرم اتمی",
  "Isotopes": "ایزوتوپ‌ها",
  "Valence electrons": "الکترون‌های ظرفیت",
  "Period": "دوره (تناوب)",
  "Group (Family)": "گروه (خانواده)",
  "Mass": "جرم",
  "Volume": "حجم",
  "Density": "چگالی",
  "Color, shape, texture": "رنگ، شکل، بافت",
  "Boiling point / Melting point": "نقطه جوش / نقطه ذوب",
  "Conductivity": "رسانایی",
  "Malleability": "چکش‌خواری",
  "Ductility": "شکل‌پذیری (انعطاف‌پذیری)",
  "Solubility": "انحلال‌پذیری",
  "Magnetism": "خاصیت مغناطیسی",
  "Reactivity": "واکنش‌پذیری",
  "Flammability": "اشتعال‌پذیری",
  "Oxidation": "اکسیداسیون",
  "Acidity/Basicity": "اسیدیته / بازیته",
  "Wave": "موج",
  "Transverse wave": "موج عرضی",
  "Longitudinal wave": "موج طولی",
  "Medium": "محیط (ماده واسط)",
  "Mechanical wave": "موج مکانیکی",
  "Crest": "قله موج",
  "Trough": "دره موج",
  "Compression": "تراکم",
  "Rarefaction": "انبساط (رقیق‌شدگی)",
  "Amplitude": "دامنه",
  "Speed": "تندی",
  "Velocity": "سرعت",
  "Acceleration": "شتاب",
  "Force": "نیرو",
  "Net force": "نیروی خالص",
  "Balanced forces": "نیروهای متوازن",
  "Unbalanced forces": "نیروهای نامتوازن",
  "Friction": "اصطکاک",
  "Gravity": "گرانش",
  "Work": "کار"
};

function initFarsiTooltips() {
  const vocabTerms = document.querySelectorAll('.vocab-list li strong');
  
  vocabTerms.forEach(term => {
    // Attempt an exact match, stripping colons or dashes if accidentally included
    let text = term.innerText.replace(/[^a-zA-Z0-9\s()₂\-&/,]/g, "").trim();
    if (farsiDictionary[text]) {
      term.classList.add('farsi-tooltip');
      term.setAttribute('data-fa', farsiDictionary[text]);
    } else {
      // Fallback
      let alternativeText = term.innerText.trim();
      if(farsiDictionary[alternativeText]){
          term.classList.add('farsi-tooltip');
          term.setAttribute('data-fa', farsiDictionary[alternativeText]);
      }
    }
  });
}
