module VORLON {
    export class MyDeviceInfo extends Plugin {

        constructor() {
            super("mydeviceinfo", "control.html", "control.css");
            this._ready = true;
        }

        public getID(): string {
            return "MYDEVICEINFO";
        }
        
        public refresh(): void {
            this.sendClientData();
        }
        
        public sendClientData(): void {
            var data = {
        		"devicewidth" : document.documentElement.clientWidth,
        		"deviceheight" : document.documentElement.clientHeight,
        		"screenwidth" :  screen.width,
        		"windowinnerwidth" : window.innerWidth,
        		"bodyclientwidth" : document.body.clientWidth,
        		"screenavailwidth" : screen.availWidth 
        	};
            
            Core.Messenger.sendRealtimeMessage(this.getID(), data, RuntimeSide.Client);
        }
        
        public startClientSide(): void {
            var that = this;
        	window.onresize = (event) => {
            	that.sendClientData();
        	};
        }
        
        public startDashboardSide(div: HTMLDivElement = null): void {
            this._insertHtmlContentAsync(div, (filledDiv) => {
                //load data
            })
        }
        
         public onRealtimeMessageReceivedFromClientSide(receivedObject: any): void {
            document.getElementById('devicewidth').innerText = receivedObject.devicewidth + 'px';
    		document.getElementById('deviceheight').innerText = receivedObject.deviceheight + 'px';
    		document.getElementById('screenwidth').innerText =  receivedObject.screenwidth + 'px';;
    		document.getElementById('windowinnerwidth').innerText = receivedObject.windowinnerwidth + 'px';
    		document.getElementById('bodyclientwidth').innerText = receivedObject.bodyclientwidth + 'px';
    		document.getElementById('screenavailwidth').innerText = receivedObject.screenavailwidth + 'px';
        }
    }

    //Register the plugin with vorlon core
    Core.RegisterPlugin(new MyDeviceInfo());
}
