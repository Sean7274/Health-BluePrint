/* Health Blueprint — directory data.
   Hospital list, tiers, and cities are drawn from the publicly published
   2023 China Hospital Ranking (中国医院综合排行榜). Official website URLs
   were researched individually; two hospitals had no confidently-verified
   official site and are listed as null rather than guessed — do not
   fabricate a URL for those. Programs are shown as generic specialty
   categories (not hospital-specific pricing), since we don't have
   published package/price data for these real institutions — actual
   details are meant to come from the assigned agent during consultation.
   Agent and route data below are illustrative sample content. */

(function () {
  "use strict";

  // [tier, Chinese name, English name, area id]
  var RAW_HOSPITALS = [
    // A++++
    ["A++++", "中国人民解放军总医院", "Chinese PLA General Hospital (301 Hospital)", "beijing"],
    ["A++++", "中国医学科学院北京协和医院", "Peking Union Medical College Hospital", "beijing"],
    ["A++++", "北京大学第一医院", "Peking University First Hospital", "beijing"],
    ["A++++", "北京大学第三医院", "Peking University Third Hospital", "beijing"],
    ["A++++", "中国医科大学附属第一医院", "The First Hospital of China Medical University", "shenyang"],
    ["A++++", "上海交通大学医学院附属仁济医院", "Renji Hospital, Shanghai Jiao Tong University School of Medicine", "shanghai"],
    ["A++++", "上海交通大学医学院附属瑞金医院", "Ruijin Hospital, Shanghai Jiao Tong University School of Medicine", "shanghai"],
    ["A++++", "复旦大学附属中山医院", "Zhongshan Hospital, Fudan University", "shanghai"],
    ["A++++", "复旦大学附属华山医院", "Huashan Hospital, Fudan University", "shanghai"],
    ["A++++", "浙江大学医学院附属第一医院", "The First Affiliated Hospital, Zhejiang University School of Medicine", "hangzhou"],
    ["A++++", "浙江大学医学院附属第二医院", "The Second Affiliated Hospital, Zhejiang University School of Medicine", "hangzhou"],
    ["A++++", "郑州大学第一附属医院", "The First Affiliated Hospital of Zhengzhou University", "zhengzhou"],
    ["A++++", "华中科技大学同济医学院附属协和医院", "Union Hospital, Tongji Medical College, HUST", "wuhan"],
    ["A++++", "华中科技大学同济医学院附属同济医院", "Tongji Hospital, Tongji Medical College, HUST", "wuhan"],
    ["A++++", "中南大学湘雅二医院", "The Second Xiangya Hospital, Central South University", "changsha"],
    ["A++++", "中南大学湘雅医院", "Xiangya Hospital, Central South University", "changsha"],
    ["A++++", "中山大学附属第一医院", "The First Affiliated Hospital of Sun Yat-sen University", "guangzhou"],
    ["A++++", "南方医科大学南方医院", "Nanfang Hospital, Southern Medical University", "guangzhou"],
    ["A++++", "四川大学华西医院", "West China Hospital, Sichuan University", "chengdu"],
    ["A++++", "空军军医大学第一附属医院（西京医院）", "Xijing Hospital, Air Force Medical University", "xian"],
    // A+++
    ["A+++", "中日友好医院", "China-Japan Friendship Hospital", "beijing"],
    ["A+++", "中国医学科学院阜外医院", "Fuwai Hospital, Chinese Academy of Medical Sciences", "beijing"],
    ["A+++", "中国医学科学院肿瘤医院", "Cancer Hospital, Chinese Academy of Medical Sciences", "beijing"],
    ["A+++", "北京大学人民医院", "Peking University People's Hospital", "beijing"],
    ["A+++", "首都医科大学附属北京儿童医院", "Beijing Children's Hospital, Capital Medical University", "beijing"],
    ["A+++", "首都医科大学附属北京天坛医院", "Beijing Tiantan Hospital, Capital Medical University", "beijing"],
    ["A+++", "首都医科大学附属北京同仁医院", "Beijing Tongren Hospital, Capital Medical University", "beijing"],
    ["A+++", "上海市第六人民医院", "Shanghai Sixth People's Hospital", "shanghai"],
    ["A+++", "上海交通大学医学院附属第九人民医院", "Ninth People's Hospital, Shanghai Jiao Tong University School of Medicine", "shanghai"],
    ["A+++", "复旦大学附属儿科医院", "Children's Hospital of Fudan University", "shanghai"],
    ["A+++", "复旦大学附属肿瘤医院", "Fudan University Shanghai Cancer Center", "shanghai"],
    ["A+++", "海军军医大学第一附属医院", "Changhai Hospital, Naval Medical University", "shanghai"],
    ["A+++", "江苏省人民医院（南京医科大学第一附属医院）", "Jiangsu Province Hospital (First Affiliated Hospital of Nanjing Medical University)", "nanjing"],
    ["A+++", "南京大学医学院附属鼓楼医院", "Nanjing Drum Tower Hospital, Nanjing University", "nanjing"],
    ["A+++", "山东大学齐鲁医院", "Qilu Hospital of Shandong University", "jinan"],
    ["A+++", "广东省人民医院", "Guangdong Provincial People's Hospital", "guangzhou"],
    ["A+++", "广州医科大学附属第一医院", "The First Affiliated Hospital of Guangzhou Medical University", "guangzhou"],
    ["A+++", "中山大学肿瘤防治中心", "Sun Yat-sen University Cancer Center", "guangzhou"],
    ["A+++", "陆军军医大学第一附属医院", "Southwest Hospital, Army Medical University", "chongqing"],
    ["A+++", "四川省人民医院", "Sichuan Provincial People's Hospital", "chengdu"],
    // A++
    ["A++", "北京积水潭医院", "Beijing Jishuitan Hospital", "beijing"],
    ["A++", "首都医科大学附属北京安贞医院", "Beijing Anzhen Hospital, Capital Medical University", "beijing"],
    ["A++", "首都医科大学宣武医院", "Xuanwu Hospital, Capital Medical University", "beijing"],
    ["A++", "中国医科大学附属盛京医院", "Shengjing Hospital of China Medical University", "shenyang"],
    ["A++", "上海市肺科医院", "Shanghai Pulmonary Hospital", "shanghai"],
    ["A++", "上海交通大学医学院附属新华医院", "Xinhua Hospital, Shanghai Jiao Tong University School of Medicine", "shanghai"],
    ["A++", "复旦大学附属眼耳鼻喉科医院", "Eye & ENT Hospital of Fudan University", "shanghai"],
    ["A++", "中国人民解放军东部战区总医院", "General Hospital of Eastern Theater Command, PLA", "nanjing"],
    ["A++", "东南大学附属中大医院", "Zhongda Hospital, Southeast University", "nanjing"],
    ["A++", "苏州大学附属第一医院", "The First Affiliated Hospital of Soochow University", "suzhou"],
    ["A++", "浙江大学医学院附属邵逸夫医院", "Sir Run Run Shaw Hospital, Zhejiang University", "hangzhou"],
    ["A++", "福建医科大学附属第一医院", "The First Affiliated Hospital of Fujian Medical University", "fuzhou"],
    ["A++", "南昌大学第一附属医院", "The First Affiliated Hospital of Nanchang University", "nanchang"],
    ["A++", "山东第一医科大学附属省立医院（山东省立医院）", "Shandong Provincial Hospital", "jinan"],
    ["A++", "青岛大学附属医院", "The Affiliated Hospital of Qingdao University", "qingdao"],
    ["A++", "武汉大学人民医院", "Renmin Hospital of Wuhan University", "wuhan"],
    ["A++", "武汉大学中南医院", "Zhongnan Hospital of Wuhan University", "wuhan"],
    ["A++", "中山大学附属第三医院", "The Third Affiliated Hospital of Sun Yat-sen University", "guangzhou"],
    ["A++", "重庆医科大学附属第一医院", "The First Affiliated Hospital of Chongqing Medical University", "chongqing"],
    ["A++", "四川大学华西口腔医院", "West China School & Hospital of Stomatology, Sichuan University", "chengdu"],
    // A+
    ["A+", "北京大学口腔医院", "Peking University School and Hospital of Stomatology", "beijing"],
    ["A+", "北京大学肿瘤医院", "Peking University Cancer Hospital", "beijing"],
    ["A+", "北京医院", "Beijing Hospital", "beijing"],
    ["A+", "首都医科大学附属北京友谊医院", "Beijing Friendship Hospital, Capital Medical University", "beijing"],
    ["A+", "首都医科大学附属北京朝阳医院", "Beijing Chaoyang Hospital, Capital Medical University", "beijing"],
    ["A+", "天津医科大学肿瘤医院", "Tianjin Medical University Cancer Institute & Hospital", "tianjin"],
    ["A+", "天津医科大学总医院", "General Hospital of Tianjin Medical University", "tianjin"],
    ["A+", "吉林大学第一医院", "The First Hospital of Jilin University", "changchun"],
    ["A+", "哈尔滨医科大学附属第二医院", "The Second Affiliated Hospital of Harbin Medical University", "harbin"],
    ["A+", "浙江大学医学院附属儿童医院", "Children's Hospital, Zhejiang University School of Medicine", "hangzhou"],
    ["A+", "中国科学技术大学附属第一医院（安徽省立医院）", "The First Affiliated Hospital of USTC (Anhui Provincial Hospital)", "hefei"],
    ["A+", "安徽医科大学第一附属医院", "The First Affiliated Hospital of Anhui Medical University", "hefei"],
    ["A+", "中南大学湘雅三医院", "The Third Xiangya Hospital, Central South University", "changsha"],
    ["A+", "广州市妇女儿童医疗中心", "Guangzhou Women and Children's Medical Center", "guangzhou"],
    ["A+", "中山大学中山眼科中心", "Zhongshan Ophthalmic Center, Sun Yat-sen University", "guangzhou"],
    ["A+", "中山大学孙逸仙纪念医院", "Sun Yat-sen Memorial Hospital, Sun Yat-sen University", "guangzhou"],
    ["A+", "南方医科大学珠江医院", "Zhujiang Hospital, Southern Medical University", "guangzhou"],
    ["A+", "重庆医科大学附属儿童医院", "Children's Hospital of Chongqing Medical University", "chongqing"],
    ["A+", "四川大学华西第二医院", "West China Second University Hospital, Sichuan University", "chengdu"],
    ["A+", "西安交通大学第一附属医院", "The First Affiliated Hospital of Xi'an Jiaotong University", "xian"],
    // A
    ["A", "北京大学第六医院", "Peking University Sixth Hospital (Institute of Mental Health)", "beijing"],
    ["A", "首都医科大学附属北京世纪坛医院", "Beijing Shijitan Hospital, Capital Medical University", "beijing"],
    ["A", "中国医学科学院血液病医院（研究所）", "Institute of Hematology & Blood Diseases Hospital, CAMS", "tianjin"],
    ["A", "中国人民解放军北部战区总医院", "General Hospital of Northern Theater Command, PLA", "shenyang"],
    ["A", "哈尔滨医科大学附属第一医院", "The First Affiliated Hospital of Harbin Medical University", "harbin"],
    ["A", "上海市胸科医院（暨上海交通大学医学院附属胸科医院）", "Shanghai Chest Hospital", "shanghai"],
    ["A", "上海市第一人民医院", "Shanghai General Hospital", "shanghai"],
    ["A", "上海市精神卫生中心", "Shanghai Mental Health Center", "shanghai"],
    ["A", "上海交通大学医学院附属上海儿童医学中心", "Shanghai Children's Medical Center", "shanghai"],
    ["A", "复旦大学附属妇产科医院", "Obstetrics & Gynecology Hospital of Fudan University", "shanghai"],
    ["A", "海军军医大学第二附属医院", "Changzheng Hospital, Naval Medical University", "shanghai"],
    ["A", "浙江大学医学院附属妇产科医院", "Women's Hospital, Zhejiang University School of Medicine", "hangzhou"],
    ["A", "温州医科大学附属眼视光医院", "Eye Hospital of Wenzhou Medical University", "wenzhou"],
    ["A", "福建医科大学附属协和医院", "Fujian Medical University Union Hospital", "fuzhou"],
    ["A", "河南省人民医院", "Henan Provincial People's Hospital", "zhengzhou"],
    ["A", "武汉大学口腔医院", "School and Hospital of Stomatology, Wuhan University", "wuhan"],
    ["A", "深圳市人民医院", "Shenzhen People's Hospital", "shenzhen"],
    ["A", "陆军军医大学第二附属医院", "Xinqiao Hospital, Army Medical University", "chongqing"],
    ["A", "西安交通大学第二附属医院", "The Second Affiliated Hospital of Xi'an Jiaotong University", "xian"],
    ["A", "空军军医大学第二附属医院(唐都医院)", "Tangdu Hospital, Air Force Medical University", "xian"]
  ];

  // Official website research (see task notes). null = no confidently
  // verified official site found; do not guess.
  var WEBSITES = {
    "中国人民解放军总医院": "https://www.301hospital.com.cn/",
    "中国医学科学院北京协和医院": "https://www.pumch.cn/",
    "北京大学第一医院": "https://www.pkufh.com/",
    "北京大学第三医院": "https://www.puh3.net.cn/",
    "中国医科大学附属第一医院": "http://www.cmu1h.com/",
    "上海交通大学医学院附属仁济医院": "https://www.renji.com/",
    "上海交通大学医学院附属瑞金医院": "https://www.rjh.com.cn/",
    "复旦大学附属中山医院": "https://www.zs-hospital.sh.cn/",
    "复旦大学附属华山医院": "https://www.huashan.org.cn/",
    "浙江大学医学院附属第一医院": "https://www.zy91.com/",
    "浙江大学医学院附属第二医院": "http://www.z2hospital.com/",
    "郑州大学第一附属医院": "https://www.zdyfy.com/",
    "华中科技大学同济医学院附属协和医院": "https://www.whuh.com/",
    "华中科技大学同济医学院附属同济医院": "https://www.tjh.com.cn/",
    "中南大学湘雅二医院": "https://www.xyeyy.com/",
    "中南大学湘雅医院": "https://www.xiangya.com.cn/",
    "中山大学附属第一医院": "http://www.gzsums.net/",
    "南方医科大学南方医院": "https://www.nfyy.com/",
    "四川大学华西医院": "https://www.wchscu.cn/",
    "空军军医大学第一附属医院（西京医院）": "http://xjwww.fmmu.edu.cn/",
    "中日友好医院": "https://www.zryhyy.com.cn/",
    "中国医学科学院阜外医院": "https://www.fuwai.com/",
    "中国医学科学院肿瘤医院": "https://www.cicams.ac.cn/",
    "北京大学人民医院": "https://www.pkuph.cn/",
    "首都医科大学附属北京儿童医院": "http://www.bch.com.cn/",
    "首都医科大学附属北京天坛医院": "https://www.bjtth.org/",
    "首都医科大学附属北京同仁医院": "https://www.trhos.com/",
    "上海市第六人民医院": "https://www.6thhosp.com/",
    "上海交通大学医学院附属第九人民医院": "http://www.9hospital.com.cn/",
    "复旦大学附属儿科医院": "https://ch.shmu.edu.cn/",
    "复旦大学附属肿瘤医院": "https://www.shca.org.cn/",
    "海军军医大学第一附属医院": "https://www.chhospital.com.cn/",
    "江苏省人民医院（南京医科大学第一附属医院）": "http://www.jsph.org.cn/",
    "南京大学医学院附属鼓楼医院": "http://www.njglyy.com/",
    "山东大学齐鲁医院": "http://www.qiluhospital.com/",
    "广东省人民医院": "https://www.gdghospital.org.cn/",
    "广州医科大学附属第一医院": "https://www.gyfyy.com/cn/",
    "中山大学肿瘤防治中心": "http://www.sysucc.org.cn/",
    "陆军军医大学第一附属医院": "http://www.xnyy.cn/",
    "四川省人民医院": "https://www.samsph.cn/",
    "北京积水潭医院": "https://www.jst-hosp.com.cn/",
    "首都医科大学附属北京安贞医院": "https://www.anzhen.org.cn/",
    "首都医科大学宣武医院": "https://www.xwhosp.com.cn/",
    "中国医科大学附属盛京医院": "https://www.sj-hospital.cn/",
    "上海市肺科医院": "https://www.shsfkyy.com/",
    "上海交通大学医学院附属新华医院": "https://www.xinhuamed.com.cn/",
    "复旦大学附属眼耳鼻喉科医院": "https://www.fdeent.org/",
    "中国人民解放军东部战区总医院": null,
    "东南大学附属中大医院": "https://www.njzdyy.com/",
    "苏州大学附属第一医院": "http://fyy.sdfyy.cn/",
    "浙江大学医学院附属邵逸夫医院": "https://www.srrsh.com/",
    "福建医科大学附属第一医院": "http://www.fyyy.com/",
    "南昌大学第一附属医院": "https://www.cdyfy.com/",
    "山东第一医科大学附属省立医院（山东省立医院）": "https://www.sph.com.cn/",
    "青岛大学附属医院": "https://www.qduh.cn/",
    "武汉大学人民医院": "https://www.rmhospital.com/",
    "武汉大学中南医院": "https://www.znhospital.com/",
    "中山大学附属第三医院": "https://www.zssy.com.cn/",
    "重庆医科大学附属第一医院": "https://www.hospital-cqmu.com/",
    "四川大学华西口腔医院": "https://www.hxkq.org/",
    "北京大学口腔医院": "https://ss.bjmu.edu.cn/",
    "北京大学肿瘤医院": "http://www.bjcancer.org/",
    "北京医院": "http://www.bjhmoh.cn/",
    "首都医科大学附属北京友谊医院": "https://www.bfh.com.cn/",
    "首都医科大学附属北京朝阳医院": "https://www.bjcyh.com.cn/",
    "天津医科大学肿瘤医院": "https://www.tjmuch.com/",
    "天津医科大学总医院": "https://www.tjmugh.com.cn/",
    "吉林大学第一医院": "https://www.jdyy.cn/",
    "哈尔滨医科大学附属第二医院": "https://www.hrbmush.edu.cn/",
    "浙江大学医学院附属儿童医院": "https://www.zjuch.cn/",
    "中国科学技术大学附属第一医院（安徽省立医院）": "https://www.ahslyy.com.cn/",
    "安徽医科大学第一附属医院": "https://www.ayfy.com/",
    "中南大学湘雅三医院": "https://www.xy3yy.com/",
    "广州市妇女儿童医疗中心": "https://www.gzfezx.com/",
    "中山大学中山眼科中心": "https://www.gzzoc.com/",
    "中山大学孙逸仙纪念医院": "http://www.syshospital.com/",
    "南方医科大学珠江医院": "https://www.zjyy.com.cn/",
    "重庆医科大学附属儿童医院": "https://www.chcmu.com/",
    "四川大学华西第二医院": "https://www.motherchildren.com/",
    "西安交通大学第一附属医院": "http://www.dyyy.xjtu.edu.cn/",
    "北京大学第六医院": "https://www.pkuh6.cn/",
    "首都医科大学附属北京世纪坛医院": "https://www.bjsjth.cn/",
    "中国医学科学院血液病医院（研究所）": "https://www.chinablood.com.cn/",
    "中国人民解放军北部战区总医院": null,
    "哈尔滨医科大学附属第一医院": "https://www.54dr.org.cn/",
    "上海市胸科医院（暨上海交通大学医学院附属胸科医院）": "http://www.shxkyy.com/",
    "上海市第一人民医院": "https://www.firsthospital.cn/",
    "上海市精神卫生中心": "https://www.smhc.org.cn/",
    "上海交通大学医学院附属上海儿童医学中心": "https://www.scmc.com.cn/",
    "复旦大学附属妇产科医院": "https://www.fckyy.org.cn/",
    "海军军医大学第二附属医院": "https://www.shcz.com/",
    "浙江大学医学院附属妇产科医院": "https://www.womanhospital.cn/",
    "温州医科大学附属眼视光医院": "https://www.wzeye.cn/",
    "福建医科大学附属协和医院": "http://www.fjxiehe.com/",
    "河南省人民医院": "https://www.hnsrmyy.net/",
    "武汉大学口腔医院": "https://www.whuss.com/",
    "深圳市人民医院": "https://www.szhospital.com/",
    "陆军军医大学第二附属医院": "https://www.xqhospital.com.cn/",
    "西安交通大学第二附属医院": "http://www.2yuan.xjtu.edu.cn/",
    "空军军医大学第二附属医院(唐都医院)": "https://tdwww.fmmu.edu.cn/"
  };

  // Manual overrides for specialty focus that can't be inferred from the
  // name alone. Everything else is tagged by keyword matching below.
  var TAG_OVERRIDES = {
    "北京大学第六医院": ["psychiatry"],
    "北京积水潭医院": ["orthopedics"],
    "中国医学科学院阜外医院": ["cardiology"],
    "首都医科大学附属北京安贞医院": ["cardiology"],
    "首都医科大学附属北京天坛医院": ["neurology"],
    "首都医科大学宣武医院": ["neurology", "checkup"]
  };

  function inferTags(name) {
    if (TAG_OVERRIDES[name]) return TAG_OVERRIDES[name];
    var tags = [];
    if (/肿瘤|癌/.test(name)) tags.push("oncology");
    if (/儿童|儿科/.test(name)) tags.push("pediatrics");
    if (/妇产|妇幼|妇女儿童|女第二/.test(name)) tags.push("obgyn");
    if (/口腔/.test(name)) tags.push("dental");
    if (/眼科|眼耳鼻喉|眼视光/.test(name)) tags.push("ophthalmology");
    if (/精神卫生|精神心理/.test(name)) tags.push("psychiatry");
    if (/胸科|肺科/.test(name)) tags.push("respiratory");
    if (/血液病/.test(name)) tags.push("hematology");
    if (tags.length === 0) tags.push("checkup");
    return tags;
  }

  function slug(i) { return "h" + String(i + 1).padStart(3, "0"); }

  var hospitals = RAW_HOSPITALS.map(function (row, i) {
    var tier = row[0], name = row[1], nameEn = row[2], area = row[3];
    return {
      id: slug(i),
      tier: tier,
      name: name,
      nameEn: nameEn,
      area: area,
      website: Object.prototype.hasOwnProperty.call(WEBSITES, name) ? WEBSITES[name] : null,
      tags: inferTags(name)
    };
  });

  var TIER_ORDER = ["A++++", "A+++", "A++", "A+", "A"];

  window.DATA = {

    tierOrder: TIER_ORDER,

    areas: [
      "beijing", "shanghai", "tianjin", "chongqing", "guangzhou", "shenzhen",
      "hangzhou", "wenzhou", "nanjing", "suzhou", "chengdu", "xian", "wuhan",
      "changsha", "zhengzhou", "jinan", "qingdao", "shenyang", "changchun",
      "harbin", "hefei", "fuzhou", "nanchang"
    ],

    specialties: ["checkup", "oncology", "cardiology", "orthopedics", "dental", "pediatrics", "obgyn", "ophthalmology", "neurology", "psychiatry", "respiratory", "hematology"],

    hospitals: hospitals,

    agents: [
      { id: "a-emily-zhang", name: "Emily Zhang", languages: ["en", "zh-CN", "zh-TW"], specialties: ["checkup", "oncology", "cardiology"], years: 8, rating: 4.9,
        bio: { en: "Emily has guided over 300 international families through hospitals in Beijing and Shanghai, specializing in senior care logistics.", "zh-CN": "Emily已协助超过300个国际家庭在北京和上海就医，专注于老年患者的行程与生活协调。", "zh-TW": "Emily已協助超過300個國際家庭在北京和上海就醫，專注於老年患者的行程與生活協調。" },
        services: { en: ["Airport pickup", "Hospital liaison", "Medical translation", "Hotel booking", "Itinerary planning"], "zh-CN": ["机场接送", "医院陪诊", "医疗翻译", "酒店预订", "行程规划"], "zh-TW": ["機場接送", "醫院陪診", "醫療翻譯", "飯店預訂", "行程規劃"] } },
      { id: "a-carlos-mendez", name: "Carlos Méndez", languages: ["en", "es", "zh-CN"], specialties: ["oncology", "obgyn", "checkup"], years: 6, rating: 4.8,
        bio: { en: "Carlos supports Spanish-speaking families from Latin America and Spain, with deep experience in oncology second-opinion cases.", "zh-CN": "Carlos为来自拉丁美洲和西班牙的西语家庭提供服务，在肿瘤二诊方面经验丰富。", "zh-TW": "Carlos為來自拉丁美洲和西班牙的西語家庭提供服務，在腫瘤二診方面經驗豐富。" },
        services: { en: ["Visa assistance", "Hospital liaison", "Medical translation", "24/7 phone support"], "zh-CN": ["签证协助", "医院陪诊", "医疗翻译", "24小时电话支持"], "zh-TW": ["簽證協助", "醫院陪診", "醫療翻譯", "24小時電話支援"] } },
      { id: "a-fatima-alsayed", name: "Fatima Al-Sayed", languages: ["ar", "en"], specialties: ["checkup", "obgyn", "pediatrics"], years: 5, rating: 4.9,
        bio: { en: "Fatima works closely with families from the Middle East, coordinating culturally sensitive care and halal meal arrangements.", ar: "تعمل فاطمة عن كثب مع العائلات من الشرق الأوسط، وتنسق الرعاية بما يراعي الحساسية الثقافية وترتيبات الوجبات الحلال." },
        services: { en: ["Halal meal coordination", "Prayer space arrangement", "Hospital liaison", "Medical translation"], ar: ["تنسيق الوجبات الحلال", "ترتيب مصلى", "التنسيق مع المستشفى", "الترجمة الطبية"] } },
      { id: "a-yuki-tanaka", name: "Yuki Tanaka", languages: ["ja", "en", "zh-CN"], specialties: ["dental", "ophthalmology", "checkup"], years: 4, rating: 4.7,
        bio: { en: "Yuki assists Japanese-speaking clients seeking dental and eye care, known for meticulous attention to detail.", ja: "Yukiは歯科・眼科治療を希望する日本語話者のお客様をサポートし、細やかな気配りに定評があります。" },
        services: { en: ["Airport pickup", "Hospital liaison", "Medical translation", "Aftercare check-ins"], ja: ["空港送迎", "病院同行", "医療通訳", "術後フォローアップ"] } },
      { id: "a-hana-kim", name: "Hana Kim", languages: ["ko", "en", "zh-CN"], specialties: ["oncology", "checkup", "orthopedics"], years: 7, rating: 4.8,
        bio: { en: "Hana has extensive experience helping Korean families arrange long-term treatment stays and family accommodation.", ko: "Hana는 한국어를 사용하는 가족들이 장기 치료 체류와 가족 숙소를 마련하도록 돕는 풍부한 경험을 가지고 있습니다." },
        services: { en: ["Extended-stay housing", "Hospital liaison", "Medical translation", "Family support"], ko: ["장기 체류 숙소 마련", "병원 동행", "의료 통역", "가족 지원"] } },
      { id: "a-oliver-brown", name: "Oliver Brown", languages: ["en", "fr"], specialties: ["cardiology", "orthopedics", "checkup"], years: 10, rating: 4.9,
        bio: { en: "A former hospital administrator, Oliver specializes in complex cardiac and orthopedic cases for English and French-speaking patients.", fr: "Ancien administrateur hospitalier, Olivier est spécialisé dans les cas cardiaques et orthopédiques complexes pour les patients francophones et anglophones." },
        services: { en: ["Case management", "Hospital liaison", "Second-opinion coordination", "Insurance paperwork support"], fr: ["Gestion de dossier", "Coordination avec l'hôpital", "Coordination de second avis", "Aide aux démarches d'assurance"] } },
      { id: "a-anna-petrova", name: "Anna Petrova", languages: ["ru", "en"], specialties: ["checkup", "neurology", "psychiatry"], years: 5, rating: 4.6,
        bio: { en: "Anna supports Russian-speaking clients across general wellness, neurology, and mental health programs.", ru: "Анна поддерживает русскоязычных клиентов в программах общего оздоровления, неврологии и психического здоровья." },
        services: { en: ["Hospital liaison", "Medical translation", "Hotel booking", "Local SIM/transport setup"], ru: ["Сопровождение в больнице", "Медицинский перевод", "Бронирование отеля", "Организация SIM-карты и транспорта"] } },
      { id: "a-liu-wei", name: "Liu Wei", languages: ["zh-CN", "zh-TW", "en"], specialties: ["dental", "checkup", "respiratory"], years: 9, rating: 4.8,
        bio: { en: "Liu Wei specializes in supporting overseas Chinese families and long-stay expatriates across central and western China.", "zh-CN": "刘伟专注于为海外华人家庭及在中国中西部长期居住的外籍人士提供服务。", "zh-TW": "劉偉專注於為海外華人家庭及在中國中西部長期居住的外籍人士提供服務。" },
        services: { en: ["Airport pickup", "Hospital liaison", "Local errands support", "Family accommodation"], "zh-CN": ["机场接送", "医院陪诊", "生活代办", "家属住宿安排"], "zh-TW": ["機場接送", "醫院陪診", "生活代辦", "家屬住宿安排"] } },
      { id: "a-priya-sharma", name: "Priya Sharma", languages: ["hi", "en"], specialties: ["oncology", "obgyn", "checkup"], years: 6, rating: 4.7,
        bio: { en: "Priya helps families from India navigate treatment planning, with particular expertise in women's health and oncology programs.", hi: "प्रिया भारत से आने वाले परिवारों को उपचार योजना बनाने में मदद करती हैं, विशेष रूप से महिला स्वास्थ्य और कैंसर कार्यक्रमों में उनकी विशेषज्ञता है।" },
        services: { en: ["Visa assistance", "Hospital liaison", "Medical translation", "Vegetarian meal coordination"], hi: ["वीज़ा सहायता", "अस्पताल समन्वय", "चिकित्सा अनुवाद", "शाकाहारी भोजन समन्वय"] } },
      { id: "a-lukas-schmidt", name: "Lukas Schmidt", languages: ["de", "en"], specialties: ["orthopedics", "cardiology", "checkup"], years: 7, rating: 4.8,
        bio: { en: "Lukas supports German-speaking patients with orthopedic and cardiac programs, and coordinates closely with home-country physicians.", de: "Lukas unterstützt deutschsprachige Patienten bei orthopädischen und kardiologischen Programmen und arbeitet eng mit Ärzten im Heimatland zusammen." },
        services: { en: ["Hospital liaison", "Medical record translation", "Home-country doctor coordination", "Recovery check-ins"], de: ["Krankenhausbetreuung", "Übersetzung von Krankenakten", "Abstimmung mit Ärzten im Heimatland", "Genesungs-Check-ins"] } },
      { id: "a-mariana-costa", name: "Mariana Costa", languages: ["pt", "en", "es"], specialties: ["dental", "ophthalmology", "checkup"], years: 4, rating: 4.6,
        bio: { en: "Mariana assists Portuguese and Spanish-speaking clients from Brazil and Portugal with dental and eye care travel programs.", pt: "Mariana auxilia clientes de língua portuguesa e espanhola do Brasil e de Portugal em programas de viagem odontológica e oftalmológica." },
        services: { en: ["Hospital liaison", "Medical translation", "Hotel booking", "Local transport setup"], pt: ["Acompanhamento hospitalar", "Tradução médica", "Reserva de hotel", "Organização de transporte local"] } },
      { id: "a-wei-chen", name: "Wei Chen", languages: ["zh-CN", "zh-TW", "en", "ja"], specialties: ["checkup", "oncology", "cardiology", "hematology"], years: 12, rating: 5.0,
        bio: { en: "A senior patient coordinator with 12 years of experience, Wei leads complex, multi-hospital cases for VIP clients across all regions.", "zh-CN": "资深患者协调专员，拥有12年经验，负责统筹各地区VIP客户的复杂多院联合诊疗。", "zh-TW": "資深患者協調專員，擁有12年經驗，負責統籌各地區VIP客戶的複雜多院聯合診療。" },
        services: { en: ["VIP case management", "Multi-hospital coordination", "24/7 concierge", "Family support"], "zh-CN": ["VIP个案管理", "多院协调", "24小时礼宾服务", "家属支持"], "zh-TW": ["VIP個案管理", "多院協調", "24小時禮賓服務", "家屬支持"] } }
    ],

    // Recommended sightseeing routes per region, for the trip planner.
    // General, well-known tourism highlights — not bookings.
    routes: [
      { id: "r-beijing", area: "beijing", days: 3, name: { en: "Imperial Beijing", "zh-CN": "北京皇城之旅", "zh-TW": "北京皇城之旅" },
        highlights: { en: ["Great Wall (Mutianyu or Badaling)", "Forbidden City", "Temple of Heaven", "Summer Palace"], "zh-CN": ["长城（慕田峪或八达岭）", "故宫", "天坛", "颐和园"], "zh-TW": ["長城（慕田峪或八達嶺）", "故宮", "天壇", "頤和園"] } },
      { id: "r-shanghai", area: "shanghai", days: 2, name: { en: "Shanghai City & Water Towns", "zh-CN": "上海都市与水乡之旅", "zh-TW": "上海都市與水鄉之旅" },
        highlights: { en: ["The Bund", "Yu Garden", "Zhujiajiao Water Town", "Shanghai Museum"], "zh-CN": ["外滩", "豫园", "朱家角古镇", "上海博物馆"], "zh-TW": ["外灘", "豫園", "朱家角古鎮", "上海博物館"] } },
      { id: "r-tianjin", area: "tianjin", days: 1, name: { en: "Tianjin Heritage Walk", "zh-CN": "天津历史文化漫步", "zh-TW": "天津歷史文化漫步" },
        highlights: { en: ["Five Great Avenues", "Ancient Culture Street", "Tianjin Eye Ferris Wheel"], "zh-CN": ["五大道", "古文化街", "天津之眼摩天轮"], "zh-TW": ["五大道", "古文化街", "天津之眼摩天輪"] } },
      { id: "r-chongqing", area: "chongqing", days: 2, name: { en: "Chongqing Mountain City", "zh-CN": "重庆山城之旅", "zh-TW": "重慶山城之旅" },
        highlights: { en: ["Hongyadong", "Ciqikou Ancient Town", "Yangtze River night cruise"], "zh-CN": ["洪崖洞", "磁器口古镇", "长江夜游"], "zh-TW": ["洪崖洞", "磁器口古鎮", "長江夜遊"] } },
      { id: "r-guangzhou", area: "guangzhou", days: 2, name: { en: "Guangzhou & the Pearl River", "zh-CN": "广州珠江之旅", "zh-TW": "廣州珠江之旅" },
        highlights: { en: ["Canton Tower", "Shamian Island", "Chen Clan Academy"], "zh-CN": ["广州塔", "沙面岛", "陈家祠"], "zh-TW": ["廣州塔", "沙面島", "陳家祠"] } },
      { id: "r-shenzhen", area: "shenzhen", days: 2, name: { en: "Shenzhen Modern China", "zh-CN": "深圳现代之旅", "zh-TW": "深圳現代之旅" },
        highlights: { en: ["Window of the World", "Shenzhen Bay Park", "Dafen Art Village"], "zh-CN": ["世界之窗", "深圳湾公园", "大芬油画村"], "zh-TW": ["世界之窗", "深圳灣公園", "大芬油畫村"] } },
      { id: "r-hangzhou", area: "hangzhou", days: 2, name: { en: "West Lake Scenery", "zh-CN": "西湖风光之旅", "zh-TW": "西湖風光之旅" },
        highlights: { en: ["West Lake", "Lingyin Temple", "Xixi Wetland"], "zh-CN": ["西湖", "灵隐寺", "西溪湿地"], "zh-TW": ["西湖", "靈隱寺", "西溪濕地"] } },
      { id: "r-wenzhou", area: "wenzhou", days: 2, name: { en: "Wenzhou Coast & Mountains", "zh-CN": "温州山海之旅", "zh-TW": "溫州山海之旅" },
        highlights: { en: ["Yandang Mountain", "Jiangxin Island"], "zh-CN": ["雁荡山", "江心屿"], "zh-TW": ["雁蕩山", "江心嶼"] } },
      { id: "r-nanjing", area: "nanjing", days: 2, name: { en: "Nanjing Historic Capital", "zh-CN": "南京古都之旅", "zh-TW": "南京古都之旅" },
        highlights: { en: ["Sun Yat-sen Mausoleum", "Confucius Temple", "Ming City Wall"], "zh-CN": ["中山陵", "夫子庙", "明城墙"], "zh-TW": ["中山陵", "夫子廟", "明城牆"] } },
      { id: "r-suzhou", area: "suzhou", days: 2, name: { en: "Suzhou Classical Gardens", "zh-CN": "苏州园林之旅", "zh-TW": "蘇州園林之旅" },
        highlights: { en: ["Humble Administrator's Garden", "Tiger Hill", "Pingjiang Road"], "zh-CN": ["拙政园", "虎丘", "平江路"], "zh-TW": ["拙政園", "虎丘", "平江路"] } },
      { id: "r-chengdu", area: "chengdu", days: 2, name: { en: "Chengdu Pandas & Culture", "zh-CN": "成都熊猫文化之旅", "zh-TW": "成都熊貓文化之旅" },
        highlights: { en: ["Chengdu Panda Base", "Kuanzhai Alley", "Jinli Ancient Street"], "zh-CN": ["成都大熊猫基地", "宽窄巷子", "锦里古街"], "zh-TW": ["成都大熊貓基地", "寬窄巷子", "錦里古街"] } },
      { id: "r-xian", area: "xian", days: 3, name: { en: "Xi'an Ancient Capital", "zh-CN": "西安古都之旅", "zh-TW": "西安古都之旅" },
        highlights: { en: ["Terracotta Army", "Xi'an City Wall", "Muslim Quarter"], "zh-CN": ["兵马俑", "西安城墙", "回民街"], "zh-TW": ["兵馬俑", "西安城牆", "回民街"] } },
      { id: "r-wuhan", area: "wuhan", days: 2, name: { en: "Wuhan Yangtze Crossroads", "zh-CN": "武汉江城之旅", "zh-TW": "武漢江城之旅" },
        highlights: { en: ["Yellow Crane Tower", "East Lake", "Hubu Alley"], "zh-CN": ["黄鹤楼", "东湖", "户部巷"], "zh-TW": ["黃鶴樓", "東湖", "戶部巷"] } },
      { id: "r-changsha", area: "changsha", days: 2, name: { en: "Changsha & Hunan Culture", "zh-CN": "长沙湖湘文化之旅", "zh-TW": "長沙湖湘文化之旅" },
        highlights: { en: ["Orange Isle", "Yuelu Academy", "Hunan Museum"], "zh-CN": ["橘子洲", "岳麓书院", "湖南省博物馆"], "zh-TW": ["橘子洲", "嶽麓書院", "湖南省博物館"] } },
      { id: "r-zhengzhou", area: "zhengzhou", days: 2, name: { en: "Zhengzhou & Shaolin", "zh-CN": "郑州少林之旅", "zh-TW": "鄭州少林之旅" },
        highlights: { en: ["Shaolin Temple (Dengfeng)", "Henan Museum"], "zh-CN": ["少林寺（登封）", "河南博物院"], "zh-TW": ["少林寺（登封）", "河南博物院"] } },
      { id: "r-jinan", area: "jinan", days: 1, name: { en: "Jinan Spring City", "zh-CN": "济南泉城之旅", "zh-TW": "濟南泉城之旅" },
        highlights: { en: ["Baotu Spring", "Daming Lake", "Thousand Buddha Mountain"], "zh-CN": ["趵突泉", "大明湖", "千佛山"], "zh-TW": ["趵突泉", "大明湖", "千佛山"] } },
      { id: "r-qingdao", area: "qingdao", days: 2, name: { en: "Qingdao Coastal Breeze", "zh-CN": "青岛海滨之旅", "zh-TW": "青島海濱之旅" },
        highlights: { en: ["Badaguan", "Zhanqiao Pier", "Qingdao Old Town"], "zh-CN": ["八大关", "栈桥", "青岛老城区"], "zh-TW": ["八大關", "棧橋", "青島老城區"] } },
      { id: "r-shenyang", area: "shenyang", days: 2, name: { en: "Shenyang Imperial Heritage", "zh-CN": "沈阳清代皇家之旅", "zh-TW": "瀋陽清代皇家之旅" },
        highlights: { en: ["Shenyang Imperial Palace", "Zhaoling Tomb"], "zh-CN": ["沈阳故宫", "昭陵"], "zh-TW": ["瀋陽故宮", "昭陵"] } },
      { id: "r-changchun", area: "changchun", days: 1, name: { en: "Changchun Green City", "zh-CN": "长春绿城之旅", "zh-TW": "長春綠城之旅" },
        highlights: { en: ["Puppet Emperor's Palace", "Nanhu Park"], "zh-CN": ["伪满皇宫", "南湖公园"], "zh-TW": ["偽滿皇宮", "南湖公園"] } },
      { id: "r-harbin", area: "harbin", days: 2, name: { en: "Harbin Ice & Russian Heritage", "zh-CN": "哈尔滨冰城与欧陆风情之旅", "zh-TW": "哈爾濱冰城與歐陸風情之旅" },
        highlights: { en: ["Saint Sophia Cathedral", "Central Street", "Ice-Snow World (winter)"], "zh-CN": ["圣索菲亚教堂", "中央大街", "冰雪大世界（冬季）"], "zh-TW": ["聖索菲亞教堂", "中央大街", "冰雪大世界（冬季）"] } },
      { id: "r-hefei", area: "hefei", days: 2, name: { en: "Hefei & Huangshan Gateway", "zh-CN": "合肥及黄山门户之旅", "zh-TW": "合肥及黃山門戶之旅" },
        highlights: { en: ["Baohe Park", "Sanhe Ancient Town", "Gateway to Huangshan"], "zh-CN": ["包河公园", "三河古镇", "黄山门户"], "zh-TW": ["包河公園", "三河古鎮", "黃山門戶"] } },
      { id: "r-fuzhou", area: "fuzhou", days: 2, name: { en: "Fuzhou Old Town", "zh-CN": "福州古城之旅", "zh-TW": "福州古城之旅" },
        highlights: { en: ["Sanfang Qixiang", "West Lake Park", "Gushan Mountain"], "zh-CN": ["三坊七巷", "西湖公园", "鼓山"], "zh-TW": ["三坊七巷", "西湖公園", "鼓山"] } },
      { id: "r-nanchang", area: "nanchang", days: 2, name: { en: "Nanchang Riverside & Revolutionary Sites", "zh-CN": "南昌滨江与红色文化之旅", "zh-TW": "南昌濱江與紅色文化之旅" },
        highlights: { en: ["Tengwang Pavilion", "August 1st Uprising Memorial"], "zh-CN": ["滕王阁", "八一起义纪念馆"], "zh-TW": ["滕王閣", "八一起義紀念館"] } }
    ],

    // Long-form content for the Food and Safety pages. Authored in
    // en / zh-CN / zh-TW; other interface languages fall back to English,
    // same convention as hospital and route text above.
    pages: {
      food: {
        intro: {
          en: "Traveling for medical care shouldn't mean giving up food you can trust. Here's how meals are handled during your trip.",
          "zh-CN": "赴华就医不代表要将就饮食。以下是您在旅途中饮食方面可以获得的帮助。",
          "zh-TW": "赴中就醫不代表要將就飲食。以下是您在旅途中飲食方面可以獲得的協助。"
        },
        items: [
          { icon: "🕌", title: { en: "Halal Meals", "zh-CN": "清真餐食", "zh-TW": "清真餐食" },
            desc: { en: "Agents can arrange halal-certified meals near your hospital and hotel.", "zh-CN": "服务人员可为您安排医院及酒店附近的清真认证餐食。", "zh-TW": "服務人員可為您安排醫院及飯店附近的清真認證餐食。" } },
          { icon: "🥦", title: { en: "Vegetarian & Vegan Options", "zh-CN": "素食与纯素选择", "zh-TW": "素食與純素選擇" },
            desc: { en: "Many hospital cafeterias and nearby restaurants offer vegetarian menus — your agent can point you to them.", "zh-CN": "许多医院食堂及周边餐厅均提供素食菜单，服务人员可为您推荐。", "zh-TW": "許多醫院食堂及周邊餐廳均提供素食菜單，服務人員可為您推薦。" } },
          { icon: "⚠️", title: { en: "Allergies & Medical Diets", "zh-CN": "过敏与医嘱饮食", "zh-TW": "過敏與醫囑飲食" },
            desc: { en: "Tell your agent about any food allergies or doctor-prescribed diet — they'll relay this to hotel and restaurant staff in Chinese.", "zh-CN": "请提前告知服务人员您的食物过敏情况或医嘱饮食要求，他们会用中文与酒店及餐厅沟通。", "zh-TW": "請提前告知服務人員您的食物過敏情況或醫囑飲食要求，他們會用中文與飯店及餐廳溝通。" } },
          { icon: "🥢", title: { en: "Try Local Cuisine", "zh-CN": "品尝地方美食", "zh-TW": "品嚐地方美食" },
            desc: { en: "Each region has its own specialties — from Cantonese dim sum to Sichuan hot pot. Ask your agent for recommendations near your hospital.", "zh-CN": "各地美食各具特色——从粤式点心到川味火锅。可向服务人员咨询医院附近的推荐餐厅。", "zh-TW": "各地美食各具特色——從粵式點心到川味火鍋。可向服務人員諮詢醫院附近的推薦餐廳。" } }
        ]
      },
      safety: {
        intro: {
          en: "Your safety — medical and personal — is central to how Health Blueprint works.",
          "zh-CN": "医疗安全与人身安全，是健康蓝图一切服务的核心。",
          "zh-TW": "醫療安全與人身安全，是健康藍圖一切服務的核心。"
        },
        items: [
          { icon: "🏅", title: { en: "Published Hospital Rankings", "zh-CN": "公开的医院排名", "zh-TW": "公開的醫院排名" },
            desc: { en: "Every hospital listed comes from the publicly published 2023 China Hospital Ranking, so you can see its national standing before you choose.", "zh-CN": "所有上榜医院均来自公开发布的2023年度中国医院综合排行榜，方便您在选择前了解其全国排名情况。", "zh-TW": "所有上榜醫院均來自公開發布的2023年度中國醫院綜合排行榜，方便您在選擇前了解其全國排名情況。" } },
          { icon: "🧑‍🤝‍🧑", title: { en: "Reviewed Agents", "zh-CN": "经审核的服务人员", "zh-TW": "經審核的服務人員" },
            desc: { en: "Agents who support you in person are reviewed before joining our network, and rated after every trip.", "zh-CN": "为您提供全程陪同服务的人员在加入平台前均经过审核，并在每次行程后接受评分。", "zh-TW": "為您提供全程陪同服務的人員在加入平台前均經過審核，並在每次行程後接受評分。" } },
          { icon: "📞", title: { en: "Support Every Step", "zh-CN": "全程支持", "zh-TW": "全程支援" },
            desc: { en: "Your agent stays reachable throughout your trip — from airport pickup to your safe return home.", "zh-CN": "服务人员在您整个行程中都可随时联系——从机场接机到您平安返程。", "zh-TW": "服務人員在您整個行程中都可隨時聯繫——從機場接機到您平安返程。" } },
          { icon: "🧳", title: { en: "Travel & Medical Insurance", "zh-CN": "旅行与医疗保险", "zh-TW": "旅遊與醫療保險" },
            desc: { en: "We recommend arranging travel/medical insurance before your trip; your agent can help you understand local requirements.", "zh-CN": "建议您在出行前安排好旅行/医疗保险，服务人员可协助您了解当地相关要求。", "zh-TW": "建議您在出行前安排好旅遊/醫療保險，服務人員可協助您了解當地相關要求。" } },
          { icon: "🚨", title: { en: "Embassy & Emergency Contacts", "zh-CN": "使领馆与紧急联系方式", "zh-TW": "使領館與緊急聯絡方式" },
            desc: { en: "Keep your country's embassy or consulate contact information with you, along with China's national emergency numbers (110 police, 120 medical).", "zh-CN": "请随身携带您所在国家使领馆的联系方式，并留意中国的全国紧急电话（110报警、120急救）。", "zh-TW": "請隨身攜帶您所在國家使領館的聯絡方式，並留意中國的全國緊急電話（110報警、120急救）。" } }
        ]
      }
    },

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
})();
