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
                                drp.dragLeave(mofron.effect.draggable_comp);
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
                    addType : ['dragenter', 'dragleave'],
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
                return (undefined === this.m_size) ? null : this.m_size;
            }
            /* setter */
            if ( (('number' !== typeof wid) && ('string' !== typeof wid)) ||
                 (('number' !== typeof hei) && ('string' !== typeof hei)) ) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_size) {
                this.m_size = [null, null];
            }
            this.m_size[0] = wid;
            this.m_size[1] = hei;
            this.styleTgt().style({
                'width'  : wid + 'px',
                'height' : hei + 'px'
            });
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
