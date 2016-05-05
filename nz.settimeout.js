/*
 * settimeout
 * 间隔执行,利用raf&fn.bind实现,需要ie9+
 * @para {cb} [function] 回调
 * @para {ms} [number] 间隔(毫秒)
 * 清除方法object.stop=true
 */

function NZSettimeout(cb, ms) {
    if (typeof(cb) != "function" || typeof(ms) != "number") {
        throw "NZSettimeout - parameter error.";
    }
    this.__endtime = +new Date() + ms;
    this.stop = false;
    window.requestAnimationFrame(function () {
        if (this.stop)return;
        if (+new Date() >= this.__endtime) {
            this.stop = true;
            cb.apply(this);
            return;
        }
        window.requestAnimationFrame(arguments.callee.bind(this));
    }.bind(this));
    return this;
}