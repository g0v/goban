import NotFound from './views/Errors/NotFound'

axios.get('/profile/' + this.$route.params.username)
.then((response) => {
    // user was found
})
.catch((error) => {
    if (error.response.status === 404) {
        this.$_error(NotFound)
    }
})


<script type="text/javascript">
export default {
  name: 'NotNot'
}
</script>