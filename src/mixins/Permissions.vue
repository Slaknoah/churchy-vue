<script>
export default {
  methods: {
    $can(permissionName) {
      let user = window.$cookies.get("authUser");
      if (user) {
        return user.permissions[permissionName] || user.isAdmin;
      }
      return false;
    }
  }
};
</script>