class Role {
    constructor(id) {
        this.id = id;
        this.j = $('#'+id);
        this.toux = $("#"+id+" .toux");
    }
    setTouxiang(img) {
        this.toux.css("background-image","url("+img+")");
    }
    loadData(data) {}
    loadRole(role) {}
    showState() {}
    openBag() {}
    openStorage() {}
    putBag(obj, num) {
        if (!this.bag) {
            this.bag = {};
        }
        let o = this.bag[obj];
        let n = num;
        if (o) {n += o.num}
        this.bag[obj].num = n;
    }
    getBag(obj, num) {}
    putStorage(obj, num) {}
    getStorage(obj, num) {}
    useCost(obj, num) {}
    discardBag(obj, num) {}
    discardStorage(obj, num) {}

    preCastSkill(skill) {
        t_skill_L.maxChooseNum = skill.targetsNum;
        t_skill_L.skillEffect = skill.effect;
    }
    castSkill(skill, objs) {}

    save(t) {
        if(t==null) {
            // save all
        }
        if (t=='bag') {
            let sid = '';
            if (user.id!==null) {sid = user.id}
            if (this.name!=null) {
                localStorage.setItem(sid+"_"+this.name+"_bag", JSON.stringify(this.bag));
            }
        }
    }
}