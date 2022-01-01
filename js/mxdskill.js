const PASSIVE="passive",BUFF="buff",ACTIVE="active",DEBUFF="debuff",MULTIPLED="multipled",ADDED="added";
const SELF="self",PLAYER="player";
// ----------------------------------- Adele
const CHUXINZHE = {
    name: "初心者",url: "img/skill/chuxinzhe.png",effect: {boss:6},type:PASSIVE
}, HUIYI = {
    name: "回忆",url: "img/skill/huiyi.png",effect: {ctd:10,atkp:10},type:PASSIVE
}, MOLIXIANLU = {
    name: "魔力线路",url: "img/skill/molixianlu.png",
    effect: function(role) {
        let wp = role.equipments[WEAPON];
        if (wp) {
            let atk = wp.base.atk;
            let matk = wp.total.matk;
            let atkplus = Math.floor(matk*0.35);
            let max_atk = Math.floor(atk * 0.15);
            role.attr.atk.f += Math.min(atkplus, max_atk);
        }
    },type:PASSIVE
}, JIBENSUYANG = {
    name: "基本素养",url: "img/skill/jibensuyang.png",effect: {atk:30,def:200,hp:1000},type:PASSIVE
}, GONGZHENG_BUFF = {
    name:"共振",url:"img/skill/gongzhen.png",effect:{boss:5,ign:5,layer:2,ltype:MULTIPLED},type:BUFF
}, JINGTONG = {
    name:"精通",url:"img/skill/jingtong.png",effect:{atk:30,Mastery:50},type:PASSIVE
}, XUNLIAN = {
    name:"训练",url:"img/skill/xunlian.png",effect:{str:60},type:PASSIVE
}, YUJIANSHOUQIAO = {
    name:"御剑收鞘",url:"img/skill/yujianshouqiao.png",effect:{ign:10,duration:30,af:PLAYER},type:DEBUFF
}, NAILI = {
    name:"耐力",url:"img/skill/naili.png",effect:{hpp:10},type:PASSIVE
}, RENKE = {
    name:"认可",url:"img/skill/renke.png",effect:{atk:30,final:15,ctr:20},type:PASSIVE
}, ZHANJUE = {
    name:"斩决",url:"img/skill/zhanjue.png",effect:{p:375,times:6},type:ACTIVE
}, JIANZHOUZHIYIN = {
    name:"剑咒之印",url:"img/skill/jianzhouzhiyin.png",effect:{damage:20,ign:10},type:DEBUFF
}, YIRENDEYONGSHI = {
    name:"翼人的勇士",url:"img/skill/yirendeyongshi.png",effect:{statsp:15},type:BUFF
}, ZHUANJIA = {
    name:"专家",url:"img/skill/zhuanjia.png",effect:{atk:30,Mastery:20},type:PASSIVE
}, JINSHOUZHI = {
    name:"金手指",url:"img/skill/jinshouzhi.png",effect:{final:30,ign:20},type:PASSIVE
}, GONGCHENGMINGJIU = {
    name:"功成名就",url:"img/skill/gongchengmingjiu.png",effect:{atk:30,boss:10,ctr:20,hpp:15},type:PASSIVE
};
// ==================================== Adele
// b buff  d debuff p passive a attack
const skill = {
    "御剑骑士":{b: [GONGZHENG_BUFF,YIRENDEYONGSHI],d: [YUJIANSHOUQIAO,JIANZHOUZHIYIN],p: [CHUXINZHE,HUIYI,MOLIXIANLU,JIBENSUYANG,
        JINGTONG,XUNLIAN,NAILI,RENKE,ZHUANJIA,JINSHOUZHI,GONGCHENGMINGJIU],a: [ZHANJUE]
    }
};
