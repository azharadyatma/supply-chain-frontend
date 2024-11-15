<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="role">Role:</label>
                <select v-model="role" id="role">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role: 'admin'
        }
    },
    methods: {
        login() {
            localStorage.setItem('auth', true)
            localStorage.setItem('role', this.role)
            this.$router.push({
                name: this.role,
                params: { component: 'items' }
            })
        }
    }
}
</script>