/* Health Blueprint — sample directory data.
   NOTE: Hospital, program and agent records here are representative sample
   listings for demonstration purposes. Replace with verified, licensed
   partner data before taking real bookings. Descriptive text is provided in
   en / zh-CN / zh-TW; other interface languages fall back to English for
   this content while the surrounding UI stays fully translated. */

window.DATA = {

  areas: [
    { id: "beijing", region: "north" },
    { id: "shanghai", region: "east" },
    { id: "hangzhou", region: "east" },
    { id: "guangzhou", region: "south" },
    { id: "shenzhen", region: "south" },
    { id: "hainan", region: "south" },
    { id: "chengdu", region: "west" },
    { id: "xian", region: "west" }
  ],

  specialties: ["checkup", "oncology", "tcm", "cosmetic", "dental", "fertility", "orthopedics", "cardiology"],

  hospitals: [
    {
      id: "bj-global-health",
      area: "beijing",
      name: "Beijing Global Health Hospital",
      localName: "北京环球健康医院",
      tags: ["checkup", "oncology", "cardiology"],
      rating: 4.8,
      established: 1998,
      beds: 1200,
      intlPatientsPerYear: 3400,
      desc: {
        en: "A JCI-accredited tertiary hospital in central Beijing with a dedicated International Patient Center, English/Chinese-speaking clinical staff, and same-day diagnostic imaging.",
        "zh-CN": "位于北京市中心的JCI认证三甲医院，设有国际患者中心，医护人员可用英语和中文沟通，并提供当日影像诊断服务。",
        "zh-TW": "位於北京市中心的JCI認證三甲醫院，設有國際患者中心，醫護人員可用英語和中文溝通，並提供當日影像診斷服務。"
      }
    },
    {
      id: "bj-heart-center",
      area: "beijing",
      name: "Beijing Heart & Vascular Center",
      localName: "北京心血管中心",
      tags: ["cardiology", "checkup"],
      rating: 4.7,
      established: 2005,
      beds: 600,
      intlPatientsPerYear: 1200,
      desc: {
        en: "A specialist cardiology hospital known for minimally invasive cardiac procedures and a rapid-track program for international patients.",
        "zh-CN": "专注心血管疾病的专科医院，以微创心脏手术和国际患者快速通道著称。",
        "zh-TW": "專注心血管疾病的專科醫院，以微創心臟手術和國際患者快速通道著稱。"
      }
    },

    {
      id: "sh-union-intl",
      area: "shanghai",
      name: "Shanghai Union International Hospital",
      localName: "上海联合国际医院",
      tags: ["checkup", "oncology", "fertility"],
      rating: 4.9,
      established: 2001,
      beds: 900,
      intlPatientsPerYear: 5100,
      desc: {
        en: "One of Shanghai's largest international patient hospitals, offering full-service health screening, oncology, and fertility programs with 20+ language interpretation services.",
        "zh-CN": "上海规模最大的国际患者医院之一，提供全面的体检、肿瘤和生育项目，并配备20多种语言的翻译服务。",
        "zh-TW": "上海規模最大的國際患者醫院之一，提供全面的體檢、腫瘤和生育項目，並配備20多種語言的翻譯服務。"
      }
    },
    {
      id: "sh-eastview",
      area: "shanghai",
      name: "Shanghai Eastview Rehabilitation Hospital",
      localName: "上海东景康复医院",
      tags: ["orthopedics", "tcm"],
      rating: 4.6,
      established: 2010,
      beds: 400,
      intlPatientsPerYear: 900,
      desc: {
        en: "A rehabilitation-focused hospital combining Western orthopedic surgery with Traditional Chinese Medicine recovery programs.",
        "zh-CN": "以康复为特色的医院，结合西医骨科手术与中医康复项目。",
        "zh-TW": "以康復為特色的醫院，結合西醫骨科手術與中醫康復項目。"
      }
    },

    {
      id: "hz-westlake",
      area: "hangzhou",
      name: "Hangzhou West Lake Wellness Hospital",
      localName: "杭州西湖养生医院",
      tags: ["tcm", "checkup", "cosmetic"],
      rating: 4.7,
      established: 2008,
      beds: 350,
      intlPatientsPerYear: 700,
      desc: {
        en: "A wellness-oriented hospital set beside West Lake, blending preventive checkups, TCM therapy, and aesthetic medicine in a resort-like setting.",
        "zh-CN": "坐落于西湖畔的养生医院，将预防性体检、中医理疗与医美项目结合在度假式的环境中。",
        "zh-TW": "坐落於西湖畔的養生醫院，將預防性體檢、中醫理療與醫美項目結合在度假式的環境中。"
      }
    },

    {
      id: "gz-southern-general",
      area: "guangzhou",
      name: "Guangzhou Southern General Hospital",
      localName: "广州南方总医院",
      tags: ["oncology", "orthopedics", "dental"],
      rating: 4.6,
      established: 1995,
      beds: 1500,
      intlPatientsPerYear: 2600,
      desc: {
        en: "A large general hospital with a strong oncology department and a dedicated dental and maxillofacial center for overseas patients.",
        "zh-CN": "大型综合医院，肿瘤科实力雄厚，并设有专为海外患者服务的口腔颌面中心。",
        "zh-TW": "大型綜合醫院，腫瘤科實力雄厚，並設有專為海外患者服務的口腔頜面中心。"
      }
    },

    {
      id: "sz-bay-medical",
      area: "shenzhen",
      name: "Shenzhen Bay Medical City",
      localName: "深圳湾医学中心",
      tags: ["checkup", "cosmetic", "cardiology"],
      rating: 4.8,
      established: 2016,
      beds: 800,
      intlPatientsPerYear: 2100,
      desc: {
        en: "A modern medical campus with newly built facilities, robotic surgery suites, and a premium executive health-screening wing.",
        "zh-CN": "现代化医疗园区，拥有全新设施、机器人手术室以及高端高管体检专区。",
        "zh-TW": "現代化醫療園區，擁有全新設施、機器人手術室以及高端高管體檢專區。"
      }
    },

    {
      id: "hn-boao-lecheng",
      area: "hainan",
      name: "Boao Lecheng International Medical Hospital",
      localName: "博鳌乐城国际医疗医院",
      tags: ["oncology", "checkup", "orthopedics"],
      rating: 4.9,
      established: 2019,
      beds: 500,
      intlPatientsPerYear: 1800,
      desc: {
        en: "Located in China's Boao Lecheng pilot zone, this hospital offers access to internationally approved treatments and devices not yet available elsewhere in China.",
        "zh-CN": "位于中国博鳌乐城先行区，可使用国内其他地区尚未引进的国际认证疗法和医疗器械。",
        "zh-TW": "位於中國博鰲樂城先行區，可使用國內其他地區尚未引進的國際認證療法和醫療器械。"
      }
    },

    {
      id: "cd-panda-health",
      area: "chengdu",
      name: "Chengdu Panda Health Hospital",
      localName: "成都熊猫健康医院",
      tags: ["tcm", "checkup", "dental"],
      rating: 4.5,
      established: 2012,
      beds: 300,
      intlPatientsPerYear: 500,
      desc: {
        en: "A friendly, mid-sized hospital popular with long-stay expatriates, offering general checkups, dental care, and TCM consultations.",
        "zh-CN": "深受长期在华外籍人士喜爱的中型医院，提供常规体检、牙科和中医问诊服务。",
        "zh-TW": "深受長期在華外籍人士喜愛的中型醫院，提供常規體檢、牙科和中醫問診服務。"
      }
    },

    {
      id: "xa-silkroad-med",
      area: "xian",
      name: "Xi'an Silk Road Medical Center",
      localName: "西安丝路医疗中心",
      tags: ["orthopedics", "checkup", "cardiology"],
      rating: 4.5,
      established: 2007,
      beds: 450,
      intlPatientsPerYear: 600,
      desc: {
        en: "A regional referral hospital serving northwestern China, with an orthopedics department specializing in joint replacement for older patients.",
        "zh-CN": "服务中国西北地区的区域转诊医院，骨科专长于老年患者的关节置换手术。",
        "zh-TW": "服務中國西北地區的區域轉診醫院，骨科專長於老年患者的關節置換手術。"
      }
    }
  ],

  programs: [
    // Beijing Global Health
    { id: "p-bj1-checkup", hospitalId: "bj-global-health", category: "checkup", duration: { en: "1 day", "zh-CN": "1天", "zh-TW": "1天" }, price: "$800 – $1,800",
      name: { en: "Executive Health Screening", "zh-CN": "高端健康体检", "zh-TW": "高端健康體檢" },
      desc: { en: "Comprehensive full-body screening including bloodwork, imaging, cardiac assessment, and a same-day physician consultation.", "zh-CN": "全面的全身体检，包括血液检查、影像检查、心脏评估及当日医生问诊。", "zh-TW": "全面的全身體檢，包括血液檢查、影像檢查、心臟評估及當日醫生問診。" },
      includes: { en: ["Full lab panel", "CT/MRI imaging", "Cardiologist consult", "Personalized report"], "zh-CN": ["全套化验", "CT/MRI影像", "心脏科医生问诊", "个性化报告"], "zh-TW": ["全套化驗", "CT/MRI影像", "心臟科醫生問診", "個人化報告"] } },
    { id: "p-bj1-oncology", hospitalId: "bj-global-health", category: "oncology", duration: { en: "5 – 10 days", "zh-CN": "5-10天", "zh-TW": "5-10天" }, price: "$6,000 – $25,000",
      name: { en: "Precision Oncology Program", "zh-CN": "精准肿瘤治疗项目", "zh-TW": "精準腫瘤治療項目" },
      desc: { en: "Multidisciplinary cancer diagnosis and treatment planning, including genomic testing and targeted therapy options.", "zh-CN": "多学科肿瘤诊断与治疗方案制定，包括基因检测和靶向治疗选择。", "zh-TW": "多學科腫瘤診斷與治療方案制定，包括基因檢測和標靶治療選擇。" },
      includes: { en: ["Tumor board review", "Genomic testing", "Treatment planning", "Care coordinator"], "zh-CN": ["多学科会诊", "基因检测", "治疗方案制定", "专属协调员"], "zh-TW": ["多學科會診", "基因檢測", "治療方案制定", "專屬協調員"] } },

    { id: "p-bj2-cardio", hospitalId: "bj-heart-center", category: "cardiology", duration: { en: "3 – 7 days", "zh-CN": "3-7天", "zh-TW": "3-7天" }, price: "$9,000 – $30,000",
      name: { en: "Minimally Invasive Cardiac Care", "zh-CN": "微创心脏诊疗", "zh-TW": "微創心臟診療" },
      desc: { en: "Catheter-based diagnosis and treatment for coronary artery disease and arrhythmias, with cardiac rehab follow-up.", "zh-CN": "针对冠心病和心律失常的导管介入诊疗，并提供术后心脏康复随访。", "zh-TW": "針對冠心病和心律失常的導管介入診療，並提供術後心臟康復隨訪。" },
      includes: { en: ["Cardiac catheterization", "Specialist surgeon", "3 nights recovery ward", "Rehab follow-up"], "zh-CN": ["心导管检查", "专科医生手术", "3晚康复病房", "术后康复随访"], "zh-TW": ["心導管檢查", "專科醫生手術", "3晚康復病房", "術後康復隨訪"] } },
    { id: "p-bj2-checkup", hospitalId: "bj-heart-center", category: "checkup", duration: { en: "Half day", "zh-CN": "半天", "zh-TW": "半天" }, price: "$400 – $900",
      name: { en: "Cardiac Risk Screening", "zh-CN": "心脏风险筛查", "zh-TW": "心臟風險篩查" },
      desc: { en: "Focused screening for heart disease risk, including ECG, echocardiogram and cholesterol panel.", "zh-CN": "针对心脏病风险的专项筛查，包括心电图、超声心动图和血脂检测。", "zh-TW": "針對心臟病風險的專項篩查，包括心電圖、超音波心動圖和血脂檢測。" },
      includes: { en: ["ECG", "Echocardiogram", "Blood panel", "Physician review"], "zh-CN": ["心电图", "超声心动图", "血液检测", "医生解读"], "zh-TW": ["心電圖", "超音波心動圖", "血液檢測", "醫生解讀"] } },

    { id: "p-sh1-checkup", hospitalId: "sh-union-intl", category: "checkup", duration: { en: "1 day", "zh-CN": "1天", "zh-TW": "1天" }, price: "$700 – $1,600",
      name: { en: "Senior Wellness Checkup", "zh-CN": "老年健康体检", "zh-TW": "老年健康體檢" },
      desc: { en: "A checkup package designed for older adults, covering bone density, cognitive screening, and chronic disease markers.", "zh-CN": "专为老年人设计的体检套餐，包括骨密度、认知筛查及慢性病指标检测。", "zh-TW": "專為老年人設計的體檢套餐，包括骨密度、認知篩查及慢性病指標檢測。" },
      includes: { en: ["Bone density scan", "Cognitive screening", "Chronic disease panel", "Geriatric consult"], "zh-CN": ["骨密度检测", "认知功能筛查", "慢性病指标检测", "老年科医生问诊"], "zh-TW": ["骨密度檢測", "認知功能篩查", "慢性病指標檢測", "老年科醫生問診"] } },
    { id: "p-sh1-fertility", hospitalId: "sh-union-intl", category: "fertility", duration: { en: "2 – 4 weeks", "zh-CN": "2-4周", "zh-TW": "2-4週" }, price: "$5,000 – $15,000",
      name: { en: "IVF Treatment Cycle", "zh-CN": "试管婴儿疗程", "zh-TW": "試管嬰兒療程" },
      desc: { en: "A full in-vitro fertilization cycle with bilingual reproductive specialists and counseling support.", "zh-CN": "完整的试管婴儿疗程，配备双语生殖专科医生及心理咨询支持。", "zh-TW": "完整的試管嬰兒療程，配備雙語生殖專科醫生及心理諮詢支持。" },
      includes: { en: ["Fertility assessment", "Egg retrieval", "Embryo transfer", "Counseling sessions"], "zh-CN": ["生育评估", "取卵手术", "胚胎移植", "心理咨询"], "zh-TW": ["生育評估", "取卵手術", "胚胎移植", "心理諮詢"] } },

    { id: "p-sh2-ortho", hospitalId: "sh-eastview", category: "orthopedics", duration: { en: "2 – 3 weeks", "zh-CN": "2-3周", "zh-TW": "2-3週" }, price: "$4,000 – $12,000",
      name: { en: "Joint Recovery & Rehab Program", "zh-CN": "关节康复项目", "zh-TW": "關節康復項目" },
      desc: { en: "Post-surgical or age-related joint rehabilitation combining physiotherapy with TCM recovery techniques.", "zh-CN": "结合物理治疗与中医康复手法，适用于术后或老年关节康复。", "zh-TW": "結合物理治療與中醫康復手法，適用於術後或老年關節康復。" },
      includes: { en: ["Physiotherapy sessions", "TCM massage/acupuncture", "Mobility assessment", "Take-home care plan"], "zh-CN": ["物理治疗", "中医推拿/针灸", "运动能力评估", "居家康复方案"], "zh-TW": ["物理治療", "中醫推拿/針灸", "運動能力評估", "居家康復方案"] } },
    { id: "p-sh2-tcm", hospitalId: "sh-eastview", category: "tcm", duration: { en: "1 – 2 weeks", "zh-CN": "1-2周", "zh-TW": "1-2週" }, price: "$1,200 – $3,500",
      name: { en: "Traditional Chinese Medicine Wellness Retreat", "zh-CN": "中医养生疗程", "zh-TW": "中醫養生療程" },
      desc: { en: "A guided TCM program including acupuncture, herbal medicine consultation, and tui na therapy for general wellness.", "zh-CN": "包含针灸、中药问诊及推拿理疗的中医引导式养生项目。", "zh-TW": "包含針灸、中藥問診及推拿理療的中醫引導式養生項目。" },
      includes: { en: ["Acupuncture sessions", "Herbal consultation", "Tui na massage", "Dietary guidance"], "zh-CN": ["针灸疗程", "中药问诊", "推拿理疗", "饮食调理指导"], "zh-TW": ["針灸療程", "中藥問診", "推拿理療", "飲食調理指導"] } },

    { id: "p-hz1-tcm", hospitalId: "hz-westlake", category: "tcm", duration: { en: "1 week", "zh-CN": "1周", "zh-TW": "1週" }, price: "$1,000 – $2,800",
      name: { en: "West Lake TCM Wellness Week", "zh-CN": "西湖中医养生周", "zh-TW": "西湖中醫養生週" },
      desc: { en: "A relaxed week of TCM consultations, tea therapy, and lakeside recovery walks for stress and fatigue.", "zh-CN": "轻松的一周中医问诊、茶疗以及湖畔康复漫步，缓解压力与疲劳。", "zh-TW": "輕鬆的一週中醫問診、茶療以及湖畔康復漫步，緩解壓力與疲勞。" },
      includes: { en: ["TCM consultation", "Herbal tea therapy", "Acupuncture", "Guided recovery walks"], "zh-CN": ["中医问诊", "药膳茶疗", "针灸", "引导式康复漫步"], "zh-TW": ["中醫問診", "藥膳茶療", "針灸", "引導式康復漫步"] } },
    { id: "p-hz1-cosmetic", hospitalId: "hz-westlake", category: "cosmetic", duration: { en: "2 – 5 days", "zh-CN": "2-5天", "zh-TW": "2-5天" }, price: "$1,500 – $8,000",
      name: { en: "Aesthetic & Skin Renewal Program", "zh-CN": "医美焕肤项目", "zh-TW": "醫美煥膚項目" },
      desc: { en: "Non-surgical aesthetic treatments including laser skin renewal and dermatology consultation.", "zh-CN": "非手术类医美项目，包括激光焕肤及皮肤科问诊。", "zh-TW": "非手術類醫美項目，包括雷射煥膚及皮膚科問診。" },
      includes: { en: ["Dermatology consult", "Laser treatment", "Skin analysis", "Aftercare kit"], "zh-CN": ["皮肤科问诊", "激光治疗", "皮肤检测", "术后护理套装"], "zh-TW": ["皮膚科問診", "雷射治療", "皮膚檢測", "術後護理套裝"] } },

    { id: "p-gz1-oncology", hospitalId: "gz-southern-general", category: "oncology", duration: { en: "1 – 3 weeks", "zh-CN": "1-3周", "zh-TW": "1-3週" }, price: "$5,000 – $20,000",
      name: { en: "Comprehensive Cancer Treatment", "zh-CN": "综合肿瘤治疗", "zh-TW": "綜合腫瘤治療" },
      desc: { en: "Surgical, chemotherapy, and radiotherapy options coordinated by a multidisciplinary oncology team.", "zh-CN": "由多学科肿瘤团队协调的手术、化疗及放疗方案。", "zh-TW": "由多學科腫瘤團隊協調的手術、化療及放療方案。" },
      includes: { en: ["Oncology team review", "Treatment of choice", "Inpatient stay", "Discharge planning"], "zh-CN": ["肿瘤团队会诊", "治疗方案实施", "住院治疗", "出院计划"], "zh-TW": ["腫瘤團隊會診", "治療方案實施", "住院治療", "出院計畫"] } },
    { id: "p-gz1-dental", hospitalId: "gz-southern-general", category: "dental", duration: { en: "3 – 7 days", "zh-CN": "3-7天", "zh-TW": "3-7天" }, price: "$800 – $5,000",
      name: { en: "Full Dental Restoration", "zh-CN": "全口牙齿修复", "zh-TW": "全口牙齒修復" },
      desc: { en: "Implants, crowns, and full-mouth restoration performed by a maxillofacial specialist team.", "zh-CN": "由颌面外科专科团队完成的种植牙、牙冠及全口修复。", "zh-TW": "由頜面外科專科團隊完成的植牙、牙冠及全口修復。" },
      includes: { en: ["Dental exam & X-ray", "Implant/crown procedure", "Follow-up visit", "Aftercare instructions"], "zh-CN": ["口腔检查及X光", "种植/牙冠手术", "复诊", "术后护理指导"], "zh-TW": ["口腔檢查及X光", "植牙/牙冠手術", "複診", "術後護理指導"] } },

    { id: "p-sz1-checkup", hospitalId: "sz-bay-medical", category: "checkup", duration: { en: "1 day", "zh-CN": "1天", "zh-TW": "1天" }, price: "$900 – $2,200",
      name: { en: "Premium Executive Screening", "zh-CN": "高端管理层体检", "zh-TW": "高端管理層體檢" },
      desc: { en: "A same-day, VIP-style screening with private suite, concierge service, and rapid results.", "zh-CN": "当日完成的VIP体检服务，配备私人套房、礼宾服务及快速出结果。", "zh-TW": "當日完成的VIP體檢服務，配備私人套房、禮賓服務及快速出結果。" },
      includes: { en: ["Private suite", "Full-body scan", "Rapid lab results", "Concierge service"], "zh-CN": ["私人套房", "全身扫描", "快速化验结果", "礼宾服务"], "zh-TW": ["私人套房", "全身掃描", "快速化驗結果", "禮賓服務"] } },
    { id: "p-sz1-cosmetic", hospitalId: "sz-bay-medical", category: "cosmetic", duration: { en: "1 – 4 days", "zh-CN": "1-4天", "zh-TW": "1-4天" }, price: "$1,000 – $10,000",
      name: { en: "Advanced Aesthetic Medicine", "zh-CN": "高端医美项目", "zh-TW": "高端醫美項目" },
      desc: { en: "A range of surgical and non-surgical aesthetic procedures using the latest robotic and laser technology.", "zh-CN": "采用最新机器人及激光技术的手术与非手术类医美项目。", "zh-TW": "採用最新機器人及雷射技術的手術與非手術類醫美項目。" },
      includes: { en: ["Consultation", "Procedure of choice", "Recovery suite", "Follow-up care"], "zh-CN": ["问诊", "所选项目手术", "恢复套房", "术后随访"], "zh-TW": ["問診", "所選項目手術", "恢復套房", "術後隨訪"] } },

    { id: "p-hn1-oncology", hospitalId: "hn-boao-lecheng", category: "oncology", duration: { en: "1 – 4 weeks", "zh-CN": "1-4周", "zh-TW": "1-4週" }, price: "$8,000 – $40,000",
      name: { en: "International Advanced Therapy Access", "zh-CN": "国际先进疗法通道", "zh-TW": "國際先進療法通道" },
      desc: { en: "Access to globally approved cancer therapies and devices available exclusively in the Boao pilot zone.", "zh-CN": "可使用仅在博鳌先行区提供的国际认证抗癌疗法及医疗器械。", "zh-TW": "可使用僅在博鰲先行區提供的國際認證抗癌療法及醫療器械。" },
      includes: { en: ["Specialist consultation", "Advanced therapy access", "Inpatient care", "Case manager"], "zh-CN": ["专科问诊", "先进疗法准入", "住院护理", "专属个案经理"], "zh-TW": ["專科問診", "先進療法准入", "住院護理", "專屬個案經理"] } },
    { id: "p-hn1-checkup", hospitalId: "hn-boao-lecheng", category: "checkup", duration: { en: "1 – 2 days", "zh-CN": "1-2天", "zh-TW": "1-2天" }, price: "$1,000 – $2,500",
      name: { en: "Tropical Island Wellness Screening", "zh-CN": "海岛健康体检", "zh-TW": "海島健康體檢" },
      desc: { en: "A resort-style checkup combining comprehensive screening with recovery time on Hainan's coast.", "zh-CN": "度假式体检项目，将全面检查与海南海岸休养时间相结合。", "zh-TW": "度假式體檢項目，將全面檢查與海南海岸休養時間相結合。" },
      includes: { en: ["Full-body screening", "Beachfront recovery suite", "Nutrition consult", "Personalized report"], "zh-CN": ["全身检查", "海景恢复套房", "营养咨询", "个性化报告"], "zh-TW": ["全身檢查", "海景恢復套房", "營養諮詢", "個人化報告"] } },

    { id: "p-cd1-tcm", hospitalId: "cd-panda-health", category: "tcm", duration: { en: "3 – 7 days", "zh-CN": "3-7天", "zh-TW": "3-7天" }, price: "$500 – $1,800",
      name: { en: "Everyday TCM Wellness Package", "zh-CN": "日常中医养生套餐", "zh-TW": "日常中醫養生套餐" },
      desc: { en: "An accessible introduction to TCM, including consultation, acupuncture, and herbal remedies.", "zh-CN": "轻松入门中医的套餐，包括问诊、针灸及中药调理。", "zh-TW": "輕鬆入門中醫的套餐，包括問診、針灸及中藥調理。" },
      includes: { en: ["TCM consultation", "Acupuncture sessions", "Herbal remedies", "Follow-up advice"], "zh-CN": ["中医问诊", "针灸疗程", "中药调理", "复诊建议"], "zh-TW": ["中醫問診", "針灸療程", "中藥調理", "複診建議"] } },
    { id: "p-cd1-dental", hospitalId: "cd-panda-health", category: "dental", duration: { en: "1 – 3 days", "zh-CN": "1-3天", "zh-TW": "1-3天" }, price: "$300 – $2,500",
      name: { en: "General Dental Care Package", "zh-CN": "常规牙科护理套餐", "zh-TW": "常規牙科護理套餐" },
      desc: { en: "Cleaning, fillings, and minor dental procedures at accessible pricing for long-stay visitors.", "zh-CN": "为长期在华人士提供的洁牙、补牙及小型牙科处置，价格亲民。", "zh-TW": "為長期在華人士提供的潔牙、補牙及小型牙科處置，價格親民。" },
      includes: { en: ["Cleaning & exam", "Fillings if needed", "X-ray", "Oral care kit"], "zh-CN": ["洁牙及检查", "补牙（如需）", "X光检查", "口腔护理包"], "zh-TW": ["潔牙及檢查", "補牙（如需）", "X光檢查", "口腔護理包"] } },

    { id: "p-xa1-ortho", hospitalId: "xa-silkroad-med", category: "orthopedics", duration: { en: "1 – 3 weeks", "zh-CN": "1-3周", "zh-TW": "1-3週" }, price: "$5,000 – $18,000",
      name: { en: "Joint Replacement Program", "zh-CN": "关节置换项目", "zh-TW": "關節置換項目" },
      desc: { en: "Hip and knee replacement surgery designed for older patients, with an emphasis on mobility recovery.", "zh-CN": "专为老年患者设计的髋关节及膝关节置换手术，注重术后行动能力恢复。", "zh-TW": "專為老年患者設計的髖關節及膝關節置換手術，注重術後行動能力恢復。" },
      includes: { en: ["Pre-op assessment", "Surgery", "Inpatient recovery", "Physiotherapy plan"], "zh-CN": ["术前评估", "手术", "住院康复", "物理治疗方案"], "zh-TW": ["術前評估", "手術", "住院康復", "物理治療方案"] } },
    { id: "p-xa1-checkup", hospitalId: "xa-silkroad-med", category: "checkup", duration: { en: "1 day", "zh-CN": "1天", "zh-TW": "1天" }, price: "$500 – $1,200",
      name: { en: "Senior Mobility Health Screening", "zh-CN": "老年行动能力体检", "zh-TW": "老年行動能力體檢" },
      desc: { en: "A checkup focused on bone, joint, and cardiovascular health for older travelers.", "zh-CN": "针对老年旅客骨骼、关节及心血管健康的专项体检。", "zh-TW": "針對老年旅客骨骼、關節及心血管健康的專項體檢。" },
      includes: { en: ["Bone density scan", "Joint mobility test", "Cardiovascular panel", "Physician review"], "zh-CN": ["骨密度检测", "关节活动度测试", "心血管检测", "医生解读"], "zh-TW": ["骨密度檢測", "關節活動度測試", "心血管檢測", "醫生解讀"] } }
  ],

  agents: [
    { id: "a-emily-zhang", name: "Emily Zhang", languages: ["en", "zh-CN", "zh-TW"], specialties: ["checkup", "oncology", "cardiology"], years: 8, rating: 4.9,
      bio: { en: "Emily has guided over 300 international families through hospitals in Beijing and Shanghai, specializing in senior care logistics.", "zh-CN": "Emily已协助超过300个国际家庭在北京和上海就医，专注于老年患者的行程与生活协调。", "zh-TW": "Emily已協助超過300個國際家庭在北京和上海就醫，專注於老年患者的行程與生活協調。" },
      services: { en: ["Airport pickup", "Hospital liaison", "Medical translation", "Hotel booking", "Itinerary planning"], "zh-CN": ["机场接送", "医院陪诊", "医疗翻译", "酒店预订", "行程规划"], "zh-TW": ["機場接送", "醫院陪診", "醫療翻譯", "飯店預訂", "行程規劃"] } },
    { id: "a-carlos-mendez", name: "Carlos Méndez", languages: ["en", "es", "zh-CN"], specialties: ["oncology", "fertility", "checkup"], years: 6, rating: 4.8,
      bio: { en: "Carlos supports Spanish-speaking families from Latin America and Spain, with deep experience in oncology second-opinion cases.", "zh-CN": "Carlos为来自拉丁美洲和西班牙的西语家庭提供服务，在肿瘤二诊方面经验丰富。", "zh-TW": "Carlos為來自拉丁美洲和西班牙的西語家庭提供服務，在腫瘤二診方面經驗豐富。" },
      services: { en: ["Visa assistance", "Hospital liaison", "Medical translation", "24/7 phone support"], "zh-CN": ["签证协助", "医院陪诊", "医疗翻译", "24小时电话支持"], "zh-TW": ["簽證協助", "醫院陪診", "醫療翻譯", "24小時電話支援"] } },
    { id: "a-fatima-alsayed", name: "Fatima Al-Sayed", languages: ["ar", "en"], specialties: ["cosmetic", "checkup", "fertility"], years: 5, rating: 4.9,
      bio: { en: "Fatima works closely with families from the Middle East, coordinating culturally sensitive care and halal meal arrangements.", ar: "تعمل فاطمة عن كثب مع العائلات من الشرق الأوسط، وتنسق الرعاية بما يراعي الحساسية الثقافية وترتيبات الوجبات الحلال." },
      services: { en: ["Halal meal coordination", "Prayer space arrangement", "Hospital liaison", "Medical translation"], ar: ["تنسيق الوجبات الحلال", "ترتيب مصلى", "التنسيق مع المستشفى", "الترجمة الطبية"] } },
    { id: "a-yuki-tanaka", name: "Yuki Tanaka", languages: ["ja", "en", "zh-CN"], specialties: ["cosmetic", "dental", "checkup"], years: 4, rating: 4.7,
      bio: { en: "Yuki assists Japanese-speaking clients seeking aesthetic and dental care, known for meticulous attention to detail.", ja: "Yukiは審美・歯科治療を希望する日本語話者のお客様をサポートし、細やかな気配りに定評があります。" },
      services: { en: ["Airport pickup", "Hospital liaison", "Medical translation", "Aftercare check-ins"], ja: ["空港送迎", "病院同行", "医療通訳", "術後フォローアップ"] } },
    { id: "a-hana-kim", name: "Hana Kim", languages: ["ko", "en", "zh-CN"], specialties: ["oncology", "checkup", "orthopedics"], years: 7, rating: 4.8,
      bio: { en: "Hana has extensive experience helping Korean families arrange long-term treatment stays and family accommodation.", ko: "Hanaは韓国語の家族に長期治療滞在と家族向け宿泊施設の手配を手伝う豊富な経験を持っています。" },
      services: { en: ["Extended-stay housing", "Hospital liaison", "Medical translation", "Family support"], ko: ["장기 체류 숙소 마련", "병원 동행", "의료 통역", "가족 지원"] } },
    { id: "a-oliver-brown", name: "Oliver Brown", languages: ["en", "fr"], specialties: ["cardiology", "orthopedics", "checkup"], years: 10, rating: 4.9,
      bio: { en: "A former hospital administrator, Oliver specializes in complex cardiac and orthopedic cases for English and French-speaking patients.", fr: "Ancien administrateur hospitalier, Olivier est spécialisé dans les cas cardiaques et orthopédiques complexes pour les patients francophones et anglophones." },
      services: { en: ["Case management", "Hospital liaison", "Second-opinion coordination", "Insurance paperwork support"], fr: ["Gestion de dossier", "Coordination avec l'hôpital", "Coordination de second avis", "Aide aux démarches d'assurance"] } },
    { id: "a-anna-petrova", name: "Anna Petrova", languages: ["ru", "en"], specialties: ["checkup", "tcm", "cosmetic"], years: 5, rating: 4.6,
      bio: { en: "Anna supports Russian-speaking clients across wellness, TCM, and aesthetic programs in Hangzhou and Shenzhen.", ru: "Анна поддерживает русскоязычных клиентов в программах оздоровления, ТКМ и эстетической медицины в Ханчжоу и Шэньчжэне." },
      services: { en: ["Hospital liaison", "Medical translation", "Hotel booking", "Local SIM/transport setup"], ru: ["Сопровождение в больнице", "Медицинский перевод", "Бронирование отеля", "Организация SIM-карты и транспорта"] } },
    { id: "a-liu-wei", name: "Liu Wei", languages: ["zh-CN", "zh-TW", "en"], specialties: ["tcm", "dental", "checkup"], years: 9, rating: 4.8,
      bio: { en: "Liu Wei specializes in supporting overseas Chinese families and long-stay expatriates across Chengdu and Xi'an.", "zh-CN": "刘伟专注于为海外华人家庭及在成都、西安长期居住的外籍人士提供服务。", "zh-TW": "劉偉專注於為海外華人家庭及在成都、西安長期居住的外籍人士提供服務。" },
      services: { en: ["Airport pickup", "Hospital liaison", "Local errands support", "Family accommodation"], "zh-CN": ["机场接送", "医院陪诊", "生活代办", "家属住宿安排"], "zh-TW": ["機場接送", "醫院陪診", "生活代辦", "家屬住宿安排"] } },
    { id: "a-priya-sharma", name: "Priya Sharma", languages: ["hi", "en"], specialties: ["oncology", "fertility", "checkup"], years: 6, rating: 4.7,
      bio: { en: "Priya helps families from India navigate treatment planning, with particular expertise in fertility and oncology programs.", hi: "प्रिया भारत से आने वाले परिवारों को उपचार योजना बनाने में मदद करती हैं, विशेष रूप से प्रजनन और कैंसर कार्यक्रमों में उनकी विशेषज्ञता है।" },
      services: { en: ["Visa assistance", "Hospital liaison", "Medical translation", "Vegetarian meal coordination"], hi: ["वीज़ा सहायता", "अस्पताल समन्वय", "चिकित्सा अनुवाद", "शाकाहारी भोजन समन्वय"] } },
    { id: "a-lukas-schmidt", name: "Lukas Schmidt", languages: ["de", "en"], specialties: ["orthopedics", "cardiology", "checkup"], years: 7, rating: 4.8,
      bio: { en: "Lukas supports German-speaking patients with orthopedic and cardiac programs, and coordinates closely with home-country physicians.", de: "Lukas unterstützt deutschsprachige Patienten bei orthopädischen und kardiologischen Programmen und arbeitet eng mit Ärzten im Heimatland zusammen." },
      services: { en: ["Hospital liaison", "Medical record translation", "Home-country doctor coordination", "Recovery check-ins"], de: ["Krankenhausbetreuung", "Übersetzung von Krankenakten", "Abstimmung mit Ärzten im Heimatland", "Genesungs-Check-ins"] } },
    { id: "a-mariana-costa", name: "Mariana Costa", languages: ["pt", "en", "es"], specialties: ["cosmetic", "dental", "checkup"], years: 4, rating: 4.6,
      bio: { en: "Mariana assists Portuguese and Spanish-speaking clients from Brazil and Portugal with aesthetic and dental travel programs.", pt: "Mariana auxilia clientes de língua portuguesa e espanhola do Brasil e de Portugal em programas de viagem estética e odontológica." },
      services: { en: ["Hospital liaison", "Medical translation", "Hotel booking", "Local transport setup"], pt: ["Acompanhamento hospitalar", "Tradução médica", "Reserva de hotel", "Organização de transporte local"] } },
    { id: "a-wei-chen", name: "Wei Chen", languages: ["zh-CN", "zh-TW", "en", "ja"], specialties: ["checkup", "oncology", "cosmetic", "cardiology"], years: 12, rating: 5.0,
      bio: { en: "A senior patient coordinator with 12 years of experience, Wei leads complex, multi-hospital cases for VIP clients across all regions.", "zh-CN": "资深患者协调专员，拥有12年经验，负责统筹各地区VIP客户的复杂多院联合诊疗。", "zh-TW": "資深患者協調專員，擁有12年經驗，負責統籌各地區VIP客戶的複雜多院聯合診療。" },
      services: { en: ["VIP case management", "Multi-hospital coordination", "24/7 concierge", "Family support"], "zh-CN": ["VIP个案管理", "多院协调", "24小时礼宾服务", "家属支持"], "zh-TW": ["VIP個案管理", "多院協調", "24小時禮賓服務", "家屬支持"] } }
  ],

  /* Look up localized text with graceful fallback to English. */
  text: function (field, lang) {
    if (!field) return "";
    return field[lang] || field.en || Object.values(field)[0] || "";
  },
  textList: function (field, lang) {
    if (!field) return [];
    return field[lang] || field.en || Object.values(field)[0] || [];
  }
};
