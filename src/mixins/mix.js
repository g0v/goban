import { db, gobansRef } from './firebase/db'

export default {
  methods: {
    setStar(k, o, s) {
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.related = obj.related || [k]
      obj.use_lev = obj.use_lev || true
      obj.stars = (obj.stars || 0) + s
      db.ref('gobans/' + k).set(obj)
    }
  }
}
