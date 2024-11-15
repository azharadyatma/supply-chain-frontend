<template>
    <header :class="{ expanded: !isSidebarVisible }">
        <button class="toggle-btn" @click="toggleSidebar">☰</button>
        <div class="header-content">
            <div class="search-bar-container">
                <input
                    type="text"
                    v-model="search"
                    @input="emitSearch"
                    placeholder="Search"
                    class="search-bar form-control"
                />
            </div>
            <div class="role-selection">
                <button
                    @click="selectRole('admin')"
                    :class="{ active: currentRole === 'admin' }"
                    class="btn btn-secondary"
                >
                    Admin
                </button>
                <button
                    @click="selectRole('user')"
                    :class="{ active: currentRole === 'user' }"
                    class="btn btn-secondary"
                >
                    User
                </button>
            </div>
            <div class="logout-container">
                <button
                    class="logout-btn btn btn-outline-light"
                    @click="logout"
                >
                    Logout
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import { EventBus } from '@/utils/EventBus'

export default {
    data() {
        return {
            search: '',
        }
    },
    props: {
        currentRole: {
            type: String,
            required: true,
        },
        isSidebarVisible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        selectRole(role) {
            this.$emit('update-role', role)
            let authRole = localStorage.getItem('role')
            let isAuthenticated = Boolean(localStorage.getItem('auth'))

            if (isAuthenticated && authRole === role) {
                this.$router.push({
                    name: role,
                    params: { component: 'items' },
                })
            } else {
                alert('You do not have permission to switch to this role.')
                this.$router.push({ name: 'login' })
                this.$emit('toggle-sidebar', false)
            }
        },
        toggleSidebar() {
            this.$emit('toggle-sidebar')
        },
        emitSearch() {
            EventBus.emit('search', this.search)
        },
        logout() {
            localStorage.removeItem('auth')
            localStorage.removeItem('role')
            this.$emit('update-role', 'admin')
            this.$emit('toggle-sidebar', false)
            this.$router.push({ name: 'login' })
        },
    },
}
</script>

<style scoped>
header {
    background-color: #ffffff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    height: 60px;
    width: calc(100% - 180px);
    position: fixed;
    top: 0;
    left: 200px;
    z-index: 1000;
    transition: width 0.3s ease, left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header.expanded {
    width: 100%;
    left: 0;
}

.toggle-btn {
    background: none;
    border: none;
    color: #736efe;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    align-items: center;
}

.search-bar-container {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    margin-right: 8px;
}

.search-bar {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 250px;
    font-size: 14px;
    outline: none;
}

.role-selection {
    display: flex;
    justify-content: center;
    padding: 10px;
}

button {
    color: #736efe;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    margin: 0 10px;
    padding: 5px 10px;
}

button:hover {
    background-color: #736efe;
    color: #fff;
    border-radius: 8px;
}

button.active {
    background-color: #736efe;
    border-radius: 8px;
    color: #ffffff;
}

.logout-container {
    display: flex;
    align-items: center;
}

.logout-btn {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
}

.logout-btn:hover {
    background-color: #736efe;
    color: #fff;
}

@media (max-width: 768px) {
    header {
        width: 100%;
        left: 0;
    }

    .header-content {
        flex-direction: column;
    }

    .search-bar-container {
        margin-right: 0;
        margin-bottom: 10px;
        margin-top: 16px;
    }

    .toggle-btn {
        display: block;
    }
}
</style>
