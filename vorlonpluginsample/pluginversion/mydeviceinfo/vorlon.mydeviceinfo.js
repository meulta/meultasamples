var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VORLON;
(function (VORLON) {
    var MyDeviceInfo = (function (_super) {
        __extends(MyDeviceInfo, _super);
        function MyDeviceInfo() {
            _super.call(this, "mydeviceinfo", "control.html", "control.css");
            this._ready = true;
        }
        MyDeviceInfo.prototype.getID = function () {
            return "MYDEVICEINFO";
        };
        MyDeviceInfo.prototype.refresh = function () {
            this.sendClientData();
        };
        MyDeviceInfo.prototype.sendClientData = function () {
            var data = {
                "devicewidth": document.documentElement.clientWidth,
                "deviceheight": document.documentElement.clientHeight,
                "screenwidth": screen.width,
                "windowinnerwidth": window.innerWidth,
                "bodyclientwidth": document.body.clientWidth,
                "screenavailwidth": screen.availWidth
            };
            VORLON.Core.Messenger.sendRealtimeMessage(this.getID(), data, 0 /* Client */);
        };
        MyDeviceInfo.prototype.startClientSide = function () {
            var that = this;
            window.onresize = function (event) {
                that.sendClientData();
            };
        };
        MyDeviceInfo.prototype.startDashboardSide = function (div) {
            if (div === void 0) { div = null; }
            this._insertHtmlContentAsync(div, function (filledDiv) {
                //load data
            });
        };
        MyDeviceInfo.prototype.onRealtimeMessageReceivedFromClientSide = function (receivedObject) {
            document.getElementById('devicewidth').innerText = receivedObject.devicewidth + 'px';
            document.getElementById('deviceheight').innerText = receivedObject.deviceheight + 'px';
            document.getElementById('screenwidth').innerText = receivedObject.screenwidth + 'px';
            ;
            document.getElementById('windowinnerwidth').innerText = receivedObject.windowinnerwidth + 'px';
            document.getElementById('bodyclientwidth').innerText = receivedObject.bodyclientwidth + 'px';
            document.getElementById('screenavailwidth').innerText = receivedObject.screenavailwidth + 'px';
        };
        return MyDeviceInfo;
    })(VORLON.Plugin);
    VORLON.MyDeviceInfo = MyDeviceInfo;
    //Register the plugin with vorlon core
    VORLON.Core.RegisterPlugin(new MyDeviceInfo());
})(VORLON || (VORLON = {}));
