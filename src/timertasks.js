'use strict';

function TimerTask(){
    logger.info("Starting Timertask");
    this.cnt = 1;
}
TimerTask.prototype.task = function(){
    var me = this;
    this.cnt++;
    logger.log(this.cnt);

    // Restart timer
    this.start();
};

TimerTask.prototype.start = function(){
    var me = this;
    logger.log(me);
    setTimeout(function(){
        me.task();
    },10000);
};
TimerTask.prototype.getCounter = function(){
    return this.cnt;
};


module.exports = new TimerTask();
