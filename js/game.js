
var t_u = {
    getValue: function(o, k) {
        if(!o) {
            return 0;
        }
        let v = o[k];
        if(v) {
            return v;
        }
        return 0;
    }
};
/**
 * about equipment
 */
var t_eq = {
    generateWeapon: function() {
        return {"atk": 1};
    }
};

var t_match = {
    all_alive: [],
    end: function() {
        // todo 结束
    }
};

var t_effect = {
    running: function() {
        let roles = t_match.all_alive;
        if(ids.length <= 1) {
            t_match.end();
            return;
        }
        for(let role of roles) {
            let $dutiao = role.frag.find('.dutiao');
        }
    },
    stop: function() {}
};

var t_skill_L = {
    maxChooseNum: 1,
    currentChosen: [],
    currentSkill: "",
    state: 0,
    getCurrentChosen: function() {
        return this.currentChosen;
    },
    setCurrentChosen: function(cc) {
        this.currentChosen = cc;
    },
    addTarget: function(id) {  // 
        let length = this.currentChosen.length;
        while (length >= this.maxChooseNum) {
            let rid = this.currentChosen.shift();
            if (rid != null) {
                effect.eDhoose(rid);
            }
            length--;
        }
        this.currentChosen.push(id);
    },
    reTarget: function(id) {  // 
        let index = this.currentChosen.indexOf(id);
        if (index != null && index>-1) {
            this.currentChosen.splice(index,1);
        }
    },
    onKeyBoard: function() {
        var that = this;
        $(document).on('keydown', function(e){
            let which = e.which;
            // console.log(which);
            // skill choose
            if (which >= 49 && which <= 57) {
                //
            }
            // if (which == 49) {
            //     // todo
            //     if (that.skillEffect != null) {
            //         that.skillEffect();
            //     }
            // }
        });
    },
    skillEffect: function() {
        this.currentChosen.forEach(function(ele){
            let $r = $('#' + ele);
            let $state = $r.find('.state');
            let l = parseInt(Math.random() * 50 + 50);
            $state.find('.hp').css('width', l + "%");
        });
    }
};

var t_skill = {
    generateWuliSkill: function() {},
    normalAttack: function(target) {}
};

var t_quickBind = {
    // [skill, target num, mp cost, hp cost]
    "49": [normalAttack, 1, 0, 0]
};

var t_slist = {};

var t_eList = {
    e000000: function(t_obj) {
        let maxHp = t_obj.MaxHp.base;
        let maxShield = t_u.getValue(t_obj.MaxHp, "shield");

        let hp = t_obj.Hp.base;
        let shield = t_u.getValue(t_obj.Hp, "shield");

        hp += 10 * (1 + t_obj.Hp_rev/100);
        hp = parseInt(hp);
        if (hp > maxHp) {
            hp = maxHp;
        }

        shield += parseInt(10 * (1 + t_obj.Shield_rec/100));
        if (maxShield < 10) {
            maxShield = 10;
        }
        if (shield > maxShield) {
            shield = maxShield;
        }

        t_obj.MaxHp.shield = maxShield;
        t_obj.Hp.base = hp;
        t_obj.Hp.shield = shield;
    }
};