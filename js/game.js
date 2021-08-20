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
            if (which == 49) {
                // todo
                if (that.skillEffect != null) {
                    that.skillEffect();
                }
            }
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
    generateWuliSkill: function() {}
};

var t_slist = {};