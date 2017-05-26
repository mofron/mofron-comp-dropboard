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
            let drag_evt = (tgt, tp, prm) => {
                try {
                    let evt = (cmp, tp, drp) => {
                        try {
                            //mofron.effect.draggable_comp;
                            if ( ('dragenter' === tp) &&
                                 (null        !== mofron.effect.draggable_comp) ) {
                                drp.dragEnter(mofron.effect.draggable_comp);
                            } else if ( ('dragleave' === tp) &&
                                        (null      === mofron.effect.draggable_comp) &&
                                        (null      !== cmp) ) {
                                drp.dropped(cmp);
                            } else if ( ('dragleave' === tp) &&
                                        (null        !== mofron.effect.draggable_comp) ) {
                                drp.isDragOver(false);
                                setTimeout(
                                    (drp, cmp) => {
                                        try {
                                            if (true === drp.isDragOver()) {
                                                return;
                                            }
                                            drp.dragLeave(cmp);
                                        } catch (e) {
                                            console.error(e.stack);
                                            throw e;
                                        }
                                    },
                                    100,
                                    drp,
                                    mofron.effect.draggable_comp
                                );
                            } else if ('dragover' === tp) {
                                drp.isDragOver(true);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    };
                    setTimeout(
                        (cmp, tp,drp) => {
                            try {
                                evt(cmp, tp, drp);
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        100,
                        mofron.effect.draggable_comp,
                        tp,
                        this
                    );
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            this.event([
                new mofron.event.Drag({
                    addType : ['dragenter', 'dragleave', 'dragover'],
                    handler : drag_evt
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
    
    dragEnter (cmp) {
        try {
            /* dragenter event */
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dragLeave (cmp) {
        try {
            /* dragleave event */
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dropped (cmp) {
        try {
            /* dragend event on this component */
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
}
mofron.comp.dropboard = {};
module.exports = mofron.comp.DropBoard;
