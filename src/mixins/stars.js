import { db } from '../firebase/db'
import { set, ref } from 'firebase/database'

export default {
  methods: {
     srt: function (gobans) {
       if (!gobans) {
        return []
        } else {
         console.log(gobans)
         return gobans
       }
     },
     checkJSON: function (text) {
      if (!text) { return false}
      if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true
      } else {
        return false
      }
    },
    setStars: function (k, o, s, or, starsFire) {
      console.log(starsFire)
      if (!starsFire) { starsFire = 0 }
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.related = obj.related || [k]
      obj.use_lev = obj.use_lev || false
      obj.stars = (obj.stars || 0) + s - (or || 0)
      set(ref(db, 'gobans/' + k), obj)
      set(ref(db, 'stars/' + k), starsFire + (s - (or || 0)))
    }
  }
}
