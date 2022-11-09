export default {
  methods: {
    downloadObjectAsJson: function (exportObj, exportName) {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', exportName + '.json')
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    backupJSON: function (id, lev, mydata, myName) {
      if (lev === '_' || !lev) {
        lev = ''
      }
      this.downloadObjectAsJson(mydata, myName + lev)
    },
    backupCSV: function (id, lev) {
      if (lev === '_' || !lev) {
        lev = ''
      }
      window.open('https://cors-anywhere.herokuapp.com/https://ethercalc.net/' + id + lev + '.csv', '_blank')
    }
  }
}
