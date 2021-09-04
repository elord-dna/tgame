// include the basic setting of role saving, etc
/**
 * all t_ start variable is to control the object
 */
var t_setting = {
    /**
     * 登录
     * @param {用户名}} username 
     * @param {密码} password 
     */
    signIn: function(username, password) {},
    save: function() {},
    /**
     * 因为还没有写网络保存，所以有个本地保存
     */
    saveLocal: function() {},
    load: function(username) {},
    /**
     * 本地加载
     * @param {用户名}} username 
     */
    loadLocal: function(username) {}
};