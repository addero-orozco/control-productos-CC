import Vue from 'vue'
import Vuex from 'vuex'

import * as sistema_control from '@/store/modules/sistema_control.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sistema_control,
    }
});