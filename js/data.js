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

  // Real strong/featured clinical departments per hospital, researched from
  // public sources (Fudan China Hospital Specialty Reputation Rankings,
  // National Clinical Key Specialty designations, and well-established
  // institutional reputation), mapped to our 12 specialty categories.
  // Every hospital includes "checkup" since general health screening is a
  // near-universal service at this tier of hospital.
  var SPECIALTY_TAGS = {
    "中国人民解放军总医院": ["checkup", "cardiology", "oncology", "orthopedics", "neurology", "respiratory"],
    "中国医学科学院北京协和医院": ["checkup", "oncology", "cardiology", "obgyn", "neurology", "hematology", "ophthalmology", "respiratory"],
    "北京大学第一医院": ["checkup", "obgyn", "pediatrics", "cardiology"],
    "北京大学第三医院": ["checkup", "obgyn", "orthopedics"],
    "中国医科大学附属第一医院": ["checkup", "oncology", "cardiology", "neurology"],
    "上海交通大学医学院附属仁济医院": ["checkup", "obgyn"],
    "上海交通大学医学院附属瑞金医院": ["checkup", "hematology", "neurology", "oncology"],
    "复旦大学附属中山医院": ["checkup", "cardiology", "oncology", "respiratory"],
    "复旦大学附属华山医院": ["checkup", "neurology", "orthopedics"],
    "浙江大学医学院附属第一医院": ["checkup", "oncology"],
    "浙江大学医学院附属第二医院": ["checkup", "ophthalmology", "cardiology", "orthopedics"],
    "郑州大学第一附属医院": ["checkup", "cardiology", "oncology", "orthopedics", "neurology"],
    "华中科技大学同济医学院附属协和医院": ["checkup", "hematology", "cardiology", "oncology"],
    "华中科技大学同济医学院附属同济医院": ["checkup", "obgyn", "cardiology", "oncology"],
    "中南大学湘雅二医院": ["checkup", "psychiatry"],
    "中南大学湘雅医院": ["checkup", "oncology", "cardiology", "orthopedics", "neurology"],
    "中山大学附属第一医院": ["checkup", "oncology", "orthopedics", "ophthalmology", "neurology"],
    "南方医科大学南方医院": ["checkup", "hematology"],
    "四川大学华西医院": ["checkup", "psychiatry", "respiratory", "oncology", "cardiology", "orthopedics", "neurology"],
    "空军军医大学第一附属医院（西京医院）": ["checkup", "oncology", "neurology", "cardiology"],
    "中日友好医院": ["checkup", "respiratory"],
    "中国医学科学院阜外医院": ["checkup", "cardiology"],
    "中国医学科学院肿瘤医院": ["checkup", "oncology"],
    "北京大学人民医院": ["checkup", "hematology", "orthopedics", "ophthalmology"],
    "首都医科大学附属北京儿童医院": ["checkup", "pediatrics"],
    "首都医科大学附属北京天坛医院": ["checkup", "neurology"],
    "首都医科大学附属北京同仁医院": ["checkup", "ophthalmology"],
    "上海市第六人民医院": ["checkup", "orthopedics"],
    "上海交通大学医学院附属第九人民医院": ["checkup", "dental", "ophthalmology"],
    "复旦大学附属儿科医院": ["checkup", "pediatrics"],
    "复旦大学附属肿瘤医院": ["checkup", "oncology"],
    "海军军医大学第一附属医院": ["checkup", "oncology", "orthopedics"],
    "江苏省人民医院（南京医科大学第一附属医院）": ["checkup", "obgyn", "oncology", "cardiology"],
    "南京大学医学院附属鼓楼医院": ["checkup", "obgyn", "orthopedics"],
    "山东大学齐鲁医院": ["checkup", "cardiology", "oncology"],
    "广东省人民医院": ["checkup", "cardiology", "oncology"],
    "广州医科大学附属第一医院": ["checkup", "respiratory"],
    "中山大学肿瘤防治中心": ["checkup", "oncology"],
    "陆军军医大学第一附属医院": ["checkup", "oncology"],
    "四川省人民医院": ["checkup", "cardiology"],
    "北京积水潭医院": ["checkup", "orthopedics"],
    "首都医科大学附属北京安贞医院": ["checkup", "cardiology"],
    "首都医科大学宣武医院": ["checkup", "neurology"],
    "中国医科大学附属盛京医院": ["checkup", "obgyn", "pediatrics"],
    "上海市肺科医院": ["checkup", "respiratory", "oncology"],
    "上海交通大学医学院附属新华医院": ["checkup", "pediatrics"],
    "复旦大学附属眼耳鼻喉科医院": ["checkup", "ophthalmology"],
    "中国人民解放军东部战区总医院": ["checkup", "oncology"],
    "东南大学附属中大医院": ["checkup", "respiratory"],
    "苏州大学附属第一医院": ["checkup", "hematology"],
    "浙江大学医学院附属邵逸夫医院": ["checkup", "oncology", "obgyn"],
    "福建医科大学附属第一医院": ["checkup", "oncology"],
    "南昌大学第一附属医院": ["checkup"],
    "山东第一医科大学附属省立医院（山东省立医院）": ["checkup", "cardiology"],
    "青岛大学附属医院": ["checkup"],
    "武汉大学人民医院": ["checkup", "psychiatry", "cardiology"],
    "武汉大学中南医院": ["checkup", "oncology", "obgyn"],
    "中山大学附属第三医院": ["checkup", "neurology"],
    "重庆医科大学附属第一医院": ["checkup", "cardiology"],
    "四川大学华西口腔医院": ["checkup", "dental"],
    "北京大学口腔医院": ["checkup", "dental"],
    "北京大学肿瘤医院": ["checkup", "oncology"],
    "北京医院": ["checkup", "cardiology"],
    "首都医科大学附属北京友谊医院": ["checkup", "oncology"],
    "首都医科大学附属北京朝阳医院": ["checkup", "respiratory"],
    "天津医科大学肿瘤医院": ["checkup", "oncology"],
    "天津医科大学总医院": ["checkup", "neurology"],
    "吉林大学第一医院": ["checkup"],
    "哈尔滨医科大学附属第二医院": ["checkup", "cardiology"],
    "浙江大学医学院附属儿童医院": ["checkup", "pediatrics"],
    "中国科学技术大学附属第一医院（安徽省立医院）": ["checkup"],
    "安徽医科大学第一附属医院": ["checkup"],
    "中南大学湘雅三医院": ["checkup", "oncology"],
    "广州市妇女儿童医疗中心": ["checkup", "pediatrics", "obgyn"],
    "中山大学中山眼科中心": ["checkup", "ophthalmology"],
    "中山大学孙逸仙纪念医院": ["checkup", "oncology"],
    "南方医科大学珠江医院": ["checkup"],
    "重庆医科大学附属儿童医院": ["checkup", "pediatrics"],
    "四川大学华西第二医院": ["checkup", "obgyn", "pediatrics"],
    "西安交通大学第一附属医院": ["checkup", "psychiatry"],
    "北京大学第六医院": ["checkup", "psychiatry"],
    "首都医科大学附属北京世纪坛医院": ["checkup", "oncology"],
    "中国医学科学院血液病医院（研究所）": ["checkup", "hematology"],
    "中国人民解放军北部战区总医院": ["checkup", "cardiology"],
    "哈尔滨医科大学附属第一医院": ["checkup", "cardiology"],
    "上海市胸科医院（暨上海交通大学医学院附属胸科医院）": ["checkup", "cardiology", "respiratory", "oncology"],
    "上海市第一人民医院": ["checkup", "ophthalmology"],
    "上海市精神卫生中心": ["checkup", "psychiatry"],
    "上海交通大学医学院附属上海儿童医学中心": ["checkup", "pediatrics", "cardiology"],
    "复旦大学附属妇产科医院": ["checkup", "obgyn"],
    "海军军医大学第二附属医院": ["checkup", "orthopedics"],
    "浙江大学医学院附属妇产科医院": ["checkup", "obgyn"],
    "温州医科大学附属眼视光医院": ["checkup", "ophthalmology"],
    "福建医科大学附属协和医院": ["checkup", "hematology"],
    "河南省人民医院": ["checkup", "neurology", "cardiology"],
    "武汉大学口腔医院": ["checkup", "dental"],
    "深圳市人民医院": ["checkup"],
    "陆军军医大学第二附属医院": ["checkup", "cardiology"],
    "西安交通大学第二附属医院": ["checkup"],
    "空军军医大学第二附属医院(唐都医院)": ["checkup", "neurology", "orthopedics"]
  };

  function inferTags(name) {
    return SPECIALTY_TAGS[name] || ["checkup"];
  }

  function slug(i) { return "h" + String(i + 1).padStart(3, "0"); }

  // Real exterior photos for a small curated set of flagship hospitals,
  // sourced from Wikimedia Commons via its documented stable hotlink
  // pattern (Special:FilePath redirects to the current upload URL). Every
  // other hospital uses the illustrated fallback; onerror in app.js swaps
  // to it automatically if one of these ever fails to load too.
  var PHOTOS = {
    "中国人民解放军总医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/PLA_General_Hospital_at_dusk_(20211011175558).jpg", source: "Wikimedia Commons" },
    "中国医学科学院北京协和医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Old_building_of_Peking_Union_Medical_College_Hospital_(20180821142741).jpg", source: "Wikimedia Commons" },
    "四川大学华西医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/West_China_Hospital_01_2014-09.JPG", source: "Wikimedia Commons" },
    "中国医学科学院阜外医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Fuwai_Hospital_(20201218164122).jpg", source: "Wikimedia Commons" },
    "中南大学湘雅医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Xiangya_Hospital_of_Central_South_University_1.jpg", source: "Wikimedia Commons" },
    "复旦大学附属中山医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Building_of_Shanghai_Zhongshan_Hospital.jpg", source: "Wikimedia Commons" },
    "上海交通大学医学院附属瑞金医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Out-patient_Department_of_Ruijin_Hospital_shanghai,_Jun_2020.jpg", source: "Wikimedia Commons" },
    "北京积水潭医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Beijing_Jishuitan_Hospital,_Xinjiekou_(20211222135230).jpg", source: "Wikimedia Commons" },
    "首都医科大学附属北京天坛医院": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Inpatient_buildings_of_Beijing_Tiantan_Hospital_(20211210143431).jpg", source: "Wikimedia Commons" }
  };

  var hospitals = RAW_HOSPITALS.map(function (row, i) {
    var tier = row[0], name = row[1], nameEn = row[2], area = row[3];
    var photo = Object.prototype.hasOwnProperty.call(PHOTOS, name) ? PHOTOS[name] : null;
    return {
      id: slug(i),
      tier: tier,
      name: name,
      nameEn: nameEn,
      area: area,
      website: Object.prototype.hasOwnProperty.call(WEBSITES, name) ? WEBSITES[name] : null,
      photo: photo ? photo.url : null,
      photoSource: photo ? photo.source : null,
      tags: inferTags(name)
    };
  });

  // Recommended sightseeing routes, one per city plus a handful of extra
  // themed alternatives for the most touristically significant cities, so
  // riders picking a region get real choice rather than a single option.
  var RAW_ROUTES = [
    { id: "r-beijing", area: "beijing", days: 3, name: { en: "Imperial Beijing", "zh-CN": "北京皇城之旅", "zh-TW": "北京皇城之旅" },
      highlights: { en: ["Great Wall (Mutianyu or Badaling)", "Forbidden City", "Temple of Heaven", "Summer Palace"], "zh-CN": ["长城（慕田峪或八达岭）", "故宫", "天坛", "颐和园"], "zh-TW": ["長城（慕田峪或八達嶺）", "故宮", "天壇", "頤和園"] } },
    { id: "r-beijing-hutong", area: "beijing", days: 2, name: { en: "Beijing Hutongs & Modern Art", "zh-CN": "北京胡同与当代艺术之旅", "zh-TW": "北京胡同與當代藝術之旅" },
      highlights: { en: ["Nanluoguxiang Hutong", "Houhai Lake", "Drum and Bell Towers", "798 Art District"], "zh-CN": ["南锣鼓巷", "后海", "钟鼓楼", "798艺术区"], "zh-TW": ["南鑼鼓巷", "後海", "鐘鼓樓", "798藝術區"] } },
    { id: "r-shanghai", area: "shanghai", days: 2, name: { en: "Shanghai City & Water Towns", "zh-CN": "上海都市与水乡之旅", "zh-TW": "上海都市與水鄉之旅" },
      highlights: { en: ["The Bund", "Yu Garden", "Zhujiajiao Water Town", "Shanghai Museum"], "zh-CN": ["外滩", "豫园", "朱家角古镇", "上海博物馆"], "zh-TW": ["外灘", "豫園", "朱家角古鎮", "上海博物館"] } },
    { id: "r-shanghai-concession", area: "shanghai", days: 2, name: { en: "Shanghai French Concession & Art Deco", "zh-CN": "上海法租界与摩登建筑之旅", "zh-TW": "上海法租界與摩登建築之旅" },
      highlights: { en: ["Wukang Road (Former French Concession)", "Tianzifang", "Xintiandi", "M50 Creative Park"], "zh-CN": ["武康路（原法租界）", "田子坊", "新天地", "M50创意园"], "zh-TW": ["武康路（原法租界）", "田子坊", "新天地", "M50創意園"] } },
    { id: "r-tianjin", area: "tianjin", days: 1, name: { en: "Tianjin Heritage Walk", "zh-CN": "天津历史文化漫步", "zh-TW": "天津歷史文化漫步" },
      highlights: { en: ["Five Great Avenues", "Ancient Culture Street", "Tianjin Eye Ferris Wheel"], "zh-CN": ["五大道", "古文化街", "天津之眼摩天轮"], "zh-TW": ["五大道", "古文化街", "天津之眼摩天輪"] } },
    { id: "r-chongqing", area: "chongqing", days: 2, name: { en: "Chongqing Mountain City", "zh-CN": "重庆山城之旅", "zh-TW": "重慶山城之旅" },
      highlights: { en: ["Hongyadong", "Ciqikou Ancient Town", "Yangtze River night cruise"], "zh-CN": ["洪崖洞", "磁器口古镇", "长江夜游"], "zh-TW": ["洪崖洞", "磁器口古鎮", "長江夜遊"] } },
    { id: "r-chongqing-skyline", area: "chongqing", days: 1, name: { en: "Chongqing Cable Cars & Night Skyline", "zh-CN": "重庆缆车与夜景之旅", "zh-TW": "重慶纜車與夜景之旅" },
      highlights: { en: ["Eling Park Viewpoint", "Liziba Light Rail (train through the building)", "Chaotianmen Square", "Yangtze River Cableway"], "zh-CN": ["鹅岭公园观景台", "李子坝轻轨穿楼", "朝天门广场", "长江索道"], "zh-TW": ["鵝嶺公園觀景台", "李子壩輕軌穿樓", "朝天門廣場", "長江索道"] } },
    { id: "r-guangzhou", area: "guangzhou", days: 2, name: { en: "Guangzhou & the Pearl River", "zh-CN": "广州珠江之旅", "zh-TW": "廣州珠江之旅" },
      highlights: { en: ["Canton Tower", "Shamian Island", "Chen Clan Academy"], "zh-CN": ["广州塔", "沙面岛", "陈家祠"], "zh-TW": ["廣州塔", "沙面島", "陳家祠"] } },
    { id: "r-guangzhou-lingnan", area: "guangzhou", days: 1, name: { en: "Baiyun Mountain & Lingnan Heritage", "zh-CN": "白云山与岭南文化之旅", "zh-TW": "白雲山與嶺南文化之旅" },
      highlights: { en: ["Baiyun Mountain", "Yuexiu Park & Five Rams Statue", "Guangxiao Temple", "Guangzhou Museum (Zhenhai Tower)"], "zh-CN": ["白云山", "越秀公园与五羊石像", "光孝寺", "广州博物馆（镇海楼）"], "zh-TW": ["白雲山", "越秀公園與五羊石像", "光孝寺", "廣州博物館（鎮海樓）"] } },
    { id: "r-shenzhen", area: "shenzhen", days: 2, name: { en: "Shenzhen Modern China", "zh-CN": "深圳现代之旅", "zh-TW": "深圳現代之旅" },
      highlights: { en: ["Window of the World", "Shenzhen Bay Park", "Dafen Art Village"], "zh-CN": ["世界之窗", "深圳湾公园", "大芬油画村"], "zh-TW": ["世界之窗", "深圳灣公園", "大芬油畫村"] } },
    { id: "r-hangzhou", area: "hangzhou", days: 2, name: { en: "West Lake Scenery", "zh-CN": "西湖风光之旅", "zh-TW": "西湖風光之旅" },
      highlights: { en: ["West Lake", "Lingyin Temple", "Xixi Wetland"], "zh-CN": ["西湖", "灵隐寺", "西溪湿地"], "zh-TW": ["西湖", "靈隱寺", "西溪濕地"] } },
    { id: "r-hangzhou-tea", area: "hangzhou", days: 1, name: { en: "Grand Canal & Tea Culture", "zh-CN": "京杭大运河与茶文化之旅", "zh-TW": "京杭大運河與茶文化之旅" },
      highlights: { en: ["Beijing-Hangzhou Grand Canal", "China National Tea Museum", "Longjing Tea Plantations", "Meijiawu Tea Village"], "zh-CN": ["京杭大运河", "中国茶叶博物馆", "龙井茶园", "梅家坞茶村"], "zh-TW": ["京杭大運河", "中國茶葉博物館", "龍井茶園", "梅家塢茶村"] } },
    { id: "r-wenzhou", area: "wenzhou", days: 2, name: { en: "Wenzhou Coast & Mountains", "zh-CN": "温州山海之旅", "zh-TW": "溫州山海之旅" },
      highlights: { en: ["Yandang Mountain", "Jiangxin Island"], "zh-CN": ["雁荡山", "江心屿"], "zh-TW": ["雁蕩山", "江心嶼"] } },
    { id: "r-nanjing", area: "nanjing", days: 2, name: { en: "Nanjing Historic Capital", "zh-CN": "南京古都之旅", "zh-TW": "南京古都之旅" },
      highlights: { en: ["Sun Yat-sen Mausoleum", "Confucius Temple", "Ming City Wall"], "zh-CN": ["中山陵", "夫子庙", "明城墙"], "zh-TW": ["中山陵", "夫子廟", "明城牆"] } },
    { id: "r-nanjing-republican", area: "nanjing", days: 1, name: { en: "Republican-Era Nanjing", "zh-CN": "南京民国印记之旅", "zh-TW": "南京民國印記之旅" },
      highlights: { en: ["Presidential Palace of the Republic of China", "1912 Bar Street", "Nanjing Yangtze River Bridge", "Xuanwu Lake"], "zh-CN": ["总统府", "1912街区", "南京长江大桥", "玄武湖"], "zh-TW": ["總統府", "1912街區", "南京長江大橋", "玄武湖"] } },
    { id: "r-suzhou", area: "suzhou", days: 2, name: { en: "Suzhou Classical Gardens", "zh-CN": "苏州园林之旅", "zh-TW": "蘇州園林之旅" },
      highlights: { en: ["Humble Administrator's Garden", "Tiger Hill", "Pingjiang Road"], "zh-CN": ["拙政园", "虎丘", "平江路"], "zh-TW": ["拙政園", "虎丘", "平江路"] } },
    { id: "r-suzhou-water", area: "suzhou", days: 1, name: { en: "Zhouzhuang Water Town & Silk", "zh-CN": "周庄水乡与丝绸之旅", "zh-TW": "周莊水鄉與絲綢之旅" },
      highlights: { en: ["Zhouzhuang Water Town", "Suzhou Silk Museum", "Shantang Street", "Precious Belt Bridge"], "zh-CN": ["周庄古镇", "苏州丝绸博物馆", "山塘街", "宝带桥"], "zh-TW": ["周莊古鎮", "蘇州絲綢博物館", "山塘街", "寶帶橋"] } },
    { id: "r-chengdu", area: "chengdu", days: 2, name: { en: "Chengdu Pandas & Culture", "zh-CN": "成都熊猫文化之旅", "zh-TW": "成都熊貓文化之旅" },
      highlights: { en: ["Chengdu Panda Base", "Kuanzhai Alley", "Jinli Ancient Street"], "zh-CN": ["成都大熊猫基地", "宽窄巷子", "锦里古街"], "zh-TW": ["成都大熊貓基地", "寬窄巷子", "錦里古街"] } },
    { id: "r-chengdu-leshan", area: "chengdu", days: 2, name: { en: "Leshan Giant Buddha & Mount Emei", "zh-CN": "乐山大佛与峨眉山之旅", "zh-TW": "樂山大佛與峨眉山之旅" },
      highlights: { en: ["Leshan Giant Buddha", "Mount Emei Golden Summit", "Baoguo Temple", "Wuyou Temple"], "zh-CN": ["乐山大佛", "峨眉山金顶", "报国寺", "乌尤寺"], "zh-TW": ["樂山大佛", "峨眉山金頂", "報國寺", "烏尤寺"] } },
    { id: "r-xian", area: "xian", days: 3, name: { en: "Xi'an Ancient Capital", "zh-CN": "西安古都之旅", "zh-TW": "西安古都之旅" },
      highlights: { en: ["Terracotta Army", "Xi'an City Wall", "Muslim Quarter"], "zh-CN": ["兵马俑", "西安城墙", "回民街"], "zh-TW": ["兵馬俑", "西安城牆", "回民街"] } },
    { id: "r-xian-food", area: "xian", days: 1, name: { en: "Xi'an Street Food & Tang Nights", "zh-CN": "西安美食与大唐夜色之旅", "zh-TW": "西安美食與大唐夜色之旅" },
      highlights: { en: ["Muslim Quarter Food Street", "Yongxingfang", "Big Wild Goose Pagoda & Tang Paradise Night Show", "Great Mosque of Xi'an"], "zh-CN": ["回民街美食街", "永兴坊", "大雁塔与大唐芙蓉园夜景", "西安大清真寺"], "zh-TW": ["回民街美食街", "永興坊", "大雁塔與大唐芙蓉園夜景", "西安大清真寺"] } },
    { id: "r-wuhan", area: "wuhan", days: 2, name: { en: "Wuhan Yangtze Crossroads", "zh-CN": "武汉江城之旅", "zh-TW": "武漢江城之旅" },
      highlights: { en: ["Yellow Crane Tower", "East Lake", "Hubu Alley"], "zh-CN": ["黄鹤楼", "东湖", "户部巷"], "zh-TW": ["黃鶴樓", "東湖", "戶部巷"] } },
    { id: "r-wuhan-museum", area: "wuhan", days: 1, name: { en: "Wuhan Museums & Guiyuan Temple", "zh-CN": "武汉博物馆与归元禅寺之旅", "zh-TW": "武漢博物館與歸元禪寺之旅" },
      highlights: { en: ["Hubei Provincial Museum", "Guiyuan Temple", "Jianghan Road Pedestrian Street", "Wuchang Uprising Memorial (Red Building)"], "zh-CN": ["湖北省博物馆", "归元禅寺", "江汉路步行街", "武昌起义纪念馆（红楼）"], "zh-TW": ["湖北省博物館", "歸元禪寺", "江漢路步行街", "武昌起義紀念館（紅樓）"] } },
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
  ];

  // Real photos of a famous landmark from each route, sourced from
  // Wikimedia Commons via the same stable Special:FilePath hotlink pattern
  // used for hospitals above. Routes without a confidently-verified photo
  // are simply left out of this map; app.js falls back to an icon badge.
  var ROUTE_PHOTOS = {
    "r-beijing": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Great_Wall_of_China_at_Mutianyu.JPG", source: "Wikimedia Commons" },
    "r-shanghai": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Bund_of_Shanghai.jpg", source: "Wikimedia Commons" },
    "r-tianjin": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianjin_Eye.jpg", source: "Wikimedia Commons" },
    "r-chongqing": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/202308_Hongya_Cave_at_night_from_Qiansimen_Bridge.jpg", source: "Wikimedia Commons" },
    "r-guangzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Canton_Tower.jpg", source: "Wikimedia Commons" },
    "r-shenzhen": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Window_of_the_World_SZ.JPG", source: "Wikimedia Commons" },
    "r-hangzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/West_Lake,_Hangzhou.jpg", source: "Wikimedia Commons" },
    "r-wenzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/China2011_Zhejiang_YandangShan.jpg", source: "Wikimedia Commons" },
    "r-nanjing": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Sun_yatse_mausoleum.jpg", source: "Wikimedia Commons" },
    "r-suzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzhou_-_humble_administrators_garden_-_overcast.jpg", source: "Wikimedia Commons" },
    "r-chengdu": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Chengdu_Panda_base.jpg", source: "Wikimedia Commons" },
    "r-xian": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Terracotta_Warriors.JPG", source: "Wikimedia Commons" },
    "r-wuhan": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Yellow_Crane_Tower_in_20060430.jpg", source: "Wikimedia Commons" },
    "r-changsha": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Orange_Isle,_Changsha_3.jpg", source: "Wikimedia Commons" },
    "r-zhengzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Shaolin_Temple_15375-Dengfeng_(48757383478).jpg", source: "Wikimedia Commons" },
    "r-jinan": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Baotuquan,_Jinan_banner.jpg", source: "Wikimedia Commons" },
    "r-qingdao": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhanqiao_pier_with_Little_Qingdao_Isle.jpg", source: "Wikimedia Commons" },
    "r-shenyang": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_Palace_in_Shenyang.jpg", source: "Wikimedia Commons" },
    "r-changchun": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/25238-Changchun,_Museum_of_the_Imperial_Palace_of_Manchukuo.jpg", source: "Wikimedia Commons" },
    "r-harbin": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Sophia_Cathedral_Harbin.JPG", source: "Wikimedia Commons" },
    "r-hefei": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bao_He_Park_59609-Hefei_(49222528247).jpg", source: "Wikimedia Commons" },
    "r-fuzhou": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Fuzhou_Three_Lanes_and_Seven_Alleys_Nightview.jpg", source: "Wikimedia Commons" },
    "r-nanchang": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pavilion_of_Prince_Teng,_Nanchang,_China1.jpg", source: "Wikimedia Commons" },
    "r-beijing-hutong": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Beijing_798_Art_District.jpg", source: "Wikimedia Commons" },
    "r-shanghai-concession": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Wukang_Road,_Shanghai,_May_2016.JPG", source: "Wikimedia Commons" },
    "r-xian-food": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Great_wild_goose_pagoda_by_night.JPG", source: "Wikimedia Commons" },
    "r-chengdu-leshan": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Leshan_Giant_Buddha_1.jpg", source: "Wikimedia Commons" },
    "r-hangzhou-tea": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tea_plantation_in_hangzhou.JPG", source: "Wikimedia Commons" },
    "r-suzhou-water": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhouzhuang_2.jpg", source: "Wikimedia Commons" },
    "r-nanjing-republican": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Main_gate_of_the_Presidential_Palace,_Nanjing_1.jpg", source: "Wikimedia Commons" },
    "r-chongqing-skyline": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Liziba_Station.jpg", source: "Wikimedia Commons" },
    "r-wuhan-museum": { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Hubei_Provincial_Museum.JPG", source: "Wikimedia Commons" }
  };

  var routes = RAW_ROUTES.map(function (r) {
    var photo = Object.prototype.hasOwnProperty.call(ROUTE_PHOTOS, r.id) ? ROUTE_PHOTOS[r.id] : null;
    return {
      id: r.id, area: r.area, days: r.days, name: r.name, highlights: r.highlights,
      photo: photo ? photo.url : null,
      photoSource: photo ? photo.source : null
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
    routes: routes,

    // Long-form content for the Food and Safety pages. Authored in
    // en / zh-CN / zh-TW; other interface languages fall back to English,
    // same convention as hospital and route text above.
    pages: {
      food: {
        intro: {
          en: "Traveling for medical care shouldn't mean giving up food you can trust. Here's how meals are handled during your trip, region by region.",
          "zh-CN": "赴华就医不代表要将就饮食。以下是您在旅途中各地饮食方面可以获得的帮助。",
          "zh-TW": "赴中就醫不代表要將就飲食。以下是您在旅途中各地飲食方面可以獲得的協助。"
        },
        items: [
          { icon: "food-halal", title: { en: "Halal", "zh-CN": "清真餐食", "zh-TW": "清真餐食" },
            desc: { en: "Certified halal meals near your hospital and hotel, arranged by your agent.", "zh-CN": "服务人员可安排医院及酒店附近的清真认证餐食。", "zh-TW": "服務人員可安排醫院及飯店附近的清真認證餐食。" } },
          { icon: "food-veg", title: { en: "Vegetarian & Vegan", "zh-CN": "素食与纯素", "zh-TW": "素食與純素" },
            desc: { en: "Most hospital cafeterias and nearby restaurants offer vegetarian menus.", "zh-CN": "多数医院食堂及周边餐厅均提供素食菜单。", "zh-TW": "多數醫院食堂及周邊餐廳均提供素食菜單。" } },
          { icon: "food-allergy", title: { en: "Allergies & Medical Diets", "zh-CN": "过敏与医嘱饮食", "zh-TW": "過敏與醫囑飲食" },
            desc: { en: "Tell your agent about allergies or a prescribed diet — they'll relay it to staff in Chinese.", "zh-CN": "请提前告知服务人员您的过敏情况或医嘱饮食，他们会用中文与相关人员沟通。", "zh-TW": "請提前告知服務人員您的過敏情況或醫囑飲食，他們會用中文與相關人員溝通。" } },
          { icon: "food-dimsum", title: { en: "Cantonese (Guangzhou, Shenzhen)", "zh-CN": "粤菜（广州、深圳）", "zh-TW": "粵菜（廣州、深圳）" },
            desc: { en: "Light, delicate flavors — dim sum, congee, steamed seafood.", "zh-CN": "清淡精致——点心、粥品、清蒸海鲜。", "zh-TW": "清淡精緻——點心、粥品、清蒸海鮮。" } },
          { icon: "food-spicy", title: { en: "Sichuan (Chengdu)", "zh-CN": "川菜（成都）", "zh-TW": "川菜（成都）" },
            desc: { en: "Bold and spicy — hot pot and mala dishes; mild versions available on request.", "zh-CN": "麻辣鲜香——火锅与川味小炒，可要求微辣或不辣。", "zh-TW": "麻辣鮮香——火鍋與川味小炒，可要求微辣或不辣。" } },
          { icon: "food-wheat", title: { en: "Northern (Beijing, Xi'an, Tianjin)", "zh-CN": "北方菜（北京、西安、天津）", "zh-TW": "北方菜（北京、西安、天津）" },
            desc: { en: "Wheat-based — noodles, dumplings, and Peking duck.", "zh-CN": "以面食为主——面条、饺子、北京烤鸭。", "zh-TW": "以麵食為主——麵條、餃子、北京烤鴨。" } },
          { icon: "food-fish", title: { en: "Jiangnan (Shanghai, Hangzhou, Suzhou)", "zh-CN": "江南菜（上海、杭州、苏州）", "zh-TW": "江南菜（上海、杭州、蘇州）" },
            desc: { en: "Slightly sweet river-and-lake cuisine — fish, rice, and delicate braises.", "zh-CN": "略带甜味的江南水乡菜——鱼鲜、米饭与精致炖菜。", "zh-TW": "略帶甜味的江南水鄉菜——魚鮮、米飯與精緻燉菜。" } },
          { icon: "food-western", title: { en: "Western & International", "zh-CN": "西餐及国际餐饮", "zh-TW": "西餐及國際餐飲" },
            desc: { en: "Available near major hospitals in most cities we cover, especially Beijing, Shanghai, and Shenzhen.", "zh-CN": "我们覆盖的大多数城市的主要医院附近均可找到，尤以北京、上海、深圳为多。", "zh-TW": "我們覆蓋的大多數城市的主要醫院附近均可找到，尤以北京、上海、深圳為多。" } },
          { icon: "food-tray", title: { en: "Hospital Cafeteria & Delivery", "zh-CN": "医院食堂与外卖", "zh-TW": "醫院食堂與外送" },
            desc: { en: "Most large hospitals have an on-site cafeteria; food delivery apps cover nearly every hospital in China.", "zh-CN": "大多数大型医院设有院内食堂；外卖平台几乎覆盖中国所有医院周边。", "zh-TW": "大多數大型醫院設有院內食堂；外送平台幾乎覆蓋中國所有醫院周邊。" } }
        ],
        // Specific iconic dishes per region, tagged for dietary filtering.
        // tags vocabulary: pork, beef, lamb, poultry, seafood, alcohol,
        // spicy, vegOption (a vegetarian version is commonly available).
        dishes: [
          { id: "d-baiqieji", region: "food-dimsum", icon: "food-dimsum", tags: ["poultry"],
            name: { en: "White Cut Chicken", "zh-CN": "白切鸡", "zh-TW": "白切雞" },
            desc: { en: "Poached chicken served with ginger-scallion sauce — a Cantonese classic.", "zh-CN": "白切鸡配姜葱酱，粤菜经典。", "zh-TW": "白切雞配薑蔥醬，粵菜經典。" } },
          { id: "d-hargow", region: "food-dimsum", icon: "food-dimsum", tags: ["seafood"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Ha_Gow_(Cantonese_Shrimp_Dumplings).jpeg",
            name: { en: "Har Gow (Shrimp Dumplings)", "zh-CN": "虾饺", "zh-TW": "蝦餃" },
            desc: { en: "Steamed translucent dumplings filled with shrimp, a dim sum staple.", "zh-CN": "晶莹剔透的虾肉蒸饺，点心必点。", "zh-TW": "晶瑩剔透的蝦肉蒸餃，點心必點。" } },
          { id: "d-siugo", region: "food-dimsum", icon: "food-dimsum", tags: ["poultry"],
            name: { en: "Roast Goose", "zh-CN": "烧鹅", "zh-TW": "燒鵝" },
            desc: { en: "Crisp-skinned roast goose, a Guangzhou specialty.", "zh-CN": "皮脆肉嫩，广州名菜。", "zh-TW": "皮脆肉嫩，廣州名菜。" } },
          { id: "d-hotpot", region: "food-spicy", icon: "food-spicy", tags: ["beef", "spicy", "vegOption"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Chengdu_Hotpot.jpg",
            name: { en: "Sichuan Hot Pot", "zh-CN": "火锅", "zh-TW": "火鍋" },
            desc: { en: "Communal simmering pot; broth and ingredients (meat, tofu, vegetables) are fully customizable.", "zh-CN": "共享火锅，汤底与食材（肉类、豆腐、蔬菜）可自由搭配。", "zh-TW": "共享火鍋，湯底與食材（肉類、豆腐、蔬菜）可自由搭配。" } },
          { id: "d-mapotofu", region: "food-spicy", icon: "food-spicy", tags: ["pork", "spicy", "vegOption"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Mapo_tofu.JPG",
            name: { en: "Mapo Tofu", "zh-CN": "麻婆豆腐", "zh-TW": "麻婆豆腐" },
            desc: { en: "Silken tofu in a spicy sauce, traditionally with a little minced pork.", "zh-CN": "麻辣豆腐，传统做法加少量肉末。", "zh-TW": "麻辣豆腐，傳統做法加少量肉末。" } },
          { id: "d-dandan", region: "food-spicy", icon: "food-spicy", tags: ["pork", "spicy"],
            name: { en: "Dan Dan Noodles", "zh-CN": "担担面", "zh-TW": "擔擔麵" },
            desc: { en: "Spicy noodles topped with preserved vegetables and minced pork.", "zh-CN": "辣味面条，配芽菜与肉末。", "zh-TW": "辣味麵條，配芽菜與肉末。" } },
          { id: "d-pekingduck", region: "food-wheat", icon: "food-wheat", tags: ["poultry"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Sliced_Peking_Duck_with_traditional_condiments.jpg",
            name: { en: "Peking Duck", "zh-CN": "北京烤鸭", "zh-TW": "北京烤鴨" },
            desc: { en: "Roast duck carved tableside, wrapped in thin pancakes with scallion and sauce.", "zh-CN": "现场片鸭，薄饼卷葱丝蘸酱。", "zh-TW": "現場片鴨，薄餅捲蔥絲沾醬。" } },
          { id: "d-yangroupaomo", region: "food-wheat", icon: "food-wheat", tags: ["lamb"],
            name: { en: "Yang Rou Pao Mo (Lamb Soup)", "zh-CN": "羊肉泡馍", "zh-TW": "羊肉泡饃" },
            desc: { en: "Xi'an specialty: torn flatbread soaked in a rich lamb broth.", "zh-CN": "西安名吃，掰馍泡入浓郁羊肉汤。", "zh-TW": "西安名吃，掰饃泡入濃郁羊肉湯。" } },
          { id: "d-jiaozi", region: "food-wheat", icon: "food-wheat", tags: ["pork", "vegOption"],
            name: { en: "Jiaozi (Dumplings)", "zh-CN": "饺子", "zh-TW": "餃子" },
            desc: { en: "Boiled or pan-fried dumplings; pork-and-cabbage is classic, vegetable-only is common too.", "zh-CN": "水饺或煎饺，猪肉白菜馅经典，素馅也很常见。", "zh-TW": "水餃或煎餃，豬肉白菜餡經典，素餡也很常見。" } },
          { id: "d-xihuyu", region: "food-fish", icon: "food-fish", tags: ["seafood"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/West_Lake_Fish_in_Vinegar_Gravy.jpg",
            name: { en: "West Lake Fish", "zh-CN": "西湖醋鱼", "zh-TW": "西湖醋魚" },
            desc: { en: "Freshwater fish in a sweet-and-sour sauce, a Hangzhou signature.", "zh-CN": "糖醋风味淡水鱼，杭州名菜。", "zh-TW": "糖醋風味淡水魚，杭州名菜。" } },
          { id: "d-xiaolongbao", region: "food-fish", icon: "food-fish", tags: ["pork", "vegOption"],
            photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Xiao_Long_Bao_at_Nanxiang_Mantou_Dian_1.jpg",
            name: { en: "Xiaolongbao (Soup Dumplings)", "zh-CN": "小笼包", "zh-TW": "小籠包" },
            desc: { en: "Delicate steamed dumplings filled with broth and pork; vegetarian versions exist.", "zh-CN": "汤汁鲜美的蒸饺，传统猪肉馅，也有素馅可选。", "zh-TW": "湯汁鮮美的蒸餃，傳統豬肉餡，也有素餡可選。" } },
          { id: "d-dongpo", region: "food-fish", icon: "food-fish", tags: ["pork", "alcohol"],
            name: { en: "Dongpo Pork", "zh-CN": "东坡肉", "zh-TW": "東坡肉" },
            desc: { en: "Braised pork belly slow-cooked with Shaoxing wine — a Hangzhou classic.", "zh-CN": "用绍兴黄酒慢炖的东坡肉，杭州经典。", "zh-TW": "用紹興黃酒慢燉的東坡肉，杭州經典。" } },
          { id: "d-longjing", region: "food-fish", icon: "drink-tea", tags: [],
            name: { en: "West Lake Longjing Tea", "zh-CN": "西湖龙井茶", "zh-TW": "西湖龍井茶" },
            desc: { en: "Pan-fired green tea from Hangzhou, prized for its delicate, fresh flavor.", "zh-CN": "产自杭州的炒制绿茶，滋味清新淡雅。", "zh-TW": "產自杭州的炒製綠茶，滋味清新淡雅。" } },
          { id: "d-huangjiu", region: "food-fish", icon: "drink-spirit", tags: ["alcohol"],
            name: { en: "Shaoxing Yellow Wine", "zh-CN": "绍兴黄酒", "zh-TW": "紹興黃酒" },
            desc: { en: "A warm, mellow fermented rice wine, often served slightly heated.", "zh-CN": "温润醇厚的米酒，常温热后饮用。", "zh-TW": "溫潤醇厚的米酒，常溫熱後飲用。" } },
          { id: "d-liangcha", region: "food-dimsum", icon: "drink-tea", tags: [],
            name: { en: "Cantonese Herbal Tea", "zh-CN": "广式凉茶", "zh-TW": "廣式涼茶" },
            desc: { en: "A bitter herbal infusion Cantonese people drink for general wellness.", "zh-CN": "广东人日常饮用的清热养生凉茶。", "zh-TW": "廣東人日常飲用的清熱養生涼茶。" } },
          { id: "d-baijiu", region: "food-wheat", icon: "drink-spirit", tags: ["alcohol"],
            name: { en: "Baijiu (Chinese Liquor)", "zh-CN": "白酒", "zh-TW": "白酒" },
            desc: { en: "A strong distilled spirit, common at celebratory banquets across China.", "zh-CN": "高度蒸馏酒，中国宴席上常见的饮品。", "zh-TW": "高度蒸餾酒，中國宴席上常見的飲品。" } },
          { id: "d-ejiao", region: "food-wheat", icon: "herb-root", tags: [],
            name: { en: "Ejiao (Donkey-Hide Gelatin Tonic)", "zh-CN": "阿胶", "zh-TW": "阿膠" },
            desc: { en: "A traditional tonic believed to support blood health, often taken as a paste or in soup.", "zh-CN": "传统滋补品，常制成膏方或炖入汤中食用。", "zh-TW": "傳統滋補品，常製成膏方或燉入湯中食用。" } },
          { id: "d-renshen", region: "area-changchun", icon: "herb-root", tags: [],
            name: { en: "Ginseng", "zh-CN": "人参", "zh-TW": "人參" },
            desc: { en: "A prized root from Northeast China, used in tea, soup, or eaten sliced.", "zh-CN": "产自中国东北的名贵药材，可泡茶、炖汤或切片食用。", "zh-TW": "產自中國東北的名貴藥材，可泡茶、燉湯或切片食用。" } },
          { id: "d-gouqi", region: "food-dimsum", icon: "herb-leaf", tags: [],
            name: { en: "Goji Berries", "zh-CN": "枸杞", "zh-TW": "枸杞" },
            desc: { en: "Dried red berries added to tea, soup, and congee for everyday wellness.", "zh-CN": "常加入茶饮、汤品与粥中的养生食材。", "zh-TW": "常加入茶飲、湯品與粥中的養生食材。" } }
        ]
      },
      safety: {
        intro: {
          en: "Your safety — medical and personal — is central to how Health Blueprint works. We only publish safety information we can actually verify.",
          "zh-CN": "医疗安全与人身安全，是健康蓝图一切服务的核心。我们只发布确实可核实的安全信息。",
          "zh-TW": "醫療安全與人身安全，是健康藍圖一切服務的核心。我們只發布確實可核實的安全資訊。"
        },
        items: [
          { icon: "star", title: { en: "Published Hospital Rankings", "zh-CN": "公开的医院排名", "zh-TW": "公開的醫院排名" },
            desc: { en: "Every hospital listed comes from the publicly published 2023 China Hospital Ranking, so you can see its national standing before you choose.", "zh-CN": "所有上榜医院均来自公开发布的2023年度中国医院综合排行榜，方便您在选择前了解其全国排名情况。", "zh-TW": "所有上榜醫院均來自公開發布的2023年度中國醫院綜合排行榜，方便您在選擇前了解其全國排名情況。" } },
          { icon: "handshake", title: { en: "Reviewed Agents", "zh-CN": "经审核的服务人员", "zh-TW": "經審核的服務人員" },
            desc: { en: "Agents who support you in person are reviewed before joining our network, and rated after every trip.", "zh-CN": "为您提供全程陪同服务的人员在加入平台前均经过审核，并在每次行程后接受评分。", "zh-TW": "為您提供全程陪同服務的人員在加入平台前均經過審核，並在每次行程後接受評分。" } },
          { icon: "safety-phone", title: { en: "Support Every Step", "zh-CN": "全程支持", "zh-TW": "全程支援" },
            desc: { en: "Your agent stays reachable throughout your trip — from airport pickup to your safe return home.", "zh-CN": "服务人员在您整个行程中都可随时联系——从机场接机到您平安返程。", "zh-TW": "服務人員在您整個行程中都可隨時聯繫——從機場接機到您平安返程。" } },
          { icon: "safety-shield", title: { en: "Travel & Medical Insurance", "zh-CN": "旅行与医疗保险", "zh-TW": "旅遊與醫療保險" },
            desc: { en: "We recommend arranging travel/medical insurance before your trip; your agent can help you understand local requirements.", "zh-CN": "建议您在出行前安排好旅行/医疗保险，服务人员可协助您了解当地相关要求。", "zh-TW": "建議您在出行前安排好旅遊/醫療保險，服務人員可協助您了解當地相關要求。" } },
          { icon: "safety-embassy", title: { en: "Embassy Contacts", "zh-CN": "使领馆联系方式", "zh-TW": "使領館聯絡方式" },
            desc: { en: "Keep your country's embassy or consulate contact information with you throughout your trip.", "zh-CN": "请在行程中随身携带您所在国家使领馆的联系方式。", "zh-TW": "請在行程中隨身攜帶您所在國家使領館的聯絡方式。" } }
        ],
        emergencyTitle: { en: "Emergency Numbers", "zh-CN": "紧急联系电话", "zh-TW": "緊急聯絡電話" },
        emergencyContacts: [
          { icon: "safety-phone", number: "110", label: { en: "Police", "zh-CN": "报警", "zh-TW": "報警" } },
          { icon: "safety-phone", number: "120", label: { en: "Medical Emergency / Ambulance", "zh-CN": "急救", "zh-TW": "急救" } },
          { icon: "safety-phone", number: "119", label: { en: "Fire", "zh-CN": "火警", "zh-TW": "火警" } },
          { icon: "safety-phone", number: "122", label: { en: "Traffic Accident", "zh-CN": "交通事故", "zh-TW": "交通事故" } }
        ],
        cityData: {
          title: { en: "What we can verify about city safety", "zh-CN": "关于城市安全，我们能核实到的信息", "zh-TW": "關於城市安全，我們能核實到的資訊" },
          disclaimer: {
            en: "You asked for a safety ranking of all our cities. We looked, honestly: there is no single official, authoritative index that ranks all 23 of them, so we won't invent one. Below is exactly what independent sources do and don't cover.",
            "zh-CN": "您希望我们提供所有城市的安全排名。我们认真查证后发现：目前没有一个官方权威指数能覆盖全部23个城市，因此我们不会编造数据。以下是各独立信息来源实际能覆盖和无法覆盖的内容。",
            "zh-TW": "您希望我們提供所有城市的安全排名。我們認真查證後發現：目前沒有一個官方權威指數能涵蓋全部23個城市，因此我們不會編造資料。以下是各獨立資訊來源實際能涵蓋和無法涵蓋的內容。"
          },
          eiu: {
            en: "The Economist Intelligence Unit's Safe Cities Index tracks about 60 major cities worldwide. Of our 23 cities, only Beijing has a confirmed placement: 31st of 60 in the 2019 edition. This is a global index (not China-specific), and the other 22 cities are not included.",
            "zh-CN": "英国经济学人智库（EIU）发布的\"安全城市指数\"覆盖全球约60个主要城市。在我们的23个城市中，仅北京有确认排名：2019年版位列第31位（共60个城市）。该指数为全球性指数（非专门针对中国），其余22个城市均未被纳入。",
            "zh-TW": "英國經濟學人智庫（EIU）發布的「安全城市指數」涵蓋全球約60個主要城市。在我們的23個城市中，僅北京有確認排名：2019年版位列第31位（共60個城市）。該指數為全球性指數（非專門針對中國），其餘22個城市均未被納入。"
          },
          numbeoCaveat: {
            en: "Numbeo publishes a crowdsourced \"Safety Index\" based on user-submitted surveys — not an official or academic source, and sample sizes per city are often small. With that caveat, here's what it shows for the cities with usable data (0–100 scale, higher = safer):",
            "zh-CN": "Numbeo 网站发布的\"安全指数\"基于用户自行提交的问卷调查，并非官方或学术数据来源，且各城市样本量往往较小。在此前提下，以下是有可用数据的城市情况（0-100分，分数越高越安全）：",
            "zh-TW": "Numbeo 網站發布的「安全指數」基於使用者自行提交的問卷調查，並非官方或學術資料來源，且各城市樣本量往往較小。在此前提下，以下是有可用資料的城市情況（0-100分，分數越高越安全）："
          },
          numbeo: [
            { area: "beijing", score: 74.7 },
            { area: "shanghai", score: 73.5 },
            { area: "shenzhen", score: 75.2 },
            { area: "chengdu", score: 79.9 },
            { area: "chongqing", score: 77.2 },
            { area: "harbin", score: 79.3 },
            { area: "nanchang", score: 79.2 }
          ],
          uncoveredNote: {
            en: "The remaining 16 cities in our directory (Tianjin, Guangzhou, Hangzhou, Wenzhou, Nanjing, Suzhou, Xi'an, Wuhan, Changsha, Zhengzhou, Jinan, Qingdao, Shenyang, Changchun, Hefei, Fuzhou) don't have a reliable published safety score we could verify — that's not a red flag, just a data gap.",
            "zh-CN": "我们名录中其余16个城市（天津、广州、杭州、温州、南京、苏州、西安、武汉、长沙、郑州、济南、青岛、沈阳、长春、合肥、福州）目前没有可核实的公开安全评分——这并不代表存在风险，只是数据空缺。",
            "zh-TW": "我們名錄中其餘16個城市（天津、廣州、杭州、溫州、南京、蘇州、西安、武漢、長沙、鄭州、濟南、青島、瀋陽、長春、合肥、福州）目前沒有可核實的公開安全評分——這並不代表存在風險，只是資料空缺。"
          },
          generalNote: {
            en: "For general context: major Western governments' travel advisories typically place mainland China at a standard/moderate caution level overall, not an elevated crime warning — but advisory levels change over time, so check your own government's current guidance before you travel.",
            "zh-CN": "作为一般参考：西方主要国家政府发布的旅行提醒通常将中国大陆列为标准/中等谨慎级别，并未因治安问题发布高等级警示——但提醒等级会随时间变化，出行前请务必查阅您所在国家政府的最新指南。",
            "zh-TW": "作為一般參考：西方主要國家政府發布的旅遊提醒通常將中國大陸列為標準/中等謹慎等級，並未因治安問題發布高等級警示——但提醒等級會隨時間變化，出行前請務必查閱您所在國家政府的最新指南。"
          }
        }
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
