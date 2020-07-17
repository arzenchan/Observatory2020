
/*
Script for changing interactivity of a layer. 
Source: 
https://github.com/Leaflet/Leaflet/issues/5442#issuecomment-424014428
*/
L.Layer.prototype.setInteractive = function (interactive) {
    if (this.getLayers) {
        this.getLayers().forEach(layer => {
            layer.setInteractive(interactive);
        });
        return;
    }
    if (!this._path) {
        return;
    }

    this.options.interactive = interactive;

    if (interactive) {
        L.DomUtil.addClass(this._path, 'leaflet-interactive');
    } else {
        L.DomUtil.removeClass(this._path, 'leaflet-interactive');
    }
};