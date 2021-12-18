var user = {}

$(function(){
    var effect = {
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

    var skill_L = {
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
                    that.skillEffect();
                }
            });
        },
        skillEffect: function() {
            this.currentChosen.forEach(function(ele){
                let $r = $(`#${ele}`);
                let $state = $r.find('.state');
                let l = parseInt(Math.random() * 50 + 50);
                $state.find('.hp').css('width', l + "%");
            });
        }
    };
    // skill_L.onKeyBoard();

    var r1 = new Role('r1');
    r1.setTouxiang("img/head1.jpg");
    var r2 = new Role('r2');
    r2.setTouxiang('img/head1.jpg');
    var all_r = $('.role');
    // all_r.on('click', function(e) {
    //     e.preventDefault();
    //     let b = $(this).find('.b1');
    //     // b.toggleClass('b');
    //     if (b.hasClass('b')) {
    //         b.removeClass('b');
    //         skill_L.reTarget(this.id);
    //     } else {
    //         b.addClass('b');
    //         skill_L.addTarget(this.id);
    //     }
    // });

    ////////////////////////////////////////////// testing
    let test_data = {
        Name: "ceshi",
        MaxHp: {base: 100},
        MaxMp: 100,
        Hp: {base: 100},
        Mp: 100,
        Exp: 0,
        Energy: 100,
        Speed: 20,
        Atk: {base: 13, buff:0},
        Def: {base: 10, buff:2},
        SAtk: {base: 5, buff:0},
        SDef: {base: 5, buff:0},
        Ct: {base: 19, buff:0},
        Cte: {base: 35, buff: 10},
        SkillList: [],
        bag: []
    };
    let test_data2 = {
        Name: "ceshi2",
        MaxHp: {base: 700},
        MaxMp: 100,
        Hp: {base: 700},
        Mp: 100,
        Exp: 0,
        Energy: 100,
        Speed: 20,
        Atk: {base: 10, buff:0},
        Def: {base: 13, buff:2},
        SAtk: {base: 5, buff:0},
        SDef: {base: 5, buff:0},
        Ct: {base: 10, buff:0},
        Cte: {base: 35, buff: 10},
        SkillList: [],
        bag: []
    };
    r1.loadData(test_data);
    r2.loadData(test_data2);
    t_match.addRoleList("r1", r1);
    t_match.addRoleList("r2", r2);
    t_test_skill.bindUser(r1);
    t_test_skill2.bindUser(r1);

    t_skill_L.onKeyBoard();
    t_skill_L.onDubClick();

    /// test effect
    $('.toux').mouseenter(function(e){
        e.preventDefault();
        t_effect.showDiv(e.clientX, e.clientY);
    });
    $('.toux').mouseleave(function(e) {
        // console.log('out');
        e.preventDefault();
        t_effect.hideDiv();
    });
    $('.toux').mousemove(function(e) {
        $('#msg').css({'left': e.clientX + 10, 'top': e.clientY + 10});
    });
    // $(document).on('mousemove', function(e) {
    //     console.log(e.clientX);
    // });
});