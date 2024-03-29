import { auth, db } from '../firebase/db'
import { set, ref } from 'firebase/database'

export default {
  methods: {
    getFastRoute: function (g) {
      var ans
      if (g.use_lev) {
        ans = '/see/' + g.id + '/0/0'
      } else {
        ans = '/s/' + g.id + '/0'
      }
      return ans
    },
    setDataToFireBase: function () {
      // Hello
    },
    loadDataFromFireBase: function () {
      /* console.log('loading mydata from firebase...')
      var gs = this.gobans.child(this.$route.params.id)
      this.mydata = array
      console.log(this.mydata)
      console.log('mydata loaded from firebase...') */
    },
    signOut: function () {
      const vm = this
      auth.signOut().then(function() {
        vm.user = null
        vm.uid = null
        vm.photoURL = null
      })
    },
    setUserToFireBase: function (id, obj, vm) {
      // console.log(obj)
      if (!this.users[id]) {
        set(ref(db, 'users/' + id), obj)
      } else {
        vm.users.child(id).update(obj)
      }
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id + g.t)
    },
    tryIt: function () {
      return {
        uid: undefined,
        id: 'guest',
        name: 'guest',
        photoURL: '/static/favicon.png'
      }
    },
    create: function (k, o, uid) {
      if (!uid) {
        window.alert('請先登入')
        return
      }
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.uid = this.uid
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.photoURL = obj.photoURL || ''
      obj.related = obj.related || [k]
      obj.use_lev = obj.use_lev || false
      obj.mydata = obj.mydata || [0, 1, 2, 3]
      set(ref(db, 'gobans/' + k), obj)
    },
    parse: function (d) {
      // console.log(d)
      if (d[1]) { this.myName = d[1][1] || 'User' }
      var ans = d.slice(2)
      var idx
      ans = ans.map(function (l) {
        var obj = {}
        obj.name = l[1]
        obj.url = l[0].replace('%20', '').replace(' ', '')
        obj.note = l[2]
        obj.note2 = l[3]
        return obj
      }).filter(function (o) {
        return o.name
      }).map(function (obj, index) {
        if (!obj.url || obj.url === 'folder') {
          obj.type = 'folder'
          obj.open = true
          if ((obj.note + '').match(/close/)) {
            obj.open = false
          }
          idx = index
        } else {
          obj.type = 'link'
          obj.parentIndex = idx
        }
        return obj
      })
      // console.log(ans)
      return ans
    }
  }
}
