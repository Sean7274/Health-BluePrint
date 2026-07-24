/* Health Blueprint — UI translations
   Language codes follow standard IETF tags. "zh-CN" = Simplified Chinese,
   "zh-TW" = Traditional Chinese. Add a new language by copying the "en"
   block and translating every value; keys must stay identical. */

window.I18N = {
  meta: {
    en: { label: "English", dir: "ltr" },
    "zh-CN": { label: "简体中文", dir: "ltr" },
    "zh-TW": { label: "繁體中文", dir: "ltr" },
    es: { label: "Español", dir: "ltr" },
    fr: { label: "Français", dir: "ltr" },
    de: { label: "Deutsch", dir: "ltr" },
    pt: { label: "Português", dir: "ltr" },
    ru: { label: "Русский", dir: "ltr" },
    ar: { label: "العربية", dir: "rtl" },
    ja: { label: "日本語", dir: "ltr" },
    ko: { label: "한국어", dir: "ltr" },
    hi: { label: "हिन्दी", dir: "ltr" }
  },

  strings: {
    en: {
      brand: { name: "Health Blueprint", tagline: "Your trusted path to healthcare in China" },
      nav: { home: "Home", howItWorks: "How It Works", contact: "Contact" },
      fontSize: { label: "Text size", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Find the right hospital in China — with people to guide you there",
        subtitle: "Health Blueprint helps patients from around the world find licensed hospitals, compare treatment programs, and connect with trusted local agents who take care of everything — travel, translation, and support — every step of the way.",
        ctaStart: "Start Your Search",
        trust1: "Licensed hospitals only",
        trust2: "Multilingual support agents",
        trust3: "Guidance from arrival to departure"
      },
      steps: {
        area: "Step 1 · Choose a Region",
        hospital: "Step 2 · Choose a Hospital",
        program: "Step 3 · Choose a Program",
        agent: "Step 4 · Choose Your Agent"
      },
      filters: {
        areaLabel: "Region",
        allAreas: "All Regions",
        specialtyLabel: "Type of Care",
        allSpecialties: "All Types of Care",
        searchPlaceholder: "Search hospitals...",
        resultsCount: "{n} hospitals found",
        noResults: "No hospitals match your filters. Try changing your selection."
      },
      hospital: {
        viewPrograms: "View Programs",
        programsAvailable: "{n} programs available",
        aboutTitle: "About this hospital",
        programsTitle: "Available Programs"
      },
      program: {
        viewDetails: "View Details",
        duration: "Typical duration",
        priceRange: "Estimated cost",
        included: "What's included",
        selectProgram: "Select This Program",
        agentsTitle: "Available Agents for This Program",
        agentsSubtitle: "These agents will take care of you throughout your trip to China — from planning to your safe return home."
      },
      agent: {
        yearsExp: "{n} years of experience",
        languagesSpoken: "Languages spoken",
        specialtiesLabel: "Specialties",
        servicesLabel: "Services included",
        selectAgent: "Request This Agent",
        rating: "Rating"
      },
      contact: {
        title: "Request a Consultation",
        subtitle: "Tell us a bit about yourself and we'll connect you with your selected agent within 1 business day.",
        name: "Full name",
        email: "Email address",
        phone: "Phone / WhatsApp number",
        country: "Country of residence",
        preferredLanguage: "Preferred language",
        message: "Tell us about your needs",
        messagePlaceholder: "e.g. traveling with my mother, need wheelchair assistance, prefer late September...",
        submit: "Send Request",
        success: "Thank you! Your request has been sent. Your agent will contact you within 1 business day.",
        requiredNote: "* Required fields",
        summaryHospital: "Hospital",
        summaryProgram: "Program",
        summaryAgent: "Agent"
      },
      footer: {
        aboutTitle: "About Health Blueprint",
        aboutText: "Health Blueprint connects international patients with licensed hospitals and trusted local agents in China, making healthcare travel simple and safe for people of all ages.",
        disclaimer: "Health Blueprint is a directory and concierge-matching service. We do not provide medical advice or perform medical procedures. Always consult a licensed physician.",
        contactUs: "Contact us",
        rights: "All rights reserved."
      },
      common: { back: "Back", learnMore: "Learn more", close: "Close", viewAll: "View all" },
      specialties: {
        checkup: "Health Checkup",
        oncology: "Cancer Care",
        tcm: "Traditional Chinese Medicine",
        cosmetic: "Cosmetic & Dermatology",
        dental: "Dental Care",
        fertility: "Fertility & IVF",
        orthopedics: "Orthopedics",
        cardiology: "Cardiology"
      },
      areas: {
        beijing: "Beijing", shanghai: "Shanghai", guangzhou: "Guangzhou",
        shenzhen: "Shenzhen", hainan: "Hainan (Boao)", chengdu: "Chengdu",
        xian: "Xi'an", hangzhou: "Hangzhou"
      }
    },

    "zh-CN": {
      brand: { name: "健康蓝图", tagline: "您通往中国医疗的信赖之路" },
      nav: { home: "首页", howItWorks: "使用流程", contact: "联系我们" },
      fontSize: { label: "字体大小", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "在中国找到合适的医院——并有专人全程陪同",
        subtitle: "健康蓝图帮助来自世界各地的患者找到正规医院、比较治疗项目，并联系值得信赖的本地服务人员，为您安排出行、翻译和全程陪护。",
        ctaStart: "开始查找",
        trust1: "仅合作正规医院",
        trust2: "多语言服务人员",
        trust3: "从抵达到返程全程陪伴"
      },
      steps: {
        area: "第一步 · 选择地区",
        hospital: "第二步 · 选择医院",
        program: "第三步 · 选择项目",
        agent: "第四步 · 选择您的服务人员"
      },
      filters: {
        areaLabel: "地区",
        allAreas: "所有地区",
        specialtyLabel: "服务类型",
        allSpecialties: "所有服务类型",
        searchPlaceholder: "搜索医院...",
        resultsCount: "找到 {n} 家医院",
        noResults: "没有符合条件的医院，请尝试更改筛选条件。"
      },
      hospital: {
        viewPrograms: "查看项目",
        programsAvailable: "{n} 个项目可选",
        aboutTitle: "医院简介",
        programsTitle: "可选项目"
      },
      program: {
        viewDetails: "查看详情",
        duration: "预计时长",
        priceRange: "预计费用",
        included: "服务内容",
        selectProgram: "选择此项目",
        agentsTitle: "该项目可选服务人员",
        agentsSubtitle: "这些服务人员将在您整个中国之旅中全程照顾您——从行程安排到平安返程。"
      },
      agent: {
        yearsExp: "{n} 年经验",
        languagesSpoken: "会说的语言",
        specialtiesLabel: "擅长领域",
        servicesLabel: "服务内容",
        selectAgent: "预约此服务人员",
        rating: "评分"
      },
      contact: {
        title: "预约咨询",
        subtitle: "请留下您的基本信息，我们会在1个工作日内为您联系所选的服务人员。",
        name: "姓名",
        email: "电子邮箱",
        phone: "电话 / WhatsApp 号码",
        country: "所在国家",
        preferredLanguage: "首选语言",
        message: "请告诉我们您的需求",
        messagePlaceholder: "例如：与母亲同行、需要轮椅协助、希望九月下旬出行……",
        submit: "发送请求",
        success: "感谢您！请求已发送，服务人员将在1个工作日内与您联系。",
        requiredNote: "* 为必填项",
        summaryHospital: "医院",
        summaryProgram: "项目",
        summaryAgent: "服务人员"
      },
      footer: {
        aboutTitle: "关于健康蓝图",
        aboutText: "健康蓝图为国际患者连接中国的正规医院与值得信赖的本地服务人员，让各年龄段的人都能安心、便捷地赴华就医。",
        disclaimer: "健康蓝图是一个医院信息目录及服务人员匹配平台，不提供医疗建议或医疗操作，请务必咨询执业医师。",
        contactUs: "联系我们",
        rights: "版权所有。"
      },
      common: { back: "返回", learnMore: "了解更多", close: "关闭", viewAll: "查看全部" },
      specialties: {
        checkup: "健康体检",
        oncology: "肿瘤治疗",
        tcm: "中医调理",
        cosmetic: "美容皮肤科",
        dental: "牙科",
        fertility: "生育与试管婴儿",
        orthopedics: "骨科",
        cardiology: "心脏科"
      },
      areas: {
        beijing: "北京", shanghai: "上海", guangzhou: "广州",
        shenzhen: "深圳", hainan: "海南（博鳌）", chengdu: "成都",
        xian: "西安", hangzhou: "杭州"
      }
    },

    "zh-TW": {
      brand: { name: "健康藍圖", tagline: "您通往中國醫療的信賴之路" },
      nav: { home: "首頁", howItWorks: "使用流程", contact: "聯絡我們" },
      fontSize: { label: "字體大小", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "在中國找到合適的醫院——並有專人全程陪同",
        subtitle: "健康藍圖協助來自世界各地的患者找到合法醫院、比較治療項目，並聯繫值得信賴的當地服務人員，為您安排出行、翻譯與全程陪護。",
        ctaStart: "開始查找",
        trust1: "僅合作合法醫院",
        trust2: "多語言服務人員",
        trust3: "從抵達到返程全程陪伴"
      },
      steps: {
        area: "第一步 · 選擇地區",
        hospital: "第二步 · 選擇醫院",
        program: "第三步 · 選擇項目",
        agent: "第四步 · 選擇您的服務人員"
      },
      filters: {
        areaLabel: "地區",
        allAreas: "所有地區",
        specialtyLabel: "服務類型",
        allSpecialties: "所有服務類型",
        searchPlaceholder: "搜尋醫院...",
        resultsCount: "找到 {n} 家醫院",
        noResults: "沒有符合條件的醫院，請嘗試更改篩選條件。"
      },
      hospital: {
        viewPrograms: "查看項目",
        programsAvailable: "{n} 個項目可選",
        aboutTitle: "醫院簡介",
        programsTitle: "可選項目"
      },
      program: {
        viewDetails: "查看詳情",
        duration: "預計時長",
        priceRange: "預計費用",
        included: "服務內容",
        selectProgram: "選擇此項目",
        agentsTitle: "該項目可選服務人員",
        agentsSubtitle: "這些服務人員將在您整趟中國旅程中全程照顧您——從行程安排到平安返程。"
      },
      agent: {
        yearsExp: "{n} 年經驗",
        languagesSpoken: "會說的語言",
        specialtiesLabel: "擅長領域",
        servicesLabel: "服務內容",
        selectAgent: "預約此服務人員",
        rating: "評分"
      },
      contact: {
        title: "預約諮詢",
        subtitle: "請留下您的基本資料，我們會在1個工作日內為您聯繫所選的服務人員。",
        name: "姓名",
        email: "電子郵箱",
        phone: "電話 / WhatsApp 號碼",
        country: "所在國家",
        preferredLanguage: "首選語言",
        message: "請告訴我們您的需求",
        messagePlaceholder: "例如：與母親同行、需要輪椅協助、希望九月下旬出行……",
        submit: "送出請求",
        success: "感謝您！請求已送出，服務人員將在1個工作日內與您聯繫。",
        requiredNote: "* 為必填欄位",
        summaryHospital: "醫院",
        summaryProgram: "項目",
        summaryAgent: "服務人員"
      },
      footer: {
        aboutTitle: "關於健康藍圖",
        aboutText: "健康藍圖為國際患者連接中國的合法醫院與值得信賴的當地服務人員，讓各年齡層的人都能安心、便捷地赴中就醫。",
        disclaimer: "健康藍圖是醫院資訊目錄及服務人員媒合平台，不提供醫療建議或醫療行為，請務必諮詢執業醫師。",
        contactUs: "聯絡我們",
        rights: "版權所有。"
      },
      common: { back: "返回", learnMore: "了解更多", close: "關閉", viewAll: "查看全部" },
      specialties: {
        checkup: "健康檢查",
        oncology: "腫瘤治療",
        tcm: "中醫調理",
        cosmetic: "美容皮膚科",
        dental: "牙科",
        fertility: "生育與試管嬰兒",
        orthopedics: "骨科",
        cardiology: "心臟科"
      },
      areas: {
        beijing: "北京", shanghai: "上海", guangzhou: "廣州",
        shenzhen: "深圳", hainan: "海南（博鰲）", chengdu: "成都",
        xian: "西安", hangzhou: "杭州"
      }
    },

    es: {
      brand: { name: "Health Blueprint", tagline: "Su camino de confianza hacia la atención médica en China" },
      nav: { home: "Inicio", howItWorks: "Cómo funciona", contact: "Contacto" },
      fontSize: { label: "Tamaño de texto", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Encuentre el hospital adecuado en China, con personas que lo guíen",
        subtitle: "Health Blueprint ayuda a pacientes de todo el mundo a encontrar hospitales certificados, comparar programas de tratamiento y conectarse con agentes locales de confianza que se encargan de todo: viajes, traducción y apoyo en cada paso.",
        ctaStart: "Comenzar búsqueda",
        trust1: "Solo hospitales certificados",
        trust2: "Agentes multilingües",
        trust3: "Acompañamiento desde la llegada hasta el regreso"
      },
      steps: {
        area: "Paso 1 · Elija una región",
        hospital: "Paso 2 · Elija un hospital",
        program: "Paso 3 · Elija un programa",
        agent: "Paso 4 · Elija su agente"
      },
      filters: {
        areaLabel: "Región",
        allAreas: "Todas las regiones",
        specialtyLabel: "Tipo de atención",
        allSpecialties: "Todos los tipos de atención",
        searchPlaceholder: "Buscar hospitales...",
        resultsCount: "{n} hospitales encontrados",
        noResults: "Ningún hospital coincide con sus filtros. Intente cambiar su selección."
      },
      hospital: {
        viewPrograms: "Ver programas",
        programsAvailable: "{n} programas disponibles",
        aboutTitle: "Sobre este hospital",
        programsTitle: "Programas disponibles"
      },
      program: {
        viewDetails: "Ver detalles",
        duration: "Duración habitual",
        priceRange: "Costo estimado",
        included: "Qué incluye",
        selectProgram: "Seleccionar este programa",
        agentsTitle: "Agentes disponibles para este programa",
        agentsSubtitle: "Estos agentes lo cuidarán durante todo su viaje a China, desde la planificación hasta su regreso seguro a casa."
      },
      agent: {
        yearsExp: "{n} años de experiencia",
        languagesSpoken: "Idiomas que habla",
        specialtiesLabel: "Especialidades",
        servicesLabel: "Servicios incluidos",
        selectAgent: "Solicitar este agente",
        rating: "Calificación"
      },
      contact: {
        title: "Solicitar una consulta",
        subtitle: "Cuéntenos un poco sobre usted y le pondremos en contacto con su agente en un plazo de 1 día hábil.",
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono / WhatsApp",
        country: "País de residencia",
        preferredLanguage: "Idioma preferido",
        message: "Cuéntenos sus necesidades",
        messagePlaceholder: "ej. viajo con mi madre, necesito silla de ruedas, prefiero finales de septiembre...",
        submit: "Enviar solicitud",
        success: "¡Gracias! Su solicitud ha sido enviada. Su agente se pondrá en contacto en 1 día hábil.",
        requiredNote: "* Campos obligatorios",
        summaryHospital: "Hospital",
        summaryProgram: "Programa",
        summaryAgent: "Agente"
      },
      footer: {
        aboutTitle: "Acerca de Health Blueprint",
        aboutText: "Health Blueprint conecta a pacientes internacionales con hospitales certificados y agentes locales de confianza en China, haciendo que viajar por motivos de salud sea simple y seguro para personas de todas las edades.",
        disclaimer: "Health Blueprint es un directorio y servicio de conserjería. No brindamos asesoramiento médico ni realizamos procedimientos médicos. Consulte siempre a un médico certificado.",
        contactUs: "Contáctenos",
        rights: "Todos los derechos reservados."
      },
      common: { back: "Atrás", learnMore: "Saber más", close: "Cerrar", viewAll: "Ver todo" },
      specialties: {
        checkup: "Chequeo médico",
        oncology: "Oncología",
        tcm: "Medicina tradicional china",
        cosmetic: "Estética y dermatología",
        dental: "Odontología",
        fertility: "Fertilidad y FIV",
        orthopedics: "Ortopedia",
        cardiology: "Cardiología"
      },
      areas: {
        beijing: "Pekín", shanghai: "Shanghái", guangzhou: "Cantón (Guangzhou)",
        shenzhen: "Shenzhen", hainan: "Hainan (Boao)", chengdu: "Chengdú",
        xian: "Xi'an", hangzhou: "Hangzhou"
      }
    },

    fr: {
      brand: { name: "Health Blueprint", tagline: "Votre chemin de confiance vers les soins de santé en Chine" },
      nav: { home: "Accueil", howItWorks: "Comment ça marche", contact: "Contact" },
      fontSize: { label: "Taille du texte", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Trouvez le bon hôpital en Chine — avec des personnes pour vous guider",
        subtitle: "Health Blueprint aide les patients du monde entier à trouver des hôpitaux agréés, comparer des programmes de traitement et se connecter avec des agents locaux de confiance qui s'occupent de tout : voyage, traduction et accompagnement à chaque étape.",
        ctaStart: "Commencer la recherche",
        trust1: "Uniquement des hôpitaux agréés",
        trust2: "Agents multilingues",
        trust3: "Accompagnement de l'arrivée au départ"
      },
      steps: {
        area: "Étape 1 · Choisir une région",
        hospital: "Étape 2 · Choisir un hôpital",
        program: "Étape 3 · Choisir un programme",
        agent: "Étape 4 · Choisir votre agent"
      },
      filters: {
        areaLabel: "Région",
        allAreas: "Toutes les régions",
        specialtyLabel: "Type de soin",
        allSpecialties: "Tous les types de soins",
        searchPlaceholder: "Rechercher un hôpital...",
        resultsCount: "{n} hôpitaux trouvés",
        noResults: "Aucun hôpital ne correspond à vos filtres. Essayez de modifier votre sélection."
      },
      hospital: {
        viewPrograms: "Voir les programmes",
        programsAvailable: "{n} programmes disponibles",
        aboutTitle: "À propos de cet hôpital",
        programsTitle: "Programmes disponibles"
      },
      program: {
        viewDetails: "Voir les détails",
        duration: "Durée habituelle",
        priceRange: "Coût estimé",
        included: "Ce qui est inclus",
        selectProgram: "Choisir ce programme",
        agentsTitle: "Agents disponibles pour ce programme",
        agentsSubtitle: "Ces agents s'occuperont de vous tout au long de votre voyage en Chine, de la planification jusqu'à votre retour en toute sécurité."
      },
      agent: {
        yearsExp: "{n} ans d'expérience",
        languagesSpoken: "Langues parlées",
        specialtiesLabel: "Spécialités",
        servicesLabel: "Services inclus",
        selectAgent: "Demander cet agent",
        rating: "Note"
      },
      contact: {
        title: "Demander une consultation",
        subtitle: "Parlez-nous un peu de vous et nous vous mettrons en contact avec votre agent sous 1 jour ouvré.",
        name: "Nom complet",
        email: "Adresse e-mail",
        phone: "Téléphone / WhatsApp",
        country: "Pays de résidence",
        preferredLanguage: "Langue préférée",
        message: "Parlez-nous de vos besoins",
        messagePlaceholder: "ex. je voyage avec ma mère, besoin d'une assistance en fauteuil roulant, préfère fin septembre...",
        submit: "Envoyer la demande",
        success: "Merci ! Votre demande a été envoyée. Votre agent vous contactera sous 1 jour ouvré.",
        requiredNote: "* Champs obligatoires",
        summaryHospital: "Hôpital",
        summaryProgram: "Programme",
        summaryAgent: "Agent"
      },
      footer: {
        aboutTitle: "À propos de Health Blueprint",
        aboutText: "Health Blueprint met en relation les patients internationaux avec des hôpitaux agréés et des agents locaux de confiance en Chine, rendant le voyage médical simple et sûr pour les personnes de tous âges.",
        disclaimer: "Health Blueprint est un annuaire et un service de mise en relation. Nous ne fournissons pas de conseils médicaux et ne réalisons pas d'actes médicaux. Consultez toujours un médecin agréé.",
        contactUs: "Nous contacter",
        rights: "Tous droits réservés."
      },
      common: { back: "Retour", learnMore: "En savoir plus", close: "Fermer", viewAll: "Voir tout" },
      specialties: {
        checkup: "Bilan de santé",
        oncology: "Oncologie",
        tcm: "Médecine traditionnelle chinoise",
        cosmetic: "Esthétique et dermatologie",
        dental: "Soins dentaires",
        fertility: "Fertilité et FIV",
        orthopedics: "Orthopédie",
        cardiology: "Cardiologie"
      },
      areas: {
        beijing: "Pékin", shanghai: "Shanghai", guangzhou: "Canton (Guangzhou)",
        shenzhen: "Shenzhen", hainan: "Hainan (Boao)", chengdu: "Chengdu",
        xian: "Xi'an", hangzhou: "Hangzhou"
      }
    },

    de: {
      brand: { name: "Health Blueprint", tagline: "Ihr vertrauenswürdiger Weg zur Gesundheitsversorgung in China" },
      nav: { home: "Startseite", howItWorks: "So funktioniert's", contact: "Kontakt" },
      fontSize: { label: "Textgröße", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Finden Sie das richtige Krankenhaus in China — mit persönlicher Begleitung",
        subtitle: "Health Blueprint hilft Patienten aus aller Welt, zugelassene Krankenhäuser zu finden, Behandlungsprogramme zu vergleichen und sich mit vertrauenswürdigen lokalen Agenten zu verbinden, die sich um alles kümmern — Reise, Übersetzung und Unterstützung bei jedem Schritt.",
        ctaStart: "Suche starten",
        trust1: "Nur zugelassene Krankenhäuser",
        trust2: "Mehrsprachige Betreuer",
        trust3: "Begleitung von der Ankunft bis zur Abreise"
      },
      steps: {
        area: "Schritt 1 · Region wählen",
        hospital: "Schritt 2 · Krankenhaus wählen",
        program: "Schritt 3 · Programm wählen",
        agent: "Schritt 4 · Ihren Betreuer wählen"
      },
      filters: {
        areaLabel: "Region",
        allAreas: "Alle Regionen",
        specialtyLabel: "Art der Behandlung",
        allSpecialties: "Alle Behandlungsarten",
        searchPlaceholder: "Krankenhäuser suchen...",
        resultsCount: "{n} Krankenhäuser gefunden",
        noResults: "Keine Krankenhäuser entsprechen Ihren Filtern. Ändern Sie Ihre Auswahl."
      },
      hospital: {
        viewPrograms: "Programme ansehen",
        programsAvailable: "{n} Programme verfügbar",
        aboutTitle: "Über dieses Krankenhaus",
        programsTitle: "Verfügbare Programme"
      },
      program: {
        viewDetails: "Details ansehen",
        duration: "Übliche Dauer",
        priceRange: "Geschätzte Kosten",
        included: "Leistungsumfang",
        selectProgram: "Dieses Programm wählen",
        agentsTitle: "Verfügbare Betreuer für dieses Programm",
        agentsSubtitle: "Diese Betreuer kümmern sich während Ihrer gesamten Reise nach China um Sie — von der Planung bis zur sicheren Heimreise."
      },
      agent: {
        yearsExp: "{n} Jahre Erfahrung",
        languagesSpoken: "Gesprochene Sprachen",
        specialtiesLabel: "Spezialgebiete",
        servicesLabel: "Enthaltene Leistungen",
        selectAgent: "Diesen Betreuer anfragen",
        rating: "Bewertung"
      },
      contact: {
        title: "Beratung anfragen",
        subtitle: "Erzählen Sie uns etwas über sich und wir verbinden Sie innerhalb eines Werktags mit Ihrem Betreuer.",
        name: "Vollständiger Name",
        email: "E-Mail-Adresse",
        phone: "Telefon / WhatsApp-Nummer",
        country: "Wohnsitzland",
        preferredLanguage: "Bevorzugte Sprache",
        message: "Erzählen Sie uns von Ihren Bedürfnissen",
        messagePlaceholder: "z. B. Reise mit meiner Mutter, benötige Rollstuhlhilfe, bevorzuge Ende September...",
        submit: "Anfrage senden",
        success: "Vielen Dank! Ihre Anfrage wurde gesendet. Ihr Betreuer meldet sich innerhalb eines Werktags.",
        requiredNote: "* Pflichtfelder",
        summaryHospital: "Krankenhaus",
        summaryProgram: "Programm",
        summaryAgent: "Betreuer"
      },
      footer: {
        aboutTitle: "Über Health Blueprint",
        aboutText: "Health Blueprint verbindet internationale Patienten mit zugelassenen Krankenhäusern und vertrauenswürdigen lokalen Betreuern in China und macht medizinische Reisen für Menschen jeden Alters einfach und sicher.",
        disclaimer: "Health Blueprint ist ein Verzeichnis- und Vermittlungsdienst. Wir bieten keine medizinische Beratung und führen keine medizinischen Eingriffe durch. Konsultieren Sie immer einen zugelassenen Arzt.",
        contactUs: "Kontaktieren Sie uns",
        rights: "Alle Rechte vorbehalten."
      },
      common: { back: "Zurück", learnMore: "Mehr erfahren", close: "Schließen", viewAll: "Alle anzeigen" },
      specialties: {
        checkup: "Gesundheits-Check-up",
        oncology: "Onkologie",
        tcm: "Traditionelle Chinesische Medizin",
        cosmetic: "Kosmetik & Dermatologie",
        dental: "Zahnmedizin",
        fertility: "Fruchtbarkeit & IVF",
        orthopedics: "Orthopädie",
        cardiology: "Kardiologie"
      },
      areas: {
        beijing: "Peking", shanghai: "Shanghai", guangzhou: "Guangzhou (Kanton)",
        shenzhen: "Shenzhen", hainan: "Hainan (Boao)", chengdu: "Chengdu",
        xian: "Xi'an", hangzhou: "Hangzhou"
      }
    },

    pt: {
      brand: { name: "Health Blueprint", tagline: "Seu caminho de confiança para a saúde na China" },
      nav: { home: "Início", howItWorks: "Como funciona", contact: "Contato" },
      fontSize: { label: "Tamanho do texto", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Encontre o hospital certo na China — com pessoas para guiá-lo",
        subtitle: "A Health Blueprint ajuda pacientes de todo o mundo a encontrar hospitais licenciados, comparar programas de tratamento e se conectar com agentes locais de confiança que cuidam de tudo: viagem, tradução e apoio em cada etapa.",
        ctaStart: "Iniciar busca",
        trust1: "Apenas hospitais licenciados",
        trust2: "Agentes multilíngues",
        trust3: "Acompanhamento da chegada até a partida"
      },
      steps: {
        area: "Passo 1 · Escolha uma região",
        hospital: "Passo 2 · Escolha um hospital",
        program: "Passo 3 · Escolha um programa",
        agent: "Passo 4 · Escolha seu agente"
      },
      filters: {
        areaLabel: "Região",
        allAreas: "Todas as regiões",
        specialtyLabel: "Tipo de atendimento",
        allSpecialties: "Todos os tipos de atendimento",
        searchPlaceholder: "Buscar hospitais...",
        resultsCount: "{n} hospitais encontrados",
        noResults: "Nenhum hospital corresponde aos seus filtros. Tente alterar sua seleção."
      },
      hospital: {
        viewPrograms: "Ver programas",
        programsAvailable: "{n} programas disponíveis",
        aboutTitle: "Sobre este hospital",
        programsTitle: "Programas disponíveis"
      },
      program: {
        viewDetails: "Ver detalhes",
        duration: "Duração típica",
        priceRange: "Custo estimado",
        included: "O que está incluído",
        selectProgram: "Selecionar este programa",
        agentsTitle: "Agentes disponíveis para este programa",
        agentsSubtitle: "Esses agentes cuidarão de você durante toda a sua viagem à China, do planejamento até o seu retorno seguro para casa."
      },
      agent: {
        yearsExp: "{n} anos de experiência",
        languagesSpoken: "Idiomas falados",
        specialtiesLabel: "Especialidades",
        servicesLabel: "Serviços incluídos",
        selectAgent: "Solicitar este agente",
        rating: "Avaliação"
      },
      contact: {
        title: "Solicitar uma consulta",
        subtitle: "Conte-nos um pouco sobre você e conectaremos você ao seu agente em até 1 dia útil.",
        name: "Nome completo",
        email: "Endereço de e-mail",
        phone: "Telefone / WhatsApp",
        country: "País de residência",
        preferredLanguage: "Idioma preferido",
        message: "Conte-nos sobre suas necessidades",
        messagePlaceholder: "ex.: viajando com minha mãe, preciso de assistência com cadeira de rodas, prefiro final de setembro...",
        submit: "Enviar solicitação",
        success: "Obrigado! Sua solicitação foi enviada. Seu agente entrará em contato em até 1 dia útil.",
        requiredNote: "* Campos obrigatórios",
        summaryHospital: "Hospital",
        summaryProgram: "Programa",
        summaryAgent: "Agente"
      },
      footer: {
        aboutTitle: "Sobre a Health Blueprint",
        aboutText: "A Health Blueprint conecta pacientes internacionais a hospitais licenciados e agentes locais de confiança na China, tornando as viagens de saúde simples e seguras para pessoas de todas as idades.",
        disclaimer: "A Health Blueprint é um diretório e serviço de intermediação. Não fornecemos aconselhamento médico nem realizamos procedimentos médicos. Consulte sempre um médico licenciado.",
        contactUs: "Fale conosco",
        rights: "Todos os direitos reservados."
      },
      common: { back: "Voltar", learnMore: "Saiba mais", close: "Fechar", viewAll: "Ver tudo" },
      specialties: {
        checkup: "Check-up de saúde",
        oncology: "Oncologia",
        tcm: "Medicina tradicional chinesa",
        cosmetic: "Estética e dermatologia",
        dental: "Odontologia",
        fertility: "Fertilidade e FIV",
        orthopedics: "Ortopedia",
        cardiology: "Cardiologia"
      },
      areas: {
        beijing: "Pequim", shanghai: "Xangai", guangzhou: "Guangzhou (Cantão)",
        shenzhen: "Shenzhen", hainan: "Hainan (Boao)", chengdu: "Chengdu",
        xian: "Xi'an", hangzhou: "Hangzhou"
      }
    },

    ru: {
      brand: { name: "Health Blueprint", tagline: "Ваш надёжный путь к медицине в Китае" },
      nav: { home: "Главная", howItWorks: "Как это работает", contact: "Контакты" },
      fontSize: { label: "Размер текста", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "Найдите подходящую больницу в Китае — с сопровождением на каждом шаге",
        subtitle: "Health Blueprint помогает пациентам со всего мира найти лицензированные больницы, сравнить программы лечения и связаться с надёжными местными агентами, которые берут на себя всё: поездку, перевод и поддержку на каждом этапе.",
        ctaStart: "Начать поиск",
        trust1: "Только лицензированные больницы",
        trust2: "Многоязычные агенты",
        trust3: "Сопровождение от прибытия до отъезда"
      },
      steps: {
        area: "Шаг 1 · Выберите регион",
        hospital: "Шаг 2 · Выберите больницу",
        program: "Шаг 3 · Выберите программу",
        agent: "Шаг 4 · Выберите агента"
      },
      filters: {
        areaLabel: "Регион",
        allAreas: "Все регионы",
        specialtyLabel: "Тип услуги",
        allSpecialties: "Все типы услуг",
        searchPlaceholder: "Поиск больниц...",
        resultsCount: "Найдено больниц: {n}",
        noResults: "Нет больниц, соответствующих фильтрам. Попробуйте изменить выбор."
      },
      hospital: {
        viewPrograms: "Посмотреть программы",
        programsAvailable: "Доступно программ: {n}",
        aboutTitle: "О больнице",
        programsTitle: "Доступные программы"
      },
      program: {
        viewDetails: "Подробнее",
        duration: "Обычная продолжительность",
        priceRange: "Ориентировочная стоимость",
        included: "Что включено",
        selectProgram: "Выбрать эту программу",
        agentsTitle: "Доступные агенты для этой программы",
        agentsSubtitle: "Эти агенты будут заботиться о вас на протяжении всей поездки в Китай — от планирования до благополучного возвращения домой."
      },
      agent: {
        yearsExp: "Опыт: {n} лет",
        languagesSpoken: "Владение языками",
        specialtiesLabel: "Специализации",
        servicesLabel: "Включённые услуги",
        selectAgent: "Запросить этого агента",
        rating: "Рейтинг"
      },
      contact: {
        title: "Запросить консультацию",
        subtitle: "Расскажите немного о себе, и мы свяжем вас с выбранным агентом в течение 1 рабочего дня.",
        name: "Полное имя",
        email: "Адрес электронной почты",
        phone: "Телефон / WhatsApp",
        country: "Страна проживания",
        preferredLanguage: "Предпочитаемый язык",
        message: "Расскажите о ваших потребностях",
        messagePlaceholder: "например: еду с мамой, нужна помощь с инвалидной коляской, предпочитаю конец сентября...",
        submit: "Отправить запрос",
        success: "Спасибо! Ваш запрос отправлен. Агент свяжется с вами в течение 1 рабочего дня.",
        requiredNote: "* Обязательные поля",
        summaryHospital: "Больница",
        summaryProgram: "Программа",
        summaryAgent: "Агент"
      },
      footer: {
        aboutTitle: "О Health Blueprint",
        aboutText: "Health Blueprint соединяет иностранных пациентов с лицензированными больницами и надёжными местными агентами в Китае, делая медицинские поездки простыми и безопасными для людей любого возраста.",
        disclaimer: "Health Blueprint — это каталог и сервис подбора агентов. Мы не даём медицинских консультаций и не проводим медицинские процедуры. Всегда консультируйтесь с лицензированным врачом.",
        contactUs: "Связаться с нами",
        rights: "Все права защищены."
      },
      common: { back: "Назад", learnMore: "Узнать больше", close: "Закрыть", viewAll: "Показать все" },
      specialties: {
        checkup: "Медицинский чек-ап",
        oncology: "Онкология",
        tcm: "Традиционная китайская медицина",
        cosmetic: "Косметология и дерматология",
        dental: "Стоматология",
        fertility: "Лечение бесплодия и ЭКО",
        orthopedics: "Ортопедия",
        cardiology: "Кардиология"
      },
      areas: {
        beijing: "Пекин", shanghai: "Шанхай", guangzhou: "Гуанчжоу",
        shenzhen: "Шэньчжэнь", hainan: "Хайнань (Боао)", chengdu: "Чэнду",
        xian: "Сиань", hangzhou: "Ханчжоу"
      }
    },

    ar: {
      brand: { name: "Health Blueprint", tagline: "طريقك الموثوق للرعاية الصحية في الصين" },
      nav: { home: "الرئيسية", howItWorks: "كيف يعمل الموقع", contact: "اتصل بنا" },
      fontSize: { label: "حجم النص", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "اعثر على المستشفى المناسب في الصين — مع مرافقين يرشدونك في كل خطوة",
        subtitle: "يساعد Health Blueprint المرضى من جميع أنحاء العالم على إيجاد مستشفيات مرخصة، ومقارنة برامج العلاج، والتواصل مع وكلاء محليين موثوقين يتكفلون بكل شيء: السفر، الترجمة، والدعم في كل خطوة.",
        ctaStart: "ابدأ البحث",
        trust1: "مستشفيات مرخصة فقط",
        trust2: "وكلاء يتحدثون عدة لغات",
        trust3: "مرافقة من الوصول حتى المغادرة"
      },
      steps: {
        area: "الخطوة 1 · اختر منطقة",
        hospital: "الخطوة 2 · اختر مستشفى",
        program: "الخطوة 3 · اختر برنامجًا",
        agent: "الخطوة 4 · اختر وكيلك"
      },
      filters: {
        areaLabel: "المنطقة",
        allAreas: "جميع المناطق",
        specialtyLabel: "نوع الرعاية",
        allSpecialties: "جميع أنواع الرعاية",
        searchPlaceholder: "ابحث عن مستشفى...",
        resultsCount: "تم العثور على {n} مستشفى",
        noResults: "لا توجد مستشفيات مطابقة لعوامل التصفية. جرّب تغيير اختيارك."
      },
      hospital: {
        viewPrograms: "عرض البرامج",
        programsAvailable: "{n} برنامج متاح",
        aboutTitle: "عن هذا المستشفى",
        programsTitle: "البرامج المتاحة"
      },
      program: {
        viewDetails: "عرض التفاصيل",
        duration: "المدة المعتادة",
        priceRange: "التكلفة التقديرية",
        included: "ما الذي يشمله البرنامج",
        selectProgram: "اختر هذا البرنامج",
        agentsTitle: "الوكلاء المتاحون لهذا البرنامج",
        agentsSubtitle: "سيهتم هؤلاء الوكلاء بك طوال رحلتك إلى الصين — من التخطيط وحتى عودتك الآمنة إلى بلدك."
      },
      agent: {
        yearsExp: "{n} سنوات خبرة",
        languagesSpoken: "اللغات المتحدثة",
        specialtiesLabel: "التخصصات",
        servicesLabel: "الخدمات المشمولة",
        selectAgent: "طلب هذا الوكيل",
        rating: "التقييم"
      },
      contact: {
        title: "طلب استشارة",
        subtitle: "أخبرنا قليلاً عن نفسك وسنقوم بربطك بوكيلك المختار خلال يوم عمل واحد.",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف / واتساب",
        country: "بلد الإقامة",
        preferredLanguage: "اللغة المفضلة",
        message: "أخبرنا عن احتياجاتك",
        messagePlaceholder: "مثال: أسافر مع والدتي، أحتاج إلى مساعدة بكرسي متحرك، أفضل أواخر سبتمبر...",
        submit: "إرسال الطلب",
        success: "شكرًا لك! تم إرسال طلبك. سيتواصل معك الوكيل خلال يوم عمل واحد.",
        requiredNote: "* حقول إلزامية",
        summaryHospital: "المستشفى",
        summaryProgram: "البرنامج",
        summaryAgent: "الوكيل"
      },
      footer: {
        aboutTitle: "عن Health Blueprint",
        aboutText: "يربط Health Blueprint المرضى الدوليين بمستشفيات مرخصة ووكلاء محليين موثوقين في الصين، مما يجعل السفر العلاجي بسيطًا وآمنًا للأشخاص من جميع الأعمار.",
        disclaimer: "Health Blueprint هو دليل وخدمة مطابقة، ولا يقدم استشارات طبية ولا يجري إجراءات طبية. يُرجى دائمًا استشارة طبيب مرخّص.",
        contactUs: "تواصل معنا",
        rights: "جميع الحقوق محفوظة."
      },
      common: { back: "رجوع", learnMore: "معرفة المزيد", close: "إغلاق", viewAll: "عرض الكل" },
      specialties: {
        checkup: "الفحص الصحي الشامل",
        oncology: "علاج الأورام",
        tcm: "الطب الصيني التقليدي",
        cosmetic: "التجميل والأمراض الجلدية",
        dental: "طب الأسنان",
        fertility: "الخصوبة وأطفال الأنابيب",
        orthopedics: "جراحة العظام",
        cardiology: "أمراض القلب"
      },
      areas: {
        beijing: "بكين", shanghai: "شنغهاي", guangzhou: "قوانغتشو",
        shenzhen: "شنتشن", hainan: "هاينان (بوآو)", chengdu: "تشنغدو",
        xian: "شيان", hangzhou: "هانغتشو"
      }
    },

    ja: {
      brand: { name: "Health Blueprint", tagline: "中国の医療への信頼できる架け橋" },
      nav: { home: "ホーム", howItWorks: "ご利用の流れ", contact: "お問い合わせ" },
      fontSize: { label: "文字サイズ", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "中国で最適な病院を見つけましょう——現地スタッフが最後までご案内します",
        subtitle: "Health Blueprintは、世界中の患者様が認可された病院を見つけ、治療プログラムを比較し、渡航・通訳・サポートまで全てを担う信頼できる現地エージェントとつながるお手伝いをします。",
        ctaStart: "検索を始める",
        trust1: "認可病院のみ掲載",
        trust2: "多言語対応のエージェント",
        trust3: "到着から帰国まで安心サポート"
      },
      steps: {
        area: "ステップ1・地域を選ぶ",
        hospital: "ステップ2・病院を選ぶ",
        program: "ステップ3・プログラムを選ぶ",
        agent: "ステップ4・エージェントを選ぶ"
      },
      filters: {
        areaLabel: "地域",
        allAreas: "すべての地域",
        specialtyLabel: "診療の種類",
        allSpecialties: "すべての診療",
        searchPlaceholder: "病院を検索...",
        resultsCount: "{n} 件の病院が見つかりました",
        noResults: "条件に一致する病院がありません。条件を変更してお試しください。"
      },
      hospital: {
        viewPrograms: "プログラムを見る",
        programsAvailable: "{n} 件のプログラムあり",
        aboutTitle: "この病院について",
        programsTitle: "利用可能なプログラム"
      },
      program: {
        viewDetails: "詳細を見る",
        duration: "標準的な期間",
        priceRange: "概算費用",
        included: "含まれるサービス",
        selectProgram: "このプログラムを選択",
        agentsTitle: "このプログラムのエージェント",
        agentsSubtitle: "これらのエージェントが、計画から無事のご帰国まで、中国滞在中ずっとサポートします。"
      },
      agent: {
        yearsExp: "経験{n}年",
        languagesSpoken: "対応言語",
        specialtiesLabel: "得意分野",
        servicesLabel: "含まれるサービス",
        selectAgent: "このエージェントを依頼",
        rating: "評価"
      },
      contact: {
        title: "相談を申し込む",
        subtitle: "簡単な情報をご入力いただければ、1営業日以内に選択したエージェントよりご連絡いたします。",
        name: "お名前",
        email: "メールアドレス",
        phone: "電話番号 / WhatsApp番号",
        country: "居住国",
        preferredLanguage: "希望言語",
        message: "ご要望をお聞かせください",
        messagePlaceholder: "例：母と一緒に渡航予定、車椅子の介助が必要、9月下旬希望...",
        submit: "送信する",
        success: "ありがとうございます。お申し込みを受け付けました。1営業日以内にエージェントよりご連絡いたします。",
        requiredNote: "* は必須項目です",
        summaryHospital: "病院",
        summaryProgram: "プログラム",
        summaryAgent: "エージェント"
      },
      footer: {
        aboutTitle: "Health Blueprintについて",
        aboutText: "Health Blueprintは、世界中の患者様を中国の認可病院と信頼できる現地エージェントに繋ぎ、あらゆる年齢層の方が安心して医療渡航できるようサポートします。",
        disclaimer: "Health Blueprintは病院情報の紹介およびエージェントとのマッチングサービスであり、医療アドバイスや医療行為は行いません。必ず認可を受けた医師にご相談ください。",
        contactUs: "お問い合わせ",
        rights: "All rights reserved."
      },
      common: { back: "戻る", learnMore: "詳しく見る", close: "閉じる", viewAll: "すべて見る" },
      specialties: {
        checkup: "健康診断",
        oncology: "がん治療",
        tcm: "中医学（伝統中国医学）",
        cosmetic: "美容皮膚科",
        dental: "歯科",
        fertility: "不妊治療・体外受精",
        orthopedics: "整形外科",
        cardiology: "循環器科"
      },
      areas: {
        beijing: "北京", shanghai: "上海", guangzhou: "広州",
        shenzhen: "深圳", hainan: "海南（博鰲）", chengdu: "成都",
        xian: "西安", hangzhou: "杭州"
      }
    },

    ko: {
      brand: { name: "Health Blueprint", tagline: "중국 의료로 가는 믿을 수 있는 길" },
      nav: { home: "홈", howItWorks: "이용 방법", contact: "문의하기" },
      fontSize: { label: "글자 크기", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "중국에서 알맞은 병원을 찾아보세요 — 처음부터 끝까지 안내해 드립니다",
        subtitle: "Health Blueprint는 전 세계 환자들이 인증된 병원을 찾고, 치료 프로그램을 비교하고, 이동·통역·지원까지 모든 것을 책임지는 신뢰할 수 있는 현지 에이전트와 연결되도록 돕습니다.",
        ctaStart: "검색 시작하기",
        trust1: "인증된 병원만 소개",
        trust2: "다국어 지원 에이전트",
        trust3: "도착부터 귀국까지 동행"
      },
      steps: {
        area: "1단계 · 지역 선택",
        hospital: "2단계 · 병원 선택",
        program: "3단계 · 프로그램 선택",
        agent: "4단계 · 에이전트 선택"
      },
      filters: {
        areaLabel: "지역",
        allAreas: "전체 지역",
        specialtyLabel: "진료 유형",
        allSpecialties: "전체 진료 유형",
        searchPlaceholder: "병원 검색...",
        resultsCount: "{n}개 병원 검색됨",
        noResults: "필터에 맞는 병원이 없습니다. 선택 항목을 변경해 보세요."
      },
      hospital: {
        viewPrograms: "프로그램 보기",
        programsAvailable: "{n}개 프로그램 이용 가능",
        aboutTitle: "병원 소개",
        programsTitle: "이용 가능한 프로그램"
      },
      program: {
        viewDetails: "자세히 보기",
        duration: "일반적인 소요 기간",
        priceRange: "예상 비용",
        included: "포함 사항",
        selectProgram: "이 프로그램 선택",
        agentsTitle: "이 프로그램의 이용 가능한 에이전트",
        agentsSubtitle: "이 에이전트들은 계획 단계부터 무사히 귀국하실 때까지 중국 여행 전 과정을 함께합니다."
      },
      agent: {
        yearsExp: "경력 {n}년",
        languagesSpoken: "구사 언어",
        specialtiesLabel: "전문 분야",
        servicesLabel: "포함된 서비스",
        selectAgent: "이 에이전트 요청",
        rating: "평점"
      },
      contact: {
        title: "상담 신청",
        subtitle: "간단한 정보를 남겨주시면 영업일 기준 1일 이내에 선택하신 에이전트와 연결해 드립니다.",
        name: "성명",
        email: "이메일 주소",
        phone: "전화 / WhatsApp 번호",
        country: "거주 국가",
        preferredLanguage: "선호 언어",
        message: "필요하신 사항을 알려주세요",
        messagePlaceholder: "예: 어머니와 동행, 휠체어 지원 필요, 9월 말 선호...",
        submit: "요청 보내기",
        success: "감사합니다! 요청이 접수되었습니다. 영업일 기준 1일 이내에 에이전트가 연락드립니다.",
        requiredNote: "* 필수 입력 항목",
        summaryHospital: "병원",
        summaryProgram: "프로그램",
        summaryAgent: "에이전트"
      },
      footer: {
        aboutTitle: "Health Blueprint 소개",
        aboutText: "Health Blueprint는 해외 환자를 중국의 인증된 병원과 신뢰할 수 있는 현지 에이전트와 연결하여 모든 연령대의 사람들이 안전하고 간편하게 의료 여행을 할 수 있도록 돕습니다.",
        disclaimer: "Health Blueprint는 병원 정보 안내 및 에이전트 매칭 서비스이며, 의료 자문이나 의료 행위를 제공하지 않습니다. 항상 인증된 의사와 상담하시기 바랍니다.",
        contactUs: "문의하기",
        rights: "All rights reserved."
      },
      common: { back: "뒤로", learnMore: "자세히 알아보기", close: "닫기", viewAll: "전체 보기" },
      specialties: {
        checkup: "건강검진",
        oncology: "암 치료",
        tcm: "중의학(전통 중국 의학)",
        cosmetic: "미용 피부과",
        dental: "치과",
        fertility: "난임 치료 및 시험관 시술",
        orthopedics: "정형외과",
        cardiology: "심장내과"
      },
      areas: {
        beijing: "베이징", shanghai: "상하이", guangzhou: "광저우",
        shenzhen: "선전", hainan: "하이난(보아오)", chengdu: "청두",
        xian: "시안", hangzhou: "항저우"
      }
    },

    hi: {
      brand: { name: "Health Blueprint", tagline: "चीन में स्वास्थ्य सेवा तक आपका भरोसेमंद रास्ता" },
      nav: { home: "होम", howItWorks: "यह कैसे काम करता है", contact: "संपर्क करें" },
      fontSize: { label: "टेक्स्ट का आकार", decrease: "A−", reset: "A", increase: "A+" },
      hero: {
        title: "चीन में सही अस्पताल खोजें — साथ में आपका मार्गदर्शन करने वाले लोग भी",
        subtitle: "Health Blueprint दुनिया भर के मरीज़ों को लाइसेंस प्राप्त अस्पताल खोजने, इलाज कार्यक्रमों की तुलना करने, और भरोसेमंद स्थानीय एजेंटों से जुड़ने में मदद करता है जो यात्रा, अनुवाद और हर कदम पर सहायता का ध्यान रखते हैं।",
        ctaStart: "खोज शुरू करें",
        trust1: "केवल लाइसेंस प्राप्त अस्पताल",
        trust2: "बहुभाषी सहायक एजेंट",
        trust3: "आगमन से प्रस्थान तक मार्गदर्शन"
      },
      steps: {
        area: "चरण 1 · क्षेत्र चुनें",
        hospital: "चरण 2 · अस्पताल चुनें",
        program: "चरण 3 · कार्यक्रम चुनें",
        agent: "चरण 4 · अपना एजेंट चुनें"
      },
      filters: {
        areaLabel: "क्षेत्र",
        allAreas: "सभी क्षेत्र",
        specialtyLabel: "देखभाल का प्रकार",
        allSpecialties: "सभी प्रकार की देखभाल",
        searchPlaceholder: "अस्पताल खोजें...",
        resultsCount: "{n} अस्पताल मिले",
        noResults: "आपके फ़िल्टर से मेल खाने वाला कोई अस्पताल नहीं मिला। अपना चयन बदलकर देखें।"
      },
      hospital: {
        viewPrograms: "कार्यक्रम देखें",
        programsAvailable: "{n} कार्यक्रम उपलब्ध",
        aboutTitle: "इस अस्पताल के बारे में",
        programsTitle: "उपलब्ध कार्यक्रम"
      },
      program: {
        viewDetails: "विवरण देखें",
        duration: "सामान्य अवधि",
        priceRange: "अनुमानित लागत",
        included: "इसमें क्या शामिल है",
        selectProgram: "यह कार्यक्रम चुनें",
        agentsTitle: "इस कार्यक्रम के लिए उपलब्ध एजेंट",
        agentsSubtitle: "ये एजेंट योजना बनाने से लेकर आपकी सुरक्षित वापसी तक, चीन की पूरी यात्रा के दौरान आपकी देखभाल करेंगे।"
      },
      agent: {
        yearsExp: "{n} वर्षों का अनुभव",
        languagesSpoken: "बोली जाने वाली भाषाएं",
        specialtiesLabel: "विशेषज्ञता",
        servicesLabel: "शामिल सेवाएं",
        selectAgent: "इस एजेंट का अनुरोध करें",
        rating: "रेटिंग"
      },
      contact: {
        title: "परामर्श का अनुरोध करें",
        subtitle: "हमें अपने बारे में थोड़ा बताएं और हम 1 कार्य दिवस के भीतर आपको आपके चुने हुए एजेंट से जोड़ देंगे।",
        name: "पूरा नाम",
        email: "ईमेल पता",
        phone: "फ़ोन / WhatsApp नंबर",
        country: "निवास का देश",
        preferredLanguage: "पसंदीदा भाषा",
        message: "हमें अपनी आवश्यकताओं के बारे में बताएं",
        messagePlaceholder: "जैसे: अपनी माँ के साथ यात्रा कर रहे हैं, व्हीलचेयर सहायता चाहिए, सितंबर के अंत को प्राथमिकता...",
        submit: "अनुरोध भेजें",
        success: "धन्यवाद! आपका अनुरोध भेज दिया गया है। आपका एजेंट 1 कार्य दिवस के भीतर संपर्क करेगा।",
        requiredNote: "* आवश्यक फ़ील्ड",
        summaryHospital: "अस्पताल",
        summaryProgram: "कार्यक्रम",
        summaryAgent: "एजेंट"
      },
      footer: {
        aboutTitle: "Health Blueprint के बारे में",
        aboutText: "Health Blueprint अंतरराष्ट्रीय मरीज़ों को चीन के लाइसेंस प्राप्त अस्पतालों और भरोसेमंद स्थानीय एजेंटों से जोड़ता है, जिससे हर उम्र के लोगों के लिए स्वास्थ्य यात्रा सरल और सुरक्षित बनती है।",
        disclaimer: "Health Blueprint एक डायरेक्टरी और मिलान सेवा है। हम चिकित्सा सलाह नहीं देते और न ही कोई चिकित्सा प्रक्रिया करते हैं। कृपया हमेशा किसी लाइसेंस प्राप्त चिकित्सक से सलाह लें।",
        contactUs: "हमसे संपर्क करें",
        rights: "सर्वाधिकार सुरक्षित।"
      },
      common: { back: "वापस", learnMore: "और जानें", close: "बंद करें", viewAll: "सभी देखें" },
      specialties: {
        checkup: "स्वास्थ्य जांच",
        oncology: "कैंसर देखभाल",
        tcm: "पारंपरिक चीनी चिकित्सा",
        cosmetic: "कॉस्मेटिक और त्वचा रोग",
        dental: "दंत चिकित्सा",
        fertility: "प्रजनन क्षमता और आईवीएफ",
        orthopedics: "अस्थि रोग (ऑर्थोपेडिक्स)",
        cardiology: "हृदय रोग विज्ञान"
      },
      areas: {
        beijing: "बीजिंग", shanghai: "शंघाई", guangzhou: "ग्वांगझोऊ",
        shenzhen: "शेनझेन", hainan: "हैनान (बोआओ)", chengdu: "छेंगदू",
        xian: "शीआन", hangzhou: "हांगझोऊ"
      }
    }
  },

  /* Resolve a dotted key path (e.g. "hero.title") for a language, falling
     back to English if the key or language is missing. Supports {n}-style
     placeholder substitution via the optional `vars` map. */
  t: function (lang, key, vars) {
    var pack = (window.I18N.strings[lang] || window.I18N.strings.en);
    var parts = key.split(".");
    var node = pack;
    for (var i = 0; i < parts.length; i++) {
      node = node && node[parts[i]];
    }
    if (node === undefined) {
      node = window.I18N.strings.en;
      for (var j = 0; j < parts.length; j++) {
        node = node && node[parts[j]];
      }
    }
    if (typeof node !== "string") return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        node = node.replace("{" + k + "}", vars[k]);
      });
    }
    return node;
  }
};
