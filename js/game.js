
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
    },
    role_list: {},
    addRoleList: function(id, role) {
        t_match.role_list[id] = role;
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
    stop: function() {},
    eChoose: function(id) {
        let $b = $('#' + id).find('.b1');
        if (!$b.hasClass('b')) {
            $b.addClass('b');
        }
    },
    eDhoose: function(id) {
        let $b = $('#' + id).find('.b1');
        if ($b.hasClass('b')) {
            $b.removeClass('b');
        }
    },
    fChoose: function(id) {
        let $b = $('#' + id).find('.b2');
        if (!$b.hasClass('b')) {
            $b.addClass('b');
        }
    },
    fDhoose: function(id) {
        if ($b.hasClass('b')) {
            $b.removeClass('b');
        }
    }
};

var t_skill_L = {
    maxChooseNum: 1,
    // currentChosen: [], // removed, placed by skill.target
    currentSkill: null,
    state: 0,
    addTarget: function(id) {  // 
        let skill = this.currentSkill;
        if (skill == null || skill == "") {
            return;
        }
        let length = skill.target.length;
        // while (length > skill.tarNum) {
        //     let rid = skill.target.shift();
        //     if (rid != null) {
        //         t_effect.eDhoose(rid);
        //     }
        //     length--;
        // }
        if (length < skill.tarNum) {
            skill.addTarget(t_match.role_list[id]);
        }
        if (length == skill.tarNum) {
            t_skill_L.castSkill();
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
            if (which >= 49 && which <= 57) {
                t_skill_L.currentSkill = t_quickBind[""+which]
                // console.log(that.currentSkill);
            }
            //
        });
    },
    onDubClick: function() {
        var that = this;
        $('.role').on("dblclick", function(e) {
            e.preventDefault();
            that.castSkill(t_match.role_list[this.id], that.currentSkill);
        });
    },
    castSkill: function(skill) {
        // let tar = this.currentChosen;
        if (skill == null || skill == "") {
            alert("choose a skill first");
            return;
        }
        // console.log(skill.Name + " was used to " + tar.Name);
        // $('.role').off("dblclick");
        // skill.addTarget(tar);
        skill.handler(skill);
        // skill.removeTarget();
        
        this.currentSkill = null;
        this.currentChosen = null;
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

var t_test_skill = new Skill("a2");
t_test_skill.loadData(testSkill);
t_test_skill.loadLv(testLvData);

var t_quickBind = {
    // [skill, target num, mp cost, hp cost]
    // "49": [normalAttack, 1, 0, 0]
    "49": t_test_skill
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