// class Role {
//     constructor(id) {
//         this.id = id;
//         this.j = $('#'+id);
//         this.toux = $("#"+id+" .toux");
//     }
//     setTouxiang(img) {
//         this.toux.css("background-image","url("+img+")");
//     }
//     loadData(data) {}
//     loadRole(role) {}
//     showState() {}
//     openBag() {}
//     openStorage() {}
//     putBag(obj, num) {}
//     getBag(obj, num) {}
//     putStorage(obj, num) {}
//     getStorage(obj, num) {}
//     useCost(obj, num) {}
//     discardBag(obj, num) {}
//     discardStorage(obj, num) {}

//     save(t) {
//         if(t==null) {
//             // save all
//         }
//         if (t=='bag') {
//             let sid = '';
//             if (user.id!==null) {sid = user.id}
//             if (this.name!=null) {
//                 localStorage.setItem(sid+"_"+this.name+"_bag", JSON.stringify(this.bag));
//             }
//         }
//     }
// }

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
    all_r.on('click', function(e){
        e.preventDefault();
        let b = $(this).find('.b1');
        // b.toggleClass('b');
        if (b.hasClass('b')) {
            b.removeClass('b');
            skill_L.reTarget(this.id);
        } else {
            b.addClass('b');
            skill_L.addTarget(this.id);
        }
    });

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
        Atk: {base: 10},
        Def: {base: 10},
        SkillList: [],
        bag: []
    };
    r1.loadData(test_data);
    r2.loadData(test_data);

    // $(document).on('keydown', function(e){
    //     let which = e.which;
    //     // console.log(which);
    //     if (which == 49) {
    //         r1.receiveDamage(9);
    //     }
    // });
    t_skill_L.onKeyBoard();
});