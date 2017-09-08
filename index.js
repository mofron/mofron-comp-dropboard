/**
 * @file   mofron-comp-dropboard/index.js
 * @author simpart
 */
require('mofron-event-drag');

/**
 * @class mofron.comp.DropBoard
 * @brief DropBoard component for mofron
 */
mofron.comp.DropBoard = class extends mofron.Component {
    
    constructor (prm_opt) {
        try {
            super();
            this.name('DropBoard');
            this.prmOpt(prm_opt);
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
            let drg_core = (tgt, tp, brd, drp_cmp) => {
                try {
                    if ( ('dragenter' === tp) &&
                         (null        !== mofron.effect.draggable_comp) ) {
                        brd.dragEnter(mofron.effect.draggable_comp);
                    } else if ('dragleave' === tp) {
                        if (null === drp_cmp) {
                            console.warn('drag-component is null');
                            return;
                        }
                        if (false === brd.isDragOver()) {
                            setTimeout(
                                (tgt, tp, brd, drp_cmp) => {
                                    try {
                                        if (true === brd.isDropped()) {
                                            return;
                                        }
                                        brd.dragLeave(drp_cmp);
                                    } catch (e) {
                                        console.error(e.stack);
                                        throw e;
                                    }
                                },
                                50,
                                tgt, tp, brd, drp_cmp
                            );
                        }
                        if ( (null === mofron.effect.draggable_comp)) {
                            brd.isDropped(true);
                            brd.dropped_ctl(drp_cmp);
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            let drg_evt = (tgt, tp, prm) => {
                try {
                    if ('dragover' === tp) {
                        prm.isDragOver(true);
                    } else if ('dragleave' === tp) {
                        prm.isDragOver(false);
                        prm.isDropped(false);
                    }
                    setTimeout(
                        drg_core,
                        100,
                        tgt, tp, prm, mofron.effect.draggable_comp
                    );
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            this.event([
                new mofron.event.Drag({
                    addType : ['dragenter', 'dragleave', 'dragover'],
                    handler : new mofron.Param(drg_evt, this)
                })
            ]);
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
                    mofron.func.getLength(this.style('width')),
                    mofron.func.getLength(this.style('height'))
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
    
    isDragOver (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_dragover) ? false : this.m_dragover;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_dragover = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isDropped (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_dropped) ? false : this.m_dropped;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_dropped = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
    
    dropped_ctl (cmp) {
        try {
            let chd = this.child();
            for (let chd_idx in chd) {
                if (chd[chd_idx].getId() === cmp.getId()) {
                    return;
                }
            }
            this.dropped(cmp);
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
