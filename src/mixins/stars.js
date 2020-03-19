/* eslint-disable */
import { db, gobansRef } from '../firebase/db'

export default {
  methods: {
     checkJSON: function (text) {
      if (!text) { return false}
      if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true
      } else {
        return false
      }
    },
    setStars: function (k, o, s, or) {
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.related = obj.related || [k]
      obj.use_lev = obj.use_lev || true
      obj.stars = (obj.stars || 0) + s - or
      db.ref('gobans/' + k).set(obj)
    }
  }
}
