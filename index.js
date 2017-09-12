/**
 * @file   mofron-comp-dropboard/index.js
 * @author simpart
 */
let mf = require('mofron');
let Drag   = require('mofron-event-drag');
let Drgeff = require('mofron-effect-draggable');

/**
 * @class mofron.comp.DropBoard
 * @brief DropBoard component for mofron
 */
mf.comp.DropBoard = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('DropBoard');
            this.m_tempkey = new Drgeff().getTempKey();
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize vdom
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts (prm);
            
            /* set drag event */
            let drg_core = (tgt, tp, drp_cmp) => {
                try {
                    let chk_drp_cmp = mf.func.getTemp(tgt.m_tempkey);
                    if ( ('dragenter' === tp) &&
                         (null !== chk_drp_cmp) ) {
                        /* notify drag-enter event */
                        tgt.dragEnter(chk_drp_cmp);
                    } else if ('dragleave' === tp) {
                        if (null === drp_cmp) {
                            console.warn('drag-component is null');
                            return;
                        }
                        
                        if (null === mf.func.getTemp(tgt.m_tempkey)) {
                            //tgt.isDropped(true);
                            tgt.dropped(drp_cmp);
                        } else {
                            tgt.dragLeave(drp_cmp);
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            let drg_evt = new Drag({
                addType : ['dragenter', 'dragleave', 'dragover'],
                handler : (tgt, tp) => {
                    try {
                        setTimeout(
                            drg_core,
                            100,
                            tgt,
                            tp,
                            mf.func.getTemp(this.m_tempkey)
                        );
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            });
            this.addEvent(drg_evt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (wid, hei) {
        try {
            if (undefined === wid) {
                /* getter */
                return [
                    mf.func.getLength(this.style('width')),
                    mf.func.getLength(this.style('height'))
                ];
            }
            /* setter */
            this.style({
                width  : ('number' === typeof wid) ? wid + 'px' : wid,
                height : ('number' === typeof hei) ? hei + 'px' : hei
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * enable effect when component was entered in dragg.
     */
    dragEnter (cmp) {
        try {
            /* dragenter event */
            let eff = this.effect();
            for (let eff_idx in eff) {
                eff[eff_idx][0].execute(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * disable effect when component was leaved in drag.
     */
    dragLeave (cmp) {
        try {
            /* dragleave event */
            let eff = this.effect();
            for (let eff_idx in eff) {
                eff[eff_idx][0].execute(false);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dropped (cmp) {
        try {
            /* dragend event on this component */
            let devt = this.dropEvent();
            for (let d_idx in devt) {
                devt[d_idx][0](cmp, devt[d_idx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    addDropEvent (evt, prm) {
        try {
            if ('function' !== typeof evt) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_dropevt) {
                this.m_dropevt = new Array();
            }
            this.m_dropevt.push([evt, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dropEvent () {
        try {
            return (undefined === this.m_dropevt) ? null : this.m_dropevt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.dropboard = {};
module.exports = mofron.comp.DropBoard;
